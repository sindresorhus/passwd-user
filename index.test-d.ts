import {expectType} from 'tsd';
import {passwdUser, passwdUserSync, UserData} from './index.js';

expectType<Promise<UserData | undefined>>(passwdUser());
expectType<Promise<UserData | undefined>>(passwdUser('sindresorhus'));
expectType<Promise<UserData | undefined>>(passwdUser(501));
expectType<UserData | undefined>(passwdUserSync());
expectType<UserData | undefined>(passwdUserSync('sindresorhus'));
expectType<UserData | undefined>(passwdUserSync(501));

const userData = passwdUserSync();

if (userData) {
	expectType<string>(userData.username);
	expectType<string>(userData.password);
	expectType<number>(userData.userIdentifier);
	expectType<number>(userData.groupIdentifier);
	expectType<string>(userData.fullName);
	expectType<string>(userData.homeDirectory);
	expectType<string>(userData.shell);
}
