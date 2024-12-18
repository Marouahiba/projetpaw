const mysql = require('mysql2');

// Connect to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Replace with your MySQL username
  password: 'pass123', // Replace with your MySQL password
  database: "TODOLIST"
});

// Define the schema SQL
const schema = `
  CREATE DATABASE IF NOT EXISTS todolist;

  USE todolist;

  CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS priorities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level ENUM('High', 'Medium', 'Low') NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    priority_id INT,
    done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (priority_id) REFERENCES priorities(id) ON DELETE SET NULL
  );

  INSERT INTO priorities (level) VALUES ('High'), ('Medium'), ('Low')
  ON DUPLICATE KEY UPDATE level=VALUES(level);

  INSERT INTO categories (name) VALUES ('Work'), ('Personal'), ('Health')
  ON DUPLICATE KEY UPDATE name=VALUES(name);
`;

// Execute the schema script
connection.query((err) => {
  if (err) {
    console.error('Failed to initialize the database:', err.message);
  } else {
    console.log('Database and tables created successfully.');
  }
});
