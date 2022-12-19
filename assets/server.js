const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: '',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

app.post(`/api/new-movie`, ({ body }, res) => {
    const sql = `INSERT INTO movies (movie_name)
        VALUES (?)`;
    const params = [body.movie_name];

    db.query( sql, params, (err, result) => {
        if (err) {
         res.status(400).json({error: err.message});
         return;
        }
        res.json({
            message: `success`,
            data: body
        });
      });
});

app.get(`/api/all-movies`, (req, res) => {
    const sqlm ='SELECT * FROM movies';

    db.query(sqlm, function (err, data)  {
        if (err) throw err;
        res.render('user-list', { title: 'User List', userData: data})
});


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
