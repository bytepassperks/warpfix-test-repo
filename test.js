// Simple test file
const assert = require("assert");
const { add, subtract, multiply } = require("./src/calculator");

assert.strictEqual(add(2, 3), 5, "2 + 3 should equal 5");
assert.strictEqual(add(-1, 1), 0, "-1 + 1 should equal 0");
assert.strictEqual(subtract(5, 2), 3, "5 - 2 should equal 3");
assert.strictEqual(multiply(3, 4), 12, "3 * 4 should equal 12");

console.log("All tests passed!");
