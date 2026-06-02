const assert = require('assert');
const { paginate, pageCount } = require('../src/pagination');

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let failed = false;

try {
  assert.deepStrictEqual(paginate(items, 1, 3), [1, 2, 3], 'page 1 should be the first 3 items');
  assert.deepStrictEqual(paginate(items, 2, 3), [4, 5, 6], 'page 2 should be items 4-6');
  assert.deepStrictEqual(paginate(items, 4, 3), [10], 'page 4 should be the final partial page');
  console.log('PASS: paginate returns correct 1-indexed pages');
} catch (e) {
  console.error('FAIL: paginate ->', e.message);
  failed = true;
}

try {
  assert.strictEqual(pageCount(10, 3), 4, '10 items / 3 per page = 4 pages');
  assert.strictEqual(pageCount(9, 3), 3, '9 items / 3 per page = 3 pages');
  assert.strictEqual(pageCount(0, 3), 0, '0 items = 0 pages');
  console.log('PASS: pageCount counts partial pages');
} catch (e) {
  console.error('FAIL: pageCount ->', e.message);
  failed = true;
}

if (failed) process.exit(1);
console.log('=== All pagination tests passed ===');
