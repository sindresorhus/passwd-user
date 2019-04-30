'use strict';
const {promisify} = require('util');
const fs = require('fs');
const execa = require('execa');

const readFileP = promisify(fs.readFile);

function extractDarwin(line) {
	const columns = line.split(':');

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
		userName: columns[0],
		password: columns[1],
		uid: Number(columns[2]),
		gid: Number(columns[3]),
		fullName: columns[7],
		homeDirectory: columns[8],
		shell: columns[9]
	};
}

function extractLinux(line) {
	const columns = line.split(':');

	// Linux passwd(5):
	// 0 login name
	// 1 optional encrypted password
	// 2 numerical user ID
	// 3 numerical group ID
	// 4 user name or comment field
	// 5 user home directory
	// 6 optional user command interpreter

	return {
		userName: columns[0],
		password: columns[1],
		uid: Number(columns[2]),
		gid: Number(columns[3]),
		fullName: columns[4] && columns[4].split(',')[0],
		homeDirectory: columns[5],
		shell: columns[6]
	};
}

const extract = process.platform === 'linux' ? extractLinux : extractDarwin;

function getUser(passwd, userName) {
	const lines = passwd.split('\n');
	const linesCount = lines.length;
	let i = 0;

	while (i < linesCount) {
		const user = extract(lines[i++]);

		if (user.userName === userName || user.uid === Number(userName)) {
			return user;
		}
	}
}

module.exports = async userName => {
	if (userName === undefined) {
		if (typeof process.getuid !== 'function') {
			// eslint-disable-next-line unicorn/prefer-type-error
			throw new Error('Platform not supported');
		}

		userName = process.getuid();
	}

	if (process.platform === 'linux') {
		return getUser(await readFileP('/etc/passwd', 'utf8'), userName);
	}

	if (process.platform === 'darwin') {
		const result = await execa('/usr/bin/id', ['-P', userName]);
		return getUser(result.stdout, userName);
	}

	throw new Error('Platform not supported');
};

module.exports.sync = userName => {
	if (userName === undefined) {
		if (typeof process.getuid !== 'function') {
			// eslint-disable-next-line unicorn/prefer-type-error
			throw new Error('Platform not supported');
		}

		userName = process.getuid();
	}

	if (process.platform === 'linux') {
		return getUser(fs.readFileSync('/etc/passwd', 'utf8'), userName);
	}

	if (process.platform === 'darwin') {
		return getUser(execa.sync('/usr/bin/id', ['-P', userName]).stdout, userName);
	}

	throw new Error('Platform not supported');
};
