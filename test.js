import test from 'ava';
import m from './';

const homedir = process.platform === 'linux' ? '/root' : '/var/root';

test('get passwd entry async', async t => {
	t.is((await m('root')).homedir, homedir);
});

test('get passwd entry', t => {
	t.is(m.sync('root').uid, 0);
	t.is(m.sync(0).username, 'root');
	t.is(m.sync('root').homedir, homedir);
});
