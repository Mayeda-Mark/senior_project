const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://shrrdpdlinqgpf:27ffb3fc195dd896f00335db1c2b4fcbe229c23a3255cd1e5dcec86373faa3ee@ec2-54-235-180-123.compute-1.amazonaws.com:5432/defe8vag2516cd?ssl=true';
const pool = new Pool({connectionString: connectionString});

const getStockDropdown = (callback) => {
    var sql = 'SELECT product_name FROM Stock ORDER BY product_name';
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while fetching for the stock dropdown');
            return console.log(err);
        }
        // console.log(result.rows);
        callback(null, result.rows);
    });
}

const getStock = (callback) => {
    var sql = 'SELECT * FROM Stock ORDER BY product_name';
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while fetching for the stock dropdown');
            return console.log(err);
        }
        callback(null, result.rows);
    });
}

const getUpdates = (callback) => {
    var sql = 'SELECT * FROM Updates ORDER BY id';
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while fetching for the stock dropdown');
            return console.log(err);
        }
        callback(null, result.rows);
    });
}

module.exports = {
    getStockDropdown,
    getStock,
    getUpdates
}