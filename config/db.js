const mysql = require('mysql2');

const mydb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db',
});

mydb.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

module.exports = mydb;
