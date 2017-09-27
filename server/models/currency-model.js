//TODO cache
const mongoose = require('mongoose');

const currencySchema = mongoose.Schema({
    symbol: {type: String, required: true},
    name: {type: String, required: true},
    symbol_native: {type: String, required: true},
    decimal_digits: {type: Number, required: true},
    rounding: {type: Number, required: true},
    code: {type: String, required: true},
    name_plural: {type: Number, required: true},
    exchange: {type: Number, required: true},
    top: {type: Boolean}
});

currencySchema.statics.findCurrency = function (data) {
    return this.findOne(data);
}

currencySchema.statics.findCurrencies = function (data) {
    return this.find(data);
}

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;
