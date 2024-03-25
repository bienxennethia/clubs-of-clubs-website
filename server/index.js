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

app.get('/clubs', (req, res) => {const { type, id } = req.query;
  let query = `
    SELECT club_table.*, club_type_table.name AS type_name
    FROM club_table 
    LEFT JOIN club_type_table ON club_table.type = club_type_table.id`;


  if (id) {
    query += ` WHERE club_table.id = ${id}`; // Modify query to filter by ID if provided
  } else if (type) {
    query += ` WHERE club_type_table.id = '${type}'`; // Modify query to filter by type if provided
  }

  query += ' ORDER BY club_table.name ASC';
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
  const { name, description, type, image, mission, vision } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'Name and club type ID are required' });
  }

  const query = 'INSERT INTO club_table (name, description, type, image, mission, vision) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, description, type, image, mission, vision];

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

app.put('/clubs/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, type, image, mission, vision } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'Name and club type ID are required' });
  }

  // Construct the UPDATE query
  const query = `
    UPDATE club_table 
    SET name = ?, description = ?, type = ?, image = ?, mission = ?, vision = ? 
    WHERE id = ?`;

  const values = [name, description, type, image, mission, vision, id];

  // Execute the query
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Fetch the updated club
    
    let fetchQuery = `
    SELECT club_table.*, club_type_table.name AS type_name
    FROM club_table 
    LEFT JOIN club_type_table ON club_table.type = club_type_table.id  
    WHERE club_table.id = ?`;

    connection.query(fetchQuery, [id], (fetchErr, club) => {
      if (fetchErr) {
        console.error('Error executing MySQL query:', fetchErr);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      // Return the updated club
      res.status(200).json({ message: 'Club updated successfully', result: club });
    });
  });
});


app.delete('/clubs/:id', (req, res) => {
  const clubId = req.params.id;

  if (!clubId) {
    return res.status(400).json({ message: 'Club ID is required' });
  }

  const query = 'DELETE FROM club_table WHERE id = ?';

  connection.query(query, [clubId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Check if any rows were affected by the deletion
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Club successfully deleted
    res.status(200).json({ message: 'Club deleted successfully' });
  });
});

