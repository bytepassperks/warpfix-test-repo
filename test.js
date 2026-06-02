// Simple test file
const assert = require("assert");
const { add, subtract, multiply } = require("./index");

assert.strictEqual(add(1, 2), 3, "1 + 2 should equal 3");
assert.strictEqual(subtract(5, 3), 2, "5 - 3 should equal 2");
assert.strictEqual(multiply(2, 3), 6, "2 * 3 should equal 6");

console.log("All tests passed!");

// e2e re-run after logs fix d71e99b
