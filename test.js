'use strict';
var assert = require('assert');
var passwdUser = require('./index');

it('should get passwd entry async', function (cb) {
	passwdUser('root', function (err, user) {
		assert(!err, err);
		assert.equal(user.uid, 0);
		cb();
	});
});

it('should get passwd entry', function () {
	assert.equal(passwdUser.sync('root').uid, 0);
	assert.equal(passwdUser.sync(0).username, 'root');
});
