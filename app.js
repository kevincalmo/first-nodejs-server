const express = require('express');

const app = express()

app.use('/product-page',(req, res, next) => {
    console.log("product-page middleware");
    res.send('<h1>HELLO FROM PRODUCT-PAGE !</h1>');
});

app.use('/',(req, res, next) => {
    console.log("in another middleware");
    res.send('<h1>HELLO FROM EXPRESS !</h1>');
});

app.listen(9090);