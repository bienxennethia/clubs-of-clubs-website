const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000' // Replace 'http://example.com' with your actual frontend URL
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'club_for_cubs_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/club-types', (req, res) => {
  const query = 'SELECT * FROM club_type_table';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.get('/clubs', (req, res) => {const { type } = req.query;
  let query = 'SELECT * FROM club_table';

  if (type) {
    query += ` WHERE type = '${type}'`; // Modify query to filter by type if provided
  }

  query += ' ORDER BY name ASC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.put('/clubs', (req, res) => {
  const { name, description, type, image } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'Name and club type ID are required' });
  }

  const query = 'INSERT INTO club_table (name, description, type, image) VALUES (?, ?, ?, ?)';
  const values = [name, description, type, image];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // After adding the club, fetch all clubs and return them along with success message
    const fetchQuery = 'SELECT * FROM club_table ORDER BY name ASC';
    connection.query(fetchQuery, (fetchErr, clubs) => {
      if (fetchErr) {
        console.error('Error executing MySQL query:', fetchErr);
        return res.status(500).json({ message: 'Internal server error' });
      }
      // Return success message along with the newly added club's ID and all clubs
      res.status(201).json({ id: results.insertId, message: 'Club added successfully', result: clubs });
    });
  });
});


