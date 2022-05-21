const express = require('express');
const router = express.Router();

router.use('/product-page', (req, res, next) => {
    res.send("<body><form method='POST' action='/product'><input type='text' name='title' > <button type='submit'>Add title</button>'</form></body>");
});

//le middleware sera en poste sur /product
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;