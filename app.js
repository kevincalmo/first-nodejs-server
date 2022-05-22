const express = require('express');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin',adminRoute); // '/admin' est un filtre, toute les routes de adminRoute seront accessibles avec le prefixe /admin/nom_route_adminRoute
app.use(shopRoute);

//Faire une page 404
app.use('*', (req, res, next) => {
    console.log('hello');
    res.status(404).send('<h1>Page Not Found Bro !!!</h1>');
});

app.listen(9090);