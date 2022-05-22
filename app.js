const express = require('express');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin',adminRoute); // '/admin' est un filtre, toute les routes de adminRoute seront accessibles avec le prefixe /admin/nom_route_adminRoute
app.use(shopRoute);

//Faire une page 404
app.use('*', (req, res, next) => {
    console.log('hello');
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(9090);