const express = require('express');
const router = express.Router();
const pool = require('./db');
const {
  clubTableQuery,
  clubTypeTableQuery,
  forumTableQuery
} = require('./tableQueries');

router.get('/club-types', async (req, res) => {
  try {
    const query = 'SELECT * FROM club_type_table';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/clubs', async (req, res) => {
  const { type, id, isActive } = req.query;
  let query = `
    SELECT club_table.*, club_type_table.name AS type_name
    FROM club_table 
    LEFT JOIN club_type_table ON club_table.type = club_type_table.id`;

  const values = [];

  if (id) {
    query += ` WHERE club_table.id = $1`;
    values.push(id);
  } else if (type) {
    query += ` WHERE club_type_table.id = $1`;
    values.push(type);
  }

  if (isActive === 'true') {
    query += ' AND club_table.is_active = 1';
  } else if (isActive === 'false') {
    query += ' AND club_table.is_active = 0';
  }

  if (!query.includes('WHERE')) {
    query += ' WHERE';
  } else {
    query += ' AND';
  }

  query += ' club_table.isActive = 1 ORDER BY club_table.name ASC';

  try {
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/clubs', async (req, res) => {
  const { name, description, type, image, mission, vision } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'Name and club type ID are required' });
  }

  const query = 'INSERT INTO club_table (name, description, type, image, mission, vision) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [name, description, type, image, mission, vision];

  try {
    const { rows } = await pool.query(query, values);
    const fetchQuery = 'SELECT * FROM club_table ORDER BY name ASC';
    const clubs = await pool.query(fetchQuery);
    res.status(201).json({ id: rows[0].id, message: 'Club added successfully', result: clubs.rows });
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/clubs/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, type, image, mission, vision } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'Name and club type ID are required' });
  }

  const query = `
    UPDATE club_table 
    SET name = $1, description = $2, type = $3, image = $4, mission = $5, vision = $6 
    WHERE id = $7 RETURNING *`;

  const values = [name, description, type, image, mission, vision, id];

  try {
    const { rows } = await pool.query(query, values);
    const fetchQuery = `
      SELECT club_table.*, club_type_table.name AS type_name
      FROM club_table 
      LEFT JOIN club_type_table ON club_table.type = club_type_table.id  
      WHERE club_table.id = $1`;
    const { rows: club } = await pool.query(fetchQuery, [id]);
    res.status(200).json({ message: 'Club updated successfully', result: club });
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/clubs/delete/:id', async (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE club_table 
    SET isActive = $1
    WHERE id = $2`;

  const values = [0, id];

  try {
    await pool.query(query, values);
    res.status(200).json({ message: 'Club deleted successfully' });
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Forums
router.get('/forums', async (req, res) => {
  const { club_id, id, club_id_2, search_string } = req.query;
  let query = `
    SELECT forum_table.*, club_table.*, forum_table.created_at AS forum_created , club_table.name AS club_name
    FROM forum_table 
    LEFT JOIN club_table ON forum_table.club_id = club_table.id`;
 
  if (id) {
    query += ` WHERE forum_table.forum_id = $1`;
  } else if (club_id && !club_id_2) {
    query += ` WHERE forum_table.club_id = $1`;
  } else if (!club_id && club_id_2) {
    query += ` WHERE forum_table.club_id = $1`;
  } else if (club_id && club_id_2) {
    query += ` WHERE forum_table.club_id = $1 OR forum_table.club_id = $2`;
  } 
  
  if (search_string) {
    query += ` AND forum_table.forum_name LIKE '%' || $${id ? 2 : 1} || '%'`;
  }
    
  query += ' ORDER BY forum_table.created_at DESC';

  try {
    let parameters = [];
    if (id) {
      parameters.push(id);
    }
    if (club_id && !club_id_2) {
      parameters.push(club_id);
    }
    if (!club_id && club_id_2) {
      parameters.push(club_id_2);
    }
    if (club_id && club_id_2) {
      parameters.push(club_id, club_id_2);
    }
    const { rows } = await pool.query(query, parameters);
    res.json(rows);
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/forums', async (req, res) => {
  const { club_id, forum_name, forum_description, forum_image } = req.body;

  if (!forum_name || !club_id) {
    return res.status(400).json({ message: 'Name and club ID are required' });
  }

  const query = 'INSERT INTO forum_table (club_id, forum_name, forum_description, forum_image) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [club_id, forum_name, forum_description, forum_image];

  try {
    const { rows } = await pool.query(query, values);

    const fetchQuery = `
      SELECT forum_table.*, club_table.*, forum_table.created_at AS forum_created , club_table.name AS club_name
      FROM forum_table 
      LEFT JOIN club_table ON forum_table.club_id = club_table.id
      ORDER BY forum_table.created_at DESC`;

    const { rows: clubs } = await pool.query(fetchQuery);

    res.status(201).json({ id: rows[0].forum_id, message: 'Forum added successfully', result: clubs });
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/forums/:id', async (req, res) => {
  const { id } = req.params;
  const { club_id, forum_name, forum_description, forum_image } = req.body;

  if (!forum_name || !club_id) {
    return res.status(400).json({ message: 'Name and club ID are required' });
  }

  const updateQuery = `
    UPDATE forum_table 
    SET forum_name = $1, forum_description = $2, club_id = $3, forum_image = $4
    WHERE forum_id = $5`;

  const selectQuery = `
    SELECT forum_table.*, club_table.*, forum_table.created_at AS forum_created, club_table.name AS club_name
    FROM forum_table 
    LEFT JOIN club_table ON forum_table.club_id = club_table.id
    WHERE forum_table.forum_id = $1
    ORDER BY forum_table.created_at DESC`;

  const updateValues = [forum_name, forum_description, club_id, forum_image, id];

  try {
    await pool.query(updateQuery, updateValues);
    const { rows } = await pool.query(selectQuery, [id]);
    res.status(200).json({ message: 'Forum updated successfully', result: rows });
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/forums/:id', async (req, res) => {
  const forumId = req.params.id;

  if (!forumId) {
    return res.status(400).json({ message: 'Forum ID is required' });
  }

  const deleteQuery = 'DELETE FROM forum_table WHERE forum_id = $1';
  const selectQuery = 'SELECT * FROM forum_table WHERE forum_id = $1';

  try {
    const deleteResult = await pool.query(deleteQuery, [forumId]);
    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.status(200).json({ message: 'Forum deleted successfully' });
  } catch (err) {
    console.error('Error executing PostgreSQL query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
