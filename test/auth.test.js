import test from 'ava';
import http from 'http';
import listen from 'test-listen';
import fetch from 'node-fetch';
import { verify } from 'jsonwebtoken';
import { URLSearchParams } from 'url';
import auth from '../api/auth';

test('redirects to Github OAuth workflow start', async t => {
  let server = http.createServer(auth);
  let url = await listen(server);
  let env = process.env;
  process.env.GITHUB_CLIENT_ID = 'dummy-id'
  process.env.JWT_SECRET = 'jwt-secret'

  let response = await fetch(url, { redirect: 'manual' });
  let location = response.headers.get('Location');

  t.is(response.status, 307);
  t.true(location.startsWith('https://github.com/login/oauth/authorize?client_id=dummy-id&scope=repo'))
  verify((new URLSearchParams(location)).get('state'), 'jwt-secret', (error, _) => {
    if (error) {
      t.fail(`Expected a valid JSON web token to be sent as state, got ${error}`);
    }
  });

  process.env = env;
  server.close();
});
