const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path');

const users = [];

router.get('/', (req, res, next) => {
    res.render('user',{pageTitle: 'Add-User'});
});

router.post('/add-user', (req, res, next) => {
    users.push({ name: req.body.userName });
    res.redirect('/');
});

exports.routes = router;
exports.users = users;