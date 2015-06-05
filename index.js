'use strict';
var fs = require('fs');
var execFile = require('child_process').execFile;
var execFileSync = require('exec-file-sync');

function extractDarwin(line) {
	var cols = line.split(':');

	// Darwin passwd(5)
	// 0 name      User's login name.
	// 1 password  User's encrypted password.
	// 2 uid       User's id.
	// 3 gid       User's login group id.
	// 4 class     User's general classification (unused).
	// 5 change    Password change time.
	// 6 expire    Account expiration time.
	// 7 gecos     User's full name.
	// 8 home_dir  User's home directory.
	// 9 shell     User's login shell.

	return {
		username: cols[0],
		password: cols[1],
		uid: Number(cols[2]),
		gid: Number(cols[3]),
		fullname: cols[7],
		homedir: cols[8],
		shell: cols[9]
	};
}

function extractLinux(line) {
	var cols = line.split(':');

	// Linux passwd(5):
	// 0 login name
	// 1 optional encrypted password
	// 2 numerical user ID
	// 3 numerical group ID
	// 4 user name or comment field
	// 5 user home directory
	// 6 optional user command interpreter

	return {
		username: cols[0],
		password: cols[1],
		uid: Number(cols[2]),
		gid: Number(cols[3]),
		fullname: cols[4] && cols[4].split(',')[0],
		homedir: cols[5],
		shell: cols[6]
	};
}

function getUser(str, username) {
	var lines = str.split('\n');
	var i = 0;
	var l = lines.length;
	var extract = process.platform === 'linux' ? extractLinux : extractDarwin;

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

	if (process.platform === 'linux') {
		fs.readFile('/etc/passwd', 'utf8', function (err, passwd) {
			if (err) {
				cb(err);
				return;
			}

			cb(null, getUser(passwd, username));
		});
	} else if (process.platform === 'darwin') {
		execFile('/usr/bin/id', ['-P', username], function (err, stdout) {
			if (err) {
				cb(err);
				return;
			}

			cb(null, getUser(stdout, username));
		});
	} else {
		throw new Error('Platform not supported');
	}
};

module.exports.sync = function (username) {
	if (typeof username !== 'string' && typeof username !== 'number') {
		throw new TypeError('Expected a string or number');
	}

	if (process.platform === 'linux') {
		return getUser(fs.readFileSync('/etc/passwd', 'utf8'), username);
	} else if (process.platform === 'darwin') {
		return getUser(execFileSync('/usr/bin/id', ['-P', username]).toString(), username);
	} else {
		throw new Error('Platform not supported');
	}
};
