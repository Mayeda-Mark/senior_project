const path = require('path');
const express = require('express');
const hbs = require('hbs');
const publicRouters = require('./routers/publicRouters');
const adminRouters = require('./routers/adminRouters');

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

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});