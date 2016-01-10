'use strict';
var assert = require('assert');
var passwdUser = require('./');

it('should get passwd entry async', function (cb) {
	passwdUser('root').then(function (user) {
		assert.equal(user.uid, 0);

		if (process.platform === 'linux') {
			assert.strictEqual(user.homedir, '/root');
		} else if (process.platform === 'darwin') {
			assert.strictEqual(user.homedir, '/var/root');
		}

		cb();
	});
});

it('should get passwd entry', function () {
	assert.equal(passwdUser.sync('root').uid, 0);
	assert.equal(passwdUser.sync(0).username, 'root');

	if (process.platform === 'linux') {
		assert.strictEqual(passwdUser.sync('root').homedir, '/root');
	} else if (process.platform === 'darwin') {
		assert.strictEqual(passwdUser.sync('root').homedir, '/var/root');
	}
});
