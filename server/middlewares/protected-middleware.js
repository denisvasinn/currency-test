function protectedMiddleware (req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth/signin');
    }
    next();
}

module.exports = protectedMiddleware;