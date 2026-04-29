// Simple test file
const assert = require("assert");

function add(a, b) {
  return a + b;
}

// Tests
assert.strictEqual(add(1, 2), 3, "1 + 2 should equal 3");
assert.strictEqual(add(-1, 1), 0, "-1 + 1 should equal 0");
assert.strictEqual(add(0, 0), 0, "0 + 0 should equal 0");

console.log("All tests passed!");
