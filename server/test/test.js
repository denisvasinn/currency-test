const authProvider = require('../server/providers/auth-provider');
const assert = require('assert');

describe('auth', function() {
    describe('#find()', function() {
        it('create new user', function() {
            return authProvider.signUp({username: 'testUser', password: 'test'});
        });
    });
});