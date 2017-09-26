const dealModel = require('../models/deal-model');

function findDeals () {
    return dealModel.findDeals({});
}

function updateDeal (query, doc) {
    return dealModel.findOneOrUpdate(query, doc);
}

module.exports = {updateDeal};
