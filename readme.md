# passwd-user [![Build Status](https://travis-ci.org/sindresorhus/passwd-user.svg?branch=master)](https://travis-ci.org/sindresorhus/passwd-user)

> Get the [passwd](http://en.wikipedia.org/wiki/Passwd) user entry from a username or [uid](http://en.wikipedia.org/wiki/User_identifier_(Unix))

Works on OS X and Linux.


## Instal

```
$ npm install --save passwd-user
```


## Usage

```js
var passwdUser = require('passwd-user');

passwdUser.sync('sindresorhus');
/*
{
	username: 'sindresorhus',
	password: '*',
	uid: 501,
	gid: 20,
	fullname: 'Sindre Sorhus',
	homedir: '/home/sindresorhus',
	shell: '/bin/zsh'
}
*/

// or
passwdUser.sync(501);

// or
passwdUser.sync(process.getuid());
```


## API

Accepts a `username` or `uid` number and returns an object with:

- `username`
- `password`
- `uid`: user ID
- `gid`: group ID
- `fullname`: name of user
- `homedir`: home directory
- `shell`: default shell

### passwdUser(username | uid, callback)

### passwdUser.sync(username | uid)


## Related

- [`username`](https://github.com/sindresorhus/username) - get the users username *(cross-platform)*
- [`fullname`](https://github.com/sindresorhus/fullname) - get the users fullname *(cross-platform)*


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
