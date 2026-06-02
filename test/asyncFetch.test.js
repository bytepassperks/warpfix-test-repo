const assert = require('assert');
const { getUserName, userExists } = require('../src/asyncFetch');

(async () => {
  const db = { '1': { name: 'Alice' }, '2': { name: 'Bob' } };

  const name = await getUserName(db, '1');
  assert.strictEqual(name, 'Alice', `getUserName: expected 'Alice', got ${JSON.stringify(name)}`);
  console.log('PASS: getUserName resolves the record name');

  const missing = await getUserName(db, '99');
  assert.strictEqual(missing, 'unknown', `getUserName(missing): expected 'unknown', got ${JSON.stringify(missing)}`);
  console.log('PASS: getUserName handles missing id');

  const exists = await userExists(db, '2');
  assert.strictEqual(exists, true, `userExists('2'): expected true, got ${exists}`);
  const notExists = await userExists(db, '99');
  assert.strictEqual(notExists, false, `userExists('99'): expected false, got ${notExists}`);
  console.log('PASS: userExists reflects presence');

  console.log('=== All async tests passed ===');
})().catch((e) => {
  console.error('FAIL:', e.message);
  process.exit(1);
});
