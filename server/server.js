const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const { openStdin } = require("process");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const db_info = fs.readFileSync("../database.json");
const db_conf = JSON.parse(db_info);

const connection = mysql.createConnection(db_conf);

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.get("/api/restaurants", (req, res) => {
  let sql = "SELECT * FROM restaurant";
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/api/restaurants", (req, res) => {
  console.log("\nPOST /api/restaurants");

  let {
    name,
    category1,
    category2,
    telnum,
    coarse_location,
    real_location,
    op_hour_start,
    op_hour_end,
    bk_time_start,
    bk_time_end,
    star_score,
  } = req.body;
  console.log(req.body);

	if (!name) {
		return res.status(400).send('상호명을 입력하십시오.');
	}
	if(!category1 || !category2) {
		return res.status(400).send('카테고리를 입력하세요.');
	}
	if (!telnum || !telnum.match(/^(010-?[0-9]{4}-?[0-9]{4})$/)) {
		return res.status(400).send('유효하지 않은 전화번호 형식입니다.');
	}
	if (!coarse_location || !['동', '서', '남', '북'].includes(coarse_location)) {
		return res.status(400).send("유효하지 않은 구역입니다.");
	}
	if (op_hour_start >= op_hour_end) {
		return res.status(400).send("영업 시작 시간이 마감 시간보다 빨라야합니다.");
	}
	if (bk_time_start >= bk_time_end) {
		return res.status(400).send("브레이크타임 시작 시간이 마감 시간보다 빨라야합니다.");
	}
	if (bk_time_start < op_hour_start || bk_time_end > op_hour_end) {
		return res.status(400).send("브레이크타임은 영업시간 내에 있어야합니다.");
	}

  let op_hour = op_hour_start + ":00" + " ~ " + op_hour_end + ":00";
  let bk_time = bk_time_start + ":00" + " ~ " + bk_time_end + ":00";

  let sql =
    "INSERT INTO restaurant VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

  connection.query(
    sql,
    [
      name,
      category1,
      category2,
      telnum,
      coarse_location,
      real_location,
      op_hour,
      bk_time,
    ],
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get("/api/restaurants/name", (req, res) => {
  let sql = "SELECT name  FROM restaurant";
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/api/restaurants/category1", (req, res) => {
  const sql = "SELECT DISTINCT category1 FROM restaurant";
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/api/restaurants/category2", (req, res) => {
  const sql = "SELECT DISTINCT category2 FROM restaurant";
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/api/restaurants/coarse_location", (req, res) => {
  const sql = "SELECT DISTINCT coarse_location FROM restaurant";
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/api/restaurants/search", (req, res) => {
  const restName = req.body.name;
  const restCat1 = req.body.category1;
  const restCat2 = req.body.category2;
  const restLoc = req.body.coarse_location;
	console.log('req.body', req.body);

  let sql = "SELECT * FROM restaurant";
  let conditions = [];
  let params = [];

  if (restName.length) {
    conditions.push("name IN (?)");
    params.push(restName);
  }
  if (restCat1.length) {
    conditions.push("category1 IN (?)");
    params.push(restCat1);
  }
  if (restCat2.length) {
    conditions.push("category2 IN (?)");
    params.push(restCat2);
  }
	if (restLoc.length) {
    conditions.push("coarse_location IN (?)");
    params.push(restLoc);
  }

  if (conditions.length) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  console.log("sql:\n", sql);

  connection.query(sql, params, (error, results, fields) => {
    if (error) {
      return res.status(500).send("Server Error");
    } else {
      console.log(results);
      res.json(results);
      console.log("GET /api/restaurant/search is completed!");
    }
  });
});

{
  /* 요청한 가게 id를 받아서 해당되는 가게정보/메뉴만 따로 끌어와야한다. */
}
{
  /* 이때 해당 가게 id 어케 받음? */
}
app.get("/api/restaurants/detail/:id", (req, res) => {
  const restaurantId = req.params.id;
  let sql = ` SELECT restaurant.*, menu.* FROM restaurant
    LEFT JOIN menu ON restaurant.idrestaurant = menu.restaurant_idrestaurant
    WHERE restaurant.idrestaurant = ?`;
  // let sql1 = 'SELECT * FROM restaurant WHERE idrestaurant = ?';
  // let sql2 = 'SELECT * FROM menu WHERE restaurant_idrestaurant = ?';
  connection.query(sql, restaurant_id, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
