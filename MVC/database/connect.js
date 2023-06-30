const mysql = require("mysql2");

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'latihan_db'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
    connection.release();
  }
});

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = query;
