const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;

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

app.get('/api/restaurants/search', (req, res) => {
    let sql = 'SELECT';
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});