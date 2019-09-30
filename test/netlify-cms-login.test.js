import test from 'ava';
import render from '../lib/netlify-cms-login';

test('returns an error when the origin is missing', t => {
  t.true(render(undefined, 'ok', '').includes('Origin missing'));
  t.true(render(null, 'ok', '').includes('Origin missing'));
  t.true(render('', 'ok', '').includes('Origin missing'));
});

test('contains the authorization message', t => {
  const origin = 'http://localhost';
  const status = 'success';
  const content = { provider: 'github', token: 'access_token' };

  const expected = 'authorization:github:success:{"provider":"github","token":"access_token"}';

  t.true(render(origin, status, content).includes(expected));
});
