# Eleventy test

See <https://www.11ty.io>.

## Build the site

First install the dependencies:

```
npm ci
```

Build the website:

```
make
```

You can also serve the generated site:

```
make serve
```

## Content management

You can edit content with commits to this repository or using admin section of the website. Visit `/admin`.

The admin interface is powered by [Netlify CMS](https://www.netlifycms.org).

### ZEIT Now functions

Netlify CMS supports [authentication with Github](https://www.netlifycms.org/docs/authentication-backends/#github-backend). It uses Netlify Identity by default, which expects the repository to be connected to Netlify. Since we are not using Netlify, we need to provide our own authentication backend.

As we are deploying to ZEIT Now, we can use its ["serverless functions"](https://zeit.co/docs/v2/serverless-functions/introduction/) for this purpose. The implementation is inspired by the [existing OAuth clients for NetlifyCMS](https://www.netlifycms.org/docs/authentication-backends/#external-oauth-clients).

The functions are in the `api/` directory and rely on the following environment variables:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `JWT_SECRET`
- `ORIGIN`

The Github credentials are from the [Github OAuth app](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/).

 `JWT_SECRET` is for signing and verifying JSON web tokens used for cross-site request forgery protection in the OAuth flow. You can generate it with for example with `openssl rand -base64 32`.

The origin corresponds to the deployment URL (protocol and domain). Here it's `https://eleventy-sample.now.sh` in production and `http://localhost:3000` in development.

The secrets can be stored in `.env` (don't commit it!) for local development with `now dev`. The production secrets are stored as [Now secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets/).


### Updating the content management system

Netlify CMS is loaded from a content delivery network. The exact version is pinned so that we can ensure the [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).

You can find the latest version number on npm: <https://www.npmjs.com/package/netlify-cms>

You can then query unpkg for the integrity hash. For example, the meta information about netlify-cms 2.9.7 is at <https://unpkg.com/netlify-cms@2.9.7/dist/netlify-cms.js?meta>

Finally you can update the version and integrity hash in `admin/index.html`:

```html
<script src="https://unpkg.com/netlify-cms@2.9.7/dist/netlify-cms.js"
        integrity="sha384-ciIttNkvTVyQE9LClSC4aybQJnRaqG2ez53AJJr+VsF3ZnTDvD42pNqjYhAnBhiQ"
        crossorigin="anonymous"></script>
```

See also the [unpkg documentation](https://unpkg.com/).
