import mysql from 'mysql2';

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nav123",
    database: "testing",
  });

  database.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  

export default database