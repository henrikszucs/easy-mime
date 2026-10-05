# easy-mime

Small JavaScript library to help search the MIME types and its extensions.

## Install

```
npm install easy-mime
```

```js
import MIME from "easy-mime";                                 // ES module
import { getMIMEType } from "easy-mime";                      // or by name
const { getMIMEType } = require("easy-mime");                 // CommonJS
```

Or copy one of the prebuilt files from [./dist](./dist):

| File | Format |
| --- | --- |
| `mime.js` | ES module |
| `mime.min.js` | ES module, minified |
| `mime.cjs` | CommonJS |
| `mime.iife.min.js` | classic `<script>`, sets the global `MIME` |

The unbuilt source is [./src/mime.js](./src/mime.js) (also importable as `easy-mime/src`).

## Usage

### Get MIME types
```js
import MIME from "easy-mime";

MIME.getMIMETypes("jpg");   // ["image/jpeg"]
MIME.getMIMEType("jpg");    // "image/jpeg"
```


### Get extension
```js
import MIME from "easy-mime";

MIME.getExtTypes("image/jpeg"); // ["jpeg", "jpg", "jpe"]
```

## Build

```
npm install
npm run build
```

The build writes every file above into `dist` with [esbuild](https://esbuild.github.io); the `.min.js` files come with source maps that point back to `src`.

## License

[LGPL-3.0-only](./LICENSE) — see also the referenced [GPL-3.0](./LICENSE.GPL-3.0).
