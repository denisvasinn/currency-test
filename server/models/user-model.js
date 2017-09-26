const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Number, required: true, default: Date.now()}
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
