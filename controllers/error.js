exports.errorPage = (req, res, next) => {
    console.log('hello');
    res.status(404).render('404', { pageTitle: 'Page non trouvé :( -- controller--' });
}