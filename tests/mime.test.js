"use strict";

//
// Import dependencies
//
// internal dependencies
import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import * as fs from "node:fs/promises";
import vm from "node:vm";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

// first-party dependencies
import MIME, { getMIMETypes, getMIMEType, getExtTypes } from "../src/mime.js";

const require = createRequire(import.meta.url);
const distPath = path.join(import.meta.dirname, "..", "dist");

// What the lookups answer, and that every prebuilt file in dist answers the
// same - dist is committed, so a build that is stale or broken would ship.

test("an extension finds its MIME types, with or without the leading dot", function() {
    assert.deepEqual(getMIMETypes("jpg"), ["image/jpeg"]);
    assert.deepEqual(getMIMETypes(".jpg"), ["image/jpeg"]);
    assert.equal(getMIMEType("jpg"), "image/jpeg");
    assert.equal(getMIMEType(".html"), "text/html");
    assert.equal(getMIMEType(".js"), "application/javascript");
});

test("an extension shared by several types lists them all, and the first is the one picked", function() {
    const types = getMIMETypes("mp4");
    assert.ok(types.length > 1);
    assert.equal(getMIMEType("mp4"), types[0]);
});

test("a MIME type finds its extensions", function() {
    assert.deepEqual(getExtTypes("image/jpeg"), ["jpeg", "jpg", "jpe"]);
    assert.ok(getExtTypes("application/octet-stream").includes("onnx"));
});

test("what is not known is answered with nothing, not thrown", function() {
    assert.deepEqual(getMIMETypes("no-such-ext"), []);
    assert.equal(getMIMEType("no-such-ext"), undefined);
    assert.equal(getMIMEType(""), undefined);
    assert.equal(getExtTypes("no/such-type"), undefined);
});

test("the default export carries the same functions as the named ones", function() {
    assert.deepEqual(MIME, { getMIMETypes, getMIMEType, getExtTypes });
});

test("every file in dist exports the library and answers as the source does", async function() {
    // arrays are copied into this realm, since the ones a vm context makes
    // have another Array prototype and so never deep equal
    const check = function(lib, from) {
        assert.equal(lib.getMIMEType("jpg"), "image/jpeg", from);
        assert.deepEqual([...lib.getMIMETypes("mp4")], getMIMETypes("mp4"), from);
        assert.deepEqual([...lib.getExtTypes("image/jpeg")], getExtTypes("image/jpeg"), from);
    };
    for (const file of ["mime.js", "mime.min.js"]) {
        const lib = await import(pathToFileURL(path.join(distPath, file)));
        check(lib, file);
        check(lib.default, file + " default");
    }
    const cjs = require(path.join(distPath, "mime.cjs"));
    check(cjs, "mime.cjs");
    check(cjs.default, "mime.cjs default");

    // the classic script sets the global MIME
    const context = vm.createContext({});
    vm.runInContext(await fs.readFile(path.join(distPath, "mime.iife.min.js"), "utf8"), context);
    check(context.MIME, "mime.iife.min.js");
});
