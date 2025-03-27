"use strict";

import MIME from "/src/mime.js";

//tests
(async function() {
    const compareObjects = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
    };

    console.log("Test 1...");
    if (compareObjects(MIME.getMIMETypes("jpg"), ["image/jpeg"]) === false) {
        throw new Error("Unexpected");
    }
    console.log("Test 1... done");


    console.log("Test 2...");
    if (MIME.getMIMETypes("jpg")[0] !== "image/jpeg") {
        throw new Error("Unexpected");
    }
    console.log("Test 2... done");

    console.log("Test 3...");
    if (MIME.getMIMEType("jpg") !== "image/jpeg") {
        throw new Error("Unexpected");
    }
    console.log("Test 3... done");


    console.log("Test 4...");
    if (compareObjects(MIME.getExtTypes("image/jpeg"), ["jpeg", "jpg", "jpe"]) === false) {
        throw new Error("Unexpected");
    }
    console.log("Test 4... done");
})();