const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/product-page', (req, res, next) => {
res.sendFile(path.join(__dirname,'../','views','product.html'));
});

//le middleware sera en poste sur /product
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;