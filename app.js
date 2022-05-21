const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({extended: true}));

app.use('/product-page', (req, res, next) => {
    res.send("<body><form method='POST' action='/product'><input type='text' name='title' > <button type='submit'>Add title</button>'</form></body>");
});

//le middleware sera en poste sur /product
app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>HELLO FROM EXPRESS !</h1>');
});

app.listen(9090);