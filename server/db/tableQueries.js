const clubTypeTableQuery = `
  CREATE TABLE IF NOT EXISTS club_type_table (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

  INSERT INTO club_type_table (id, name) VALUES
  ('all', 'All Clubs (Alphabetically)'),
  ('curricular', 'Co-Curricular'),
  ('interest', 'Interest');
`;

const clubTableQuery = `
  CREATE TABLE IF NOT EXISTS club_table (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    mission VARCHAR(255) DEFAULT NULL,
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(45) DEFAULT NULL,
    vision VARCHAR(255) DEFAULT NULL,
    isActive INT DEFAULT 1,
    PRIMARY KEY (id),
    KEY type_idx (type),
    CONSTRAINT type FOREIGN KEY (type) REFERENCES club_type_table (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

const forumTableQuery = `
  CREATE TABLE IF NOT EXISTS forum_table (
    forum_id INT NOT NULL AUTO_INCREMENT,
    forum_name VARCHAR(255) NOT NULL,
    forum_description LONGTEXT,
    forum_image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    club_id INT DEFAULT NULL,
    PRIMARY KEY (forum_id),
    KEY club_id_idx (club_id),
    CONSTRAINT club_id_fk FOREIGN KEY (club_id) REFERENCES club_table (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

module.exports = {
  clubTableQuery,
  clubTypeTableQuery,
  forumTableQuery
};
