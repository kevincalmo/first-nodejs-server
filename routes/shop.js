const express = require('express');
const router = express.Router();
const adminData = require('../routes/admin');
const userData = require('../routes/user');

const path = require('path');
const rootDir = require('../utils/path');

router.get('/', (req, res, next) => {
    console.log(adminData.products);
    res.render('shop', {
        products: adminData.products,
        pageTitle: 'Home Page',
        users: userData.users
    });
});

module.exports = router;