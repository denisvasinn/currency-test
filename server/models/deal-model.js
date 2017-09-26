//TODO cache
const mongoose = require('mongoose');

const dealSchema = mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    abbreviation: {type: String, required: true},
    commission: {type: Number, required: true},
    foreignExchange: {type: Number, required: true, default: 0}
});

dealSchema.statics.findDeal = function (data) {
    return this.findOne(data);
}

dealSchema.statics.findDeals = function (data) {
    return this.find(data);
}

dealSchema.statics.saveDeal = function (data) {
    const deal = new this(data);
    return deal.save();
}

dealSchema.statics.findOneOrUpdate = function (query, doc) {
    const options = {
        new: true,
        upsert: true
    };
    return this.findOneAndUpdate(query, doc, options);
}

dealSchema.statics.insertManyDeals = function (docs, options) {
    return this.insertMany(docs, options);
}

dealSchema.statics.updateDeal = function (id, update = {}) {
  return this.findOneAndUpdate({_id: id}, update);
}

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
