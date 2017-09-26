function protectedMiddleware (req, res, next) {
    if (!req.session.auth) {
        res.redirect('/auth/signin');
    }
    next();
}

module.exports = protectedMiddleware;
