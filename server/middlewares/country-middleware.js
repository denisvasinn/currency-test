const express = require('express');
const countryProvider = require('../providers/country-provider');
const router = express.Router();

router.get('/', (req, res, next) => {
    countryProvider.getCountries({})
        .then((countries) => {
            res.status(200).json(countries);
        })
        .catch(next)
});

router.get('/:id', (req, res, next) => {
    countryProvider.getCountry(req.params.id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(next)
})

module.exports = router;
