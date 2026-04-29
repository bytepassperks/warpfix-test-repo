// Simple test file
const assert = require("assert");

function add(a, b) {
  return a + b;
}

// Tests - BROKEN: expects 4 instead of 3
assert.strictEqual(add(1, 2), 4, "1 + 2 should equal 4");
assert.strictEqual(add(-1, 1), 0, "-1 + 1 should equal 0");
assert.strictEqual(add(0, 0), 0, "0 + 0 should equal 0");

console.log("All tests passed!");