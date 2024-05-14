// const express = require('express');
// const mysql = require('mysql');

// Create connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//    // database: "nodemon" // Connect to the database here
// });

// const app = express();

// Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySQL connected!......');
// });

// // Route for creating database
// app.get('/create_db', (req, res) => {
//     const sql = 'CREATE DATABASE IF NOT EXISTS nodemon'; // Added IF NOT EXISTS to avoid errors if database already exists
//     // const sql='create database nodemon';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("Database 'nodemon' is created or already exists!");
//     });
// });
// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE mydb", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });


























// Route for creating table
// app.get('/create_table', (req, res) => {
//     const sql = 'CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT PRIMARY KEY)'; // Corrected the SQL syntax
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("Table 'posts' is created or already exists!");
//     });
// });

// app.listen('3000', () => {
//     console.log("Server listening on port number 3000");
// });



///////////////////////////////////
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database',
    port: 3306
});

// Parse JSON bodies for POST and PUT requests
app.use(express.json());

// CREATE operation - Insert a new record
app.post('/students', (req, res) => {
    const { name, age } = req.body;
    pool.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age], (error, results, fields) => {
        if (error) {
            console.error('Error creating student:', error);
            res.status(500).json({ error: 'Error creating student' });
            return;
        }
        res.status(201).json({ message: 'Student created successfully' });
    });
});

// READ operation - Retrieve all records
app.get('/students', (req, res) => {
    pool.query('SELECT * FROM students', (error, results, fields) => {
        if (error) {
            console.error('Error retrieving students:', error);
            res.status(500).json({ error: 'Error retrieving students' });
            return;
        }
        res.status(200).json(results);
    });
});

// READ operation - Retrieve a single record by ID
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM students WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            console.error('Error retrieving student:', error);
            res.status(500).json({ error: 'Error retrieving student' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }
        res.status(200).json(results[0]);
    });
});

// UPDATE operation - Update a record by ID
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const { name, age } = req.body;
    pool.query('UPDATE students SET name = ?, age = ? WHERE id = ?', [name, age, id], (error, results, fields) => {
        if (error) {
            console.error('Error updating student:', error);
            res.status(500).json({ error: 'Error updating student' });
            return;
        }
        res.status(200).json({ message: 'Student updated successfully' });
    });
});

// DELETE operation - Delete a record by ID
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM students WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            console.error('Error deleting student:', error);
            res.status(500).json({ error: 'Error deleting student' });
            return;
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
