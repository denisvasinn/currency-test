const countryModel = require('../models/country-model');
const currencyModel = require('../models/currency-model');
const dealModel = require('../models/deal-model');

function getCountries () {
    return countryModel.findCountries({});
};

async function getCountry (id) {
    const DEFAULT_COMMISSION = 0.2;
    const [country, currencies] = await Promise.all([
        countryModel.findCountry({_id: id}),
        currencyModel.findCurrencies()
    ]);
    const countryCurrencies = country.currencies.map((currencyCode) =>
        currencies.find((currency) => currencyCode === currency.code)
    );

    let deals = [];
    for (let i = 0; i < countryCurrencies.length; i++) {
        let currencyDeals = await dealModel.findDeals({from: countryCurrencies[i]._id});
        if (currencyDeals.length === 0) {
            for (let j = 0; j < currencies.length; j++) {
                const deal = {
                    from: countryCurrencies[i]._id,
                    to: currencies[j]._id,
                    abbreviation: `${countryCurrencies[i].code} => ${currencies[j].code}`,
                    commission: DEFAULT_COMMISSION,
                    foreignExchange: countryCurrencies[i].exchange - currencies[j].exchange
                };
                currencyDeals.push(deal);
            }
            currencyDeals = await dealModel.insertManyDeals(currencyDeals, null);
        }
        deals = [...deals, ...currencyDeals];
    }
    return deals;
}

module.exports = {getCountries, getCountry};
