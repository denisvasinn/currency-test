const express = require('express');
const authProvider = require('../providers/auth-provider');
const router = express.Router();

function responseWithUser (user) {
    return {
        err: null,
        auth: {
            id: user._id,
            username: user.username
        }
    }
}

router.post('/signin', (req, res, next) => {
    console.log(req.body);
    if (req.session.auth) {
        res.status(200).json(responseWithUser(req.session.user));
    }

    authProvider.signIn(req.body)
        .then((user) => {
            req.session.auth = user;
            res.status(200).json(responseWithUser(user));
        })
        .catch(next);
});

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    authProvider.signUp(req.body)
        .then((user) => {
            req.session.auth = user;
            res.status(200).json(responseWithUser(user));
        })
        .catch(next);
});

router.all('/signout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
