const url = require('url');
const { URLSearchParams } = url;
const { verify } = require('jsonwebtoken');
const requestToken = require('../lib/request-token');
const renderTokenResponse = require('../lib/netlify-cms-login');

module.exports = async (req, res) => {
  const queryParams = new URLSearchParams(url.parse(req.url).query);
  const code = queryParams.get('code');
  const state = queryParams.get('state');
  const origin = process.env.ORIGIN;

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
      renderTokenResponse(
        origin,
        'error',
        { message: 'Code parameter missing' }
      )
    );
    return;
  }

  verify(state, process.env.JWT_SECRET, (error, _) => {
    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        renderTokenResponse(
          origin,
          'error',
          {message: 'Invalid state parameter'}
        )
      );
      return;
    }
  });

  const tokenResponse = await requestToken(code);
  const { access_token, error, error_description } = tokenResponse;

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderTokenResponse(origin, 'error', tokenResponse));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderTokenResponse(origin, 'success', {provider: 'github', token: access_token }));
};
