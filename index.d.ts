declare namespace passwdUser {
	interface UserData {
		userName: string;
		password: string;

		/**
		User ID.
		*/
		uid: number;

		/**
		Group ID.
		*/
		gid: number;

		/**
		Name of user.
		*/
		fullName: string;

		/**
		Home directory.
		*/
		homeDirectory: string;

		/**
		Default shell.
		*/
		shell: string;
	}
}


declare const passwdUser: {
	/**
	Get the [passwd](https://en.wikipedia.org/wiki/Passwd) user entry from a username or [uid](https://en.wikipedia.org/wiki/User_identifier_(Unix)).

	@param userName - The user name or the [`uid` number](https://en.wikipedia.org/wiki/User_identifier) to look up. Default: [`process.getuid()`](https://nodejs.org/api/process.html#process_process_getuid) (the current user).

	@example
	```
	import passwdUser = require('passwd-user');

	(async () => {
		console.log(await passwdUser('sindresorhus'));
		// {
		// 	userName: 'sindresorhus',
		// 	password: '*',
		// 	uid: 501,
		// 	gid: 20,
		// 	fullName: 'Sindre Sorhus',
		// 	homeDirectory: '/home/sindresorhus',
		// 	shell: '/bin/zsh'
		// }

		await passwdUser(501);
		console.log('Got entry for user 501');

		const user = await passwdUser();
		console.log(`Got entry for user ${user.uid}`);
	})();
	```
	*/
	(userName?: string | number): Promise<passwdUser.UserData | undefined>;

	/**
	Synchronously get the [passwd](https://en.wikipedia.org/wiki/Passwd) user entry from a username or [uid](https://en.wikipedia.org/wiki/User_identifier_(Unix)).

	@param userName - The user name or the [`uid` number](https://en.wikipedia.org/wiki/User_identifier) to look up. Default: [`process.getuid()`](https://nodejs.org/api/process.html#process_process_getuid) (the current user).

	@example
	```
	import passwdUser = require('passwd-user');

	console.log(passwdUser.sync('sindresorhus'));
	// {
	// 	userName: 'sindresorhus',
	// 	password: '*',
	// 	uid: 501,
	// 	gid: 20,
	// 	fullName: 'Sindre Sorhus',
	// 	homeDirectory: '/home/sindresorhus',
	// 	shell: '/bin/zsh'
	// }

	passwdUser.sync(501);
	console.log('Got entry for user 501');

	const user = passwdUser.sync();
	console.log(`Got entry for user ${user.uid}`);
	```
	*/
	sync(userName?: string | number): passwdUser.UserData | undefined;
};

export = passwdUser;
