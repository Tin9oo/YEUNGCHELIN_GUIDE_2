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

app.get('/api/restaurants/name', (req, res) => {
    let sql = 'SELECT name  FROM restaurant';
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

app.get('/api/restaurants/category1', (req, res) => {
    const sql = 'SELECT DISTINCT category1 FROM restaurant';
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    )
})

app.get('/api/restaurants/coarse_location', (req, res) => {
    const sql = 'SELECT DISTINCT Coarse_location FROM restaurant';
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    )
})

app.post('/api/restaurants/search', (req, res) => {
    const restName = req.body.name;
    const restCat = req.body.category1;
    const restLoc = req.body.coarse_location;

    let sql = 'SELECT * FROM restaurant';
    let conditions = [];
    let params = [];

    if (restName.length) {
        conditions.push('name IN (?)');
        params.push(restName);
    }
    if (restCat.length) {
        conditions.push('category1 IN (?)');
        params.push(restCat);
    }
    if (restLoc.length) {
        conditions.push('Coarse_location IN (?)');
        params.push(restLoc);
    }

    if (conditions.length) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    console.log('sql:\n', sql);

    connection.query(
        sql, params,
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

app.get('/api/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    console.log("restaurantId1 ", restaurantId);
    let sql = 'SELECT * FROM restaurant WHERE idrestaurant = ?';
    connection.query(sql, restaurantId,
        (error, results, fields) => {
            if (error) throw error;
            else {
                console.log(results)
                res.json(results);
                console.log('GET /api/restaurants/detail/:id is completed!');
            }
            res.json(results);
        }
    );
});
app.get('/api/restaurants/:id/menu', (req, res) => {
    const restaurantId = req.params.id;
    console.log("restaurantId2 ", restaurantId);
    let sql = 'SELECT * FROM menu WHERE restaurant_idrestaurant = ?';
    connection.query(sql, restaurantId,
        (error, results, fields) => {
            if (error) throw error;
            else {
                console.log(results)
                res.json(results);
                console.log('GET /api/restaurants/:id/menu is completed!');
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});