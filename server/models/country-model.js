const mongoose = require('mongoose');
const config = require('../../config').mongo;
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.dbuser}:${config.dbpassword}@ds143734.mlab.com:43734/currency-test-db`, {useMongoClient: true})
    .then(() => console.log('Succesfully connected to MongDB'))
    .catch(() => console.error('MongoDB connection error'));

const countrySchema = mongoose.Schema({
    alpha2: {type: String, required: true},
    alpha3: {type: String, required: true},
    countryCallingCodes: {type: [String], required: true},
    currencies: {type: [String], required: true},
    emoji: {type: String, required: true},
    ioc: {type: String, required: true},
    languages: {type: [String], required: true},
    name: {type: String, required: true},
    status: {type: String, required: true}
});

countrySchema.statics.findCountry = function (data) {
    return this.findOne(data);
}

countrySchema.statics.findCountries = function (data) {
    return this.find(data);
}

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;