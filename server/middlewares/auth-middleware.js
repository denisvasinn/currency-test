const express = require('express');
const authProvider = require('../providers/auth-provider');
const router = express.Router();

function responseWithUser (user) {
    return {
        err: null,
        user: {
            username: user.username
        }
    }
}

router.post('/signin', (req, res, next) => {
    if (req.session.user) {
        res.status(200).json(responseWithUser(req.session.user));
    }
    authProvider.signIn(req.body)
        .then((user) => {
            req.session.user = user;
            res.status(200).json(responseWithUser(user));
        })
        .catch(next);
});

router.post('/signup', (req, res, next) => {
    console.log('\n\n\n', req.body)
    authProvider.signUp(req.body)
        .then((user) => {
            req.session.user = user;
            res.status(200).json(responseWithUser(user));
        })
        .catch(next);
});

router.all('/signout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;