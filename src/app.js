const path = require('path');
const pg = require('pg');
const Pool = require('pg-pool');
const express = require('express');
const hbs = require('hbs');
const publicRouters = require('./routers/publicRouters');
const adminRouters = require('./routers/adminRouters');
const connectionString = process.env.DATABASE_URL || 'postgres://shrrdpdlinqgpf:27ffb3fc195dd896f00335db1c2b4fcbe229c23a3255cd1e5dcec86373faa3ee@ec2-54-235-180-123.compute-1.amazonaws.com:5432/defe8vag2516cd?ssl=true';
const pool = new Pool({connectionString: connectionString});

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.json());
app.use(publicRouters);
app.use(adminRouters);

var sql = 'SELECT * FROM test WHERE id = 1';
pool.query(sql, (err, result)=>{
    if(err){
        console.log('There was an error!');
        console.log(err);
    }
    console.log('Back from DB');
    console.log(result.rows);
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});