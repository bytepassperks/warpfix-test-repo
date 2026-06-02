const assert = require('assert');
const { firstWord } = require('../src/textutil');

assert.strictEqual(firstWord('hello world'), 'hello', 'firstWord returns the first token');
assert.strictEqual(firstWord('  spaced  out  '), 'spaced', 'firstWord trims and returns first token');
// Edge input: must not crash, should return empty string.
assert.strictEqual(firstWord(null), '', 'firstWord returns empty string on null');
assert.strictEqual(firstWord(undefined), '', 'firstWord returns empty string on undefined');

console.log('textutil tests passed');
