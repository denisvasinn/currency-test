const express = require('express');
const authProvider = require('../providers/auth-provider');
const countryProvider = require('../providers/country-provider');
const dealProvider = require('../providers/deal-provider');
const router = express.Router();

/**
 *
 * @param {*} req express req
 * @param String data.username
 * @param String data.password
 *
 */

router.use((req, res, next) => {
    const {username, password} = req.body;
    authProvider.signIn({username, password})
        .then((user) => {
            delete req.body.username;
            delete req.body.password;
            req.auth = user;
            next();
        })
        .catch(next);
});

router
    .post('/countries', (req, res, next) => {
        countryProvider.findCountries({})
            .then((countries) => {
                res.status(200).json(countries);
            })
            .catch(next)
    })
    .post('/countries/:id', (req, res, next) => {
        countryProvider.getCountry(req.params.id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(next);
    });

module.exports = router;
