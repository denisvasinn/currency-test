const mongoose = require('mongoose');
const config = require('../../config').mongo;
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.dbuser}:${config.dbpassword}@ds143734.mlab.com:43734/currency-test-db`, {useMongoClient: true})
    .then(() => console.log('Succesfully connected to MongDB'))
    .catch(() => console.error('MongoDB connection error'));

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now()}
});

userSchema.statics.saveUser = function (data) {
    const user = new this(data);
    return user.save();
}

userSchema.statics.findUser = function (data) {
    return this.findOne(data);
}

userSchema.statics.findUsers = function (data) {
    return this.find(data);
}

const User = mongoose.model('User', userSchema);

module.exports = User;