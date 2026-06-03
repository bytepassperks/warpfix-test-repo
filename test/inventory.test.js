const assert = require('assert');
const { totalStock, qtyForSku } = require('../src/inventory');

assert.strictEqual(totalStock([{ sku: 'a', qty: 2 }, { sku: 'b', qty: 3 }]), 5, 'totalStock sums quantities');
assert.strictEqual(qtyForSku([{ sku: 'a', qty: 2 }], 'a'), 2, 'qtyForSku returns matching qty');
// Missing SKU must return 0, not crash.
assert.strictEqual(qtyForSku([{ sku: 'a', qty: 2 }], 'zzz'), 0, 'qtyForSku returns 0 for unknown sku');

console.log('inventory tests passed');
