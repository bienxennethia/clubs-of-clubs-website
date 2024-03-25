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
    query += ` WHERE club_table.id = ${id}`;
  } else if (type) {
    query += ` WHERE club_type_table.id = '${type}'`;
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

  const query = `
    UPDATE club_table 
    SET name = ?, description = ?, type = ?, image = ?, mission = ?, vision = ? 
    WHERE id = ?`;

  const values = [name, description, type, image, mission, vision, id];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
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

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json({ message: 'Club deleted successfully' });
  });
});

// Forums
app.get('/forums', (req, res) => {const { club_id, id, club_id_2 } = req.query;
  let query = `
    SELECT forum_table.*, club_table.*, forum_table.created_at AS forum_created , club_table.name AS club_name
    FROM forum_table 
    LEFT JOIN club_table ON forum_table.club_id = club_table.id`;
 
  if (id) {
    query += ` WHERE forum_table.forum_id = ${id}`;
  } else if (club_id && !club_id_2) {
    query += ` WHERE forum_table.club_id = '${club_id}'`;
  } else if (!club_id && club_id_2) {
    query += ` WHERE forum_table.club_id = '${club_id_2}'`;
  } else if (club_id && club_id_2) {
    query += ` WHERE forum_table.club_id = '${club_id}' OR forum_table.club_id = '${club_id_2}'`;
  }
    

  query += ' ORDER BY forum_table.created_at DESC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.put('/forums', (req, res) => {
  const { club_id, forum_name, forum_description, forum_image } = req.body;

  if (!forum_name || !club_id) {
    return res.status(400).json({ message: 'Name and club ID are required' });
  }

  const query = 'INSERT INTO forum_table (club_id, forum_name, forum_description, forum_image) VALUES (?, ?, ?, ?)';
  const values = [club_id, forum_name, forum_description, forum_image];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    let fetchQuery = `
      SELECT forum_table.*, club_table.*, forum_table.created_at AS forum_created , club_table.name AS club_name
      FROM forum_table 
      LEFT JOIN club_table ON forum_table.club_id = club_table.id
      ORDER BY forum_table.created_at DESC`;

    connection.query(fetchQuery, (fetchErr, clubs) => {
      if (fetchErr) {
        console.error('Error executing MySQL query:', fetchErr);
        return res.status(500).json({ message: 'Internal server error' });
      }
      // Return success message along with the newly added forum's ID and all clubs
      res.status(201).json({ id: results.insertId, message: 'Froum added successfully', result: clubs });
    });
  });
});

app.put('/forums/:id', (req, res) => {
  const { id } = req.params;
  const { club_id, forum_name, forum_description, forum_image } = req.body;

  if (!forum_name || !club_id) {
    return res.status(400).json({ message: 'Name and club ID are required' });
  }

  const query = `
    UPDATE forum_table 
    SET forum_name = ?, forum_description = ?, club_id = ?, forum_image = ?
    WHERE forum_id = ?`;

  const values = [forum_name, forum_description, club_id, forum_image, id];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
  let fetchQuery = `
    SELECT forum_table.*, club_table.*, forum_table.created_at AS forum_created , club_table.name AS club_name
    FROM forum_table 
    LEFT JOIN club_table ON forum_table.club_id = club_table.id
    ORDER BY forum_table.created_at DESC`;

    connection.query(fetchQuery, [id], (fetchErr, club) => {
      if (fetchErr) {
        console.error('Error executing MySQL query:', fetchErr);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      res.status(200).json({ message: 'Forum updated successfully', result: club });
    });
  });
});

app.delete('/forums/:id', (req, res) => {
  const forumId = req.params.id;

  if (!forumId) {
    return res.status(400).json({ message: 'Forum ID is required' });
  }

  const query = 'DELETE FROM forum_table WHERE forum_id = ?';

  connection.query(query, [forumId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Forum not found' });
    }

    res.status(200).json({ message: 'Forum deleted successfully' });
  });
});