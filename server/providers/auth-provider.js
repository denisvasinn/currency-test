const crypto = require('crypto');
const User = require('../models/user-model');

/**
 * 
 * @param {*} data
 * @param String data.username 
 * @param String data.password 
 * 
 */
async function signIn (data) {
    const hash = crypto.createHash('sha256');
    const error = new Error('Wrong login or/and password');
    const user = await User.findUser({username: data.username});
    if (user === null) {
        throw error;
    }
    const password = hash.update(data.password + user.date).digest('hex');
    if (user.password === password) {
        return user;
    } else {
        throw error;
    }
}

/**
 * 
 * @param {*} data
 * @param String data.username 
 * @param String data.password 
 * 
 */
async function signUp (data) {
    const hash = crypto.createHash('sha256');
    const users = await User.findUsers({username: data.username});
    if (users.length > 0) {
        throw new Error('Username already in use');
    }
    const date = new Date();
    const password = hash.update(data.password + date).digest('hex');
    return User.saveUser({username: data.username, password, date});
}

module.exports = {signIn, signUp};