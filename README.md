# easy-csv

Small JavaScript library to help the conversion between CSV string and 2D array.

## Install

Copy and import the following file:

[./src/mime.js](./src/mime.js)

## Usage

### Get MIME types
```js
import MIME from "/src/mime.js";

MIME.getMIMETypes("jpg");   // ["image/jpeg"]
MIME.getMIMEType("jpg");    // "image/jpeg"
```


### Get extension
```js
import MIME from "/src/mime.js";

MIME.getExtTypes("image/jpeg"); // ["jpeg", "jpg", "jpe"]
```