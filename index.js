'use strict';
var fs = require('fs');

function extract(line) {
	var cols = line.split(':');

	return {
		username: cols[0],
		password: cols[1],
		uid: Number(cols[2]),
		gid: Number(cols[3]),
		comments: cols[4] && cols[4].split(','),
		homedir: cols[5],
		shell: cols[6]
	};
}

function getUser(str, username) {
	var lines = str.split('\n');
	var i = 0;
	var l = lines.length;

	while (i < l) {
		var user = extract(lines[i++]);

		if (user.username === username || user.uid === Number(username)) {
			return user;
		}
	}
}

module.exports = function (username, cb) {
	if (typeof username !== 'string' && typeof username !== 'number') {
		throw new TypeError('Expected a string or number');
	}

	fs.readFile('/etc/passwd', 'utf8', function (err, passwd) {
		if (err) {
			return cb(err);
		}

		cb(null, getUser(passwd, username));
	});
};

module.exports.sync = function (username) {
	if (typeof username !== 'string' && typeof username !== 'number') {
		throw new TypeError('Expected a string or number');
	}

	return getUser(fs.readFileSync('/etc/passwd', 'utf8'), username);
};
