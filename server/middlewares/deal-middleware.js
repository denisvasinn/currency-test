const express = require('express');
const dealProvider = require('../providers/deal-provider');
const router = express.Router();

router.get('/', (req, res, next) => {
    dealProvider.findDeals()
        .then((deals) => res.status(200).json(deals))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('id', id);
    console.log('body', req.body)
    dealProvider.updateDeal({_id: id}, req.body)
        .then((deal) => res.status(200).json(deal))
        .catch(next);
});

module.exports = router;
