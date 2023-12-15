const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const db_info = fs.readFileSync('../database.json');
const db_conf = JSON.parse(db_info);

const connection = mysql.createConnection(db_conf);

connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
})

app.get('/api/restaurants', (req, res) => {
    let sql = 'SELECT * FROM restaurant';
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});


app.get('/api/restaurants/names', (req, res) => {
    let sql = 'SELECT name  FROM restaurant';
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

app.post('/api/restaurants/search', (req, res) => {
    const restNames = req.body;
    console.log(restNames);

    let sql = 'SELECT * FROM restaurant WHERE name IN (?)';
    connection.query(
        sql, [restNames],
        (error, results, fields) => {
            if (error) {
                return res.status(500).send('Server Error');
            } else {
                console.log(results);
                res.json(results);
                console.log('GET /api/restaurant/search is completed!');
            }
        }
    );
});

{/* 요청한 가게 id를 받아서 해당되는 가게정보/메뉴만 따로 끌어와야한다. */}
{/* 이때 해당 가게 id 어케 받음? */}
app.get('/api/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    console.log("restaurantId: ", restaurantId);
    let sql = 'SELECT * FROM restaurant WHERE idrestaurant = ?';
    connection.query(sql, restaurantId,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});
app.get('/api/restaurants/:id/menu', (req, res) => {
    const restaurantId = req.params.id;
    let sql = 'SELECT * FROM menu WHERE restaurant_idrestaurant = ?';
    connection.query(sql, restaurantId,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});