import mysql from 'mysql2';

const db = mysql.createConnection({
    host: '134.255.252.14',
    user: 'rayan',
    password: 'rayan',
    database: 'shopify_tracker'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

// export db
export default db;