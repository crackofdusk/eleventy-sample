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
