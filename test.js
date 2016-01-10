import test from 'ava';
import m from './';

test('get passwd entry async', async t => {
	const user = await m('root');
	const homedir = process.platform === 'linux' ? '/root' : '/var/root';

	t.is(user.homedir, homedir);
});

test('get passwd entry', t => {
	const homedir = process.platform === 'linux' ? '/root' : '/var/root';

	t.is(m.sync('root').uid, 0);
	t.is(m.sync(0).username, 'root');
	t.is(m.sync('root').homedir, homedir);
});
