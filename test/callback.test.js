import test from 'ava';
import http from 'http';
import listen from 'test-listen';
import fetch from 'node-fetch';
import nock from 'nock';
import { sign } from 'jsonwebtoken';
import callback from '../api/callback';

test.beforeEach(async t => {
  t.context.server = http.createServer(callback);
  t.context.url = await listen(t.context.server);
  t.context.env = process.env;
  process.env.ORIGIN = t.context.url;
});

test.afterEach(async t => {
  t.context.server.close();
  process.env = t.context.env;
});

test('returns 200 if the user has access to edit the repository', async t => {
  process.env.JWT_SECRET = 'jwt-secret';
  const state = sign({ nonce: '123' }, process.env.JWT_SECRET, { expiresIn: 30 })

  nock('https://github.com')
    .post('/login/oauth/access_token')
    .reply(200, {
      access_token: 'github-token',
      token_type: 'bearer',
      scope: 'repo,user'
    })
    .persist();

  let response = await fetch(`${t.context.url}?code=temporary-code&state=${state}`);

  t.is(response.status, 200);
  t.true((await response.text()).includes('authorization:github:success'));
});

test('returns 400 if the code is missing', async t => {
  let response = await fetch(t.context.url);

  t.is(response.status, 400);
  t.regex(await response.text(), /Code parameter missing/);
})

test('returns 400 if the state is invalid', async t => {
  let response = await fetch(`${t.context.url}?code=some-code&state=invalid`);

  t.is(response.status, 400);
  t.regex(await response.text(), /Invalid state parameter/);
})
