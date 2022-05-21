const express = require('express');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.use(adminRoute);
app.use(shopRoute);

//Faire une page 404
app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found Bro !!!</h1>');
});

app.listen(9090);