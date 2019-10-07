import test from 'ava';
import { renderSuccess, renderError } from '../lib/netlify-cms-login';

test('returns an error when the origin is missing', t => {
  t.true(renderSuccess(undefined, '').includes('Origin missing'));
  t.true(renderError(undefined, '').includes('Origin missing'));
  t.true(renderSuccess(null, '').includes('Origin missing'));
  t.true(renderError(null, '').includes('Origin missing'));
  t.true(renderSuccess('', '').includes('Origin missing'));
  t.true(renderError('', '').includes('Origin missing'));
});

test('renderSuccess result contains the authorization message', t => {
  const origin = 'http://localhost';
  const token = 'access_token';

  const expected = 'authorization:github:success:{"token":"access_token"}';

  t.true(renderSuccess(origin, token).includes(expected));
});

test('renderError result contains the error message', t => {
  const origin = 'http://localhost';
  const message = 'failed';

  const expected = 'authorization:github:error:{"message":"failed"}';

  t.true(renderError(origin, message).includes(expected));
});

