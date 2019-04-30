import test from 'ava';
import passwdUser from '.';

const homeDirectory = process.platform === 'linux' ? '/root' : '/var/root';

test('async', async t => {
	t.is((await passwdUser('root')).homeDirectory, homeDirectory);
});

test('sync', t => {
	t.is(passwdUser.sync('root').uid, 0);
	t.is(passwdUser.sync(0).userName, 'root');
	t.is(passwdUser.sync('root').homeDirectory, homeDirectory);
});
