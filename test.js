import process from 'node:process';
import test from 'ava';
import {passwdUser, passwdUserSync} from './index.js';

const homeDirectory = process.platform === 'linux' ? '/root' : '/var/root';

test('async', async t => {
	t.is((await passwdUser('root')).homeDirectory, homeDirectory);
});

test('sync', t => {
	t.is(passwdUserSync('root').userIdentifier, 0);
	t.is(passwdUserSync(0).username, 'root');
	t.is(passwdUserSync('root').homeDirectory, homeDirectory);
});
