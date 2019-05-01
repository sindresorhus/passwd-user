import {expectType} from 'tsd';
import passwdUser = require('.');

expectType<Promise<passwdUser.UserData | undefined>>(passwdUser());
expectType<Promise<passwdUser.UserData | undefined>>(passwdUser('sindresorhus'));
expectType<Promise<passwdUser.UserData | undefined>>(passwdUser(501));
expectType<passwdUser.UserData | undefined>(passwdUser.sync());
expectType<passwdUser.UserData | undefined>(passwdUser.sync('sindresorhus'));
expectType<passwdUser.UserData | undefined>(passwdUser.sync(501));

const userData = passwdUser.sync();

if (userData) {
	expectType<string>(userData.username);
	expectType<string>(userData.password);
	expectType<number>(userData.userIdentifier);
	expectType<number>(userData.groupIdentifier);
	expectType<string>(userData.fullName);
	expectType<string>(userData.homeDirectory);
	expectType<string>(userData.shell);
}
