const assert = require('assert');
const { sortedDescending, withAppended } = require('../src/immutable');

let failed = false;

try {
  const original = [3, 1, 2];
  const sorted = sortedDescending(original);
  assert.deepStrictEqual(sorted, [3, 2, 1], 'sortedDescending should return descending order');
  assert.deepStrictEqual(original, [3, 1, 2], 'sortedDescending must NOT mutate its input array');
  console.log('PASS: sortedDescending is pure');
} catch (e) {
  console.error('FAIL: sortedDescending ->', e.message);
  failed = true;
}

try {
  const base = [1, 2];
  const appended = withAppended(base, 3);
  assert.deepStrictEqual(appended, [1, 2, 3], 'withAppended should return a new array with the value');
  assert.deepStrictEqual(base, [1, 2], 'withAppended must NOT mutate its input array');
  console.log('PASS: withAppended is pure');
} catch (e) {
  console.error('FAIL: withAppended ->', e.message);
  failed = true;
}

if (failed) process.exit(1);
console.log('=== All immutability tests passed ===');
