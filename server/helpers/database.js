const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: process.env.DB_HOST, 
     user: process.env.DB_USER, 
     password: process.env.DB_PASS,
     database: process.env.DB_NAME,
     connectionLimit: 5
});

pool.getConnection((err, connection) => {
     if(err){
         if (err.code === 'PROTOCOL_CONNECTION_LOST'){
             console.error('Database connection lost');
         }
         else if (err.code === 'ER_CON_COUNT_ERROR'){
             console.error('Database has too many connection');
         }
         else if (err.code === 'ECONNREFUSED'){
             console.error('Database connection refused');
         }
     
     }
     if(connection) connection.release();
 
 });
 
 module.exports = pool;