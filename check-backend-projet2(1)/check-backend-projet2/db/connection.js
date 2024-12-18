// // const mysql = require('mysql2');
// // require('dotenv').config();

// // // const connection = mysql.createConnection({
// // //     host: process.env.DB_HOST,
// // //     user: process.env.DB_USER,
// // //     password: process.env.DB_PASSWORD,
// // //     database: process.env.DB_NAME,
// // //     multipleStatements: true,
// // // });
// // const connection = mysql.createConnection({
// //     uri: process.env.DB_URL,
// //     multipleStatements: true,
// //     waitForConnections: true,
// //     connectionLimit: 10, // Adjust the limit as needed
// //     queueLimit: 0,
// // });


// // function handleDisconnect() {
// //     // the old one cannot be reused.

// //     connection.connect(function (err) {              // The server is either down
// //         if (err) {                                     // or restarting (takes a while sometimes).
// //             console.log('error when connecting to db:', err);
// //             setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
// //         }                                     // to avoid a hot loop, and to allow our node script to
// //     });                                     // process asynchronous requests in the meantime.
// //     // If you're also serving http, display a 503 error.
// //     connection.on('error', function (err) {
// //         console.log('db error', err);
// //         if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
// //             handleDisconnect();                         // lost due to either server restart, or a
// //         } else {                                      // connnection idle timeout (the wait_timeout
// //             throw err;                                  // server variable configures this)
// //         }
// //     });
// //     console.log("connecting to mysql")
// // }
// // handleDisconnect();
// // module.exports = connection;

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const connection = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
        throw err;
    } else {
        console.log('Connected to SQLite database.');
    }
});

// // Enable support for handling multiple statements (optional)


module.exports = connection;

