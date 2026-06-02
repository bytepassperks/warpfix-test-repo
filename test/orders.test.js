const assert = require('assert');
const { totalItems, maxItemPrice } = require('../src/orders');

// One order legitimately has no items (e.g. a cancelled/empty order).
const orders = [
  { id: 1, items: [{ price: 10 }, { price: 25 }] },
  { id: 2 }, // no `items` field at all
  { id: 3, items: null }, // explicitly null
  { id: 4, items: [{ price: 99 }] },
];

let failed = false;

try {
  const total = totalItems(orders);
  assert.strictEqual(total, 3, `totalItems: expected 3, got ${total}`);
  console.log('PASS: totalItems handles orders without items');
} catch (e) {
  console.error('FAIL: totalItems ->', e.message);
  failed = true;
}

try {
  const max = maxItemPrice(orders);
  assert.strictEqual(max, 99, `maxItemPrice: expected 99, got ${max}`);
  console.log('PASS: maxItemPrice handles orders without items');
} catch (e) {
  console.error('FAIL: maxItemPrice ->', e.message);
  failed = true;
}

if (failed) process.exit(1);
console.log('=== All orders tests passed ===');
