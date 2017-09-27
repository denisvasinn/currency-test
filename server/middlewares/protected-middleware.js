function protectedMiddleware (req, res, next) {
    if (!req.session.auth) {
        next({code: 401, message: 'Unauthorized'})
    }
    next();
}

module.exports = protectedMiddleware;
