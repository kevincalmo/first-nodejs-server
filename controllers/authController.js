const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    //je récupère le cookie
    //const isLoggin = req.get('Cookie').split('=')[1];
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    //création d'un cookie
    //res.setHeader('Set-Cookie', 'isLoggedIn=true');
    User.findById('62af00d3ceb44fe30353ea13')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            //Bonne Pratique: sauvegarde de la session dans mongodb
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

