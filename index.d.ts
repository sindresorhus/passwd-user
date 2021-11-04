export interface UserData {
	readonly username: string;
	readonly password: string;

	/**
	Also known as [UID](https://en.wikipedia.org/wiki/User_identifier).
	*/
	readonly userIdentifier: number;

	/**
	Also known as [GID](https://en.wikipedia.org/wiki/Group_identifier).
	*/
	readonly groupIdentifier: number;

	/**
	Name of user.
	*/
	readonly fullName: string;

	/**
	Home directory.
	*/
	readonly homeDirectory: string;

	/**
	Default shell.
	*/
	readonly shell: string;
}

/**
Get the [passwd](https://en.wikipedia.org/wiki/Passwd) user entry from a username or [user identifier (UID)](https://en.wikipedia.org/wiki/User_identifier_(Unix)).

@param username - The username or the [user identifier (UID)](https://en.wikipedia.org/wiki/User_identifier) to look up. Default: [`process.getuid()`](https://nodejs.org/api/process.html#process_process_getuid) (The current user).

@example
```
import {passwdUser} from 'passwd-user';

console.log(await passwdUser('sindresorhus'));
// {
// 	username: 'sindresorhus',
// 	password: '*',
// 	userIdentifier: 501,
// 	groupIdentifier: 20,
// 	fullName: 'Sindre Sorhus',
// 	homeDirectory: '/home/sindresorhus',
// 	shell: '/bin/zsh'
// }

await passwdUser(501);
console.log('Got entry for user 501');

const user = await passwdUser();
console.log(`Got entry for user ${user.userIdentifier}`);
```
*/
export function passwdUser(username?: string | number): Promise<UserData | undefined>;

/**
Synchronously get the [passwd](https://en.wikipedia.org/wiki/Passwd) user entry from a username or [user identifier (UID)](https://en.wikipedia.org/wiki/User_identifier_(Unix)).

@param username - The user name or the [user identifier (UID)](https://en.wikipedia.org/wiki/User_identifier) to look up. Default: [`process.getuid()`](https://nodejs.org/api/process.html#process_process_getuid) (The current user).

@example
```
import {passwdUserSync} from 'passwd-user';

console.log(passwdUserSync('sindresorhus'));
// {
// 	username: 'sindresorhus',
// 	password: '*',
// 	userIdentifier: 501,
// 	groupIdentifier: 20,
// 	fullName: 'Sindre Sorhus',
// 	homeDirectory: '/home/sindresorhus',
// 	shell: '/bin/zsh'
// }

passwdUserSync(501);
console.log('Got entry for user 501');

const user = passwdUserSync();
console.log(`Got entry for user ${user.userIdentifier}`);
```
*/
export function passwdUserSync(username?: string | number): UserData | undefined;
