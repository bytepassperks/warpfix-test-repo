const assert = require('assert');
const { parseCSV, groupBy, aggregate, sortRecords, runningTotal, pivot } = require('../src/dataProcessor');

// --- Test Data: realistic sales dataset ---
const salesCSV = `department,employee,sales,quarter
Engineering,Alice,15000,Q1
Engineering,Bob,22000,Q1
Marketing,Carol,18000,Q1
Engineering,Alice,17000,Q2
Marketing,Dave,12000,Q2
Marketing,Carol,21000,Q2
Sales,Eve,30000,Q1
Sales,Frank,25000,Q2`;

// ---- Test Suite ----

// 1. parseCSV: correct structure
const records = parseCSV(salesCSV);
assert.strictEqual(records.length, 8, `Expected 8 records, got ${records.length}`);
assert.deepStrictEqual(
  Object.keys(records[0]).sort(),
  ['department', 'employee', 'quarter', 'sales'],
  'Headers should match'
);
console.log('PASS: parseCSV structure');

// 2. Aggregate SUM by department
//    Engineering: 15000 + 22000 + 17000 = 54000
//    Marketing:   18000 + 12000 + 21000 = 51000
//    Sales:       30000 + 25000          = 55000
const byDept = groupBy(records, 'department');
const deptSum = aggregate(byDept, 'sales', 'sum');
assert.strictEqual(deptSum['Engineering'], 54000,
  `Engineering sum: expected 54000, got ${JSON.stringify(deptSum['Engineering'])}`);
assert.strictEqual(deptSum['Marketing'], 51000,
  `Marketing sum: expected 51000, got ${JSON.stringify(deptSum['Marketing'])}`);
assert.strictEqual(deptSum['Sales'], 55000,
  `Sales sum: expected 55000, got ${JSON.stringify(deptSum['Sales'])}`);
console.log('PASS: aggregate SUM');

// 3. Aggregate AVG by department
const deptAvg = aggregate(byDept, 'sales', 'avg');
assert.strictEqual(deptAvg['Engineering'], 18000,
  `Engineering avg: expected 18000, got ${deptAvg['Engineering']}`);
assert.strictEqual(deptAvg['Marketing'], 17000,
  `Marketing avg: expected 17000, got ${deptAvg['Marketing']}`);
console.log('PASS: aggregate AVG');

// 4. Aggregate MIN / MAX
const deptMin = aggregate(byDept, 'sales', 'min');
const deptMax = aggregate(byDept, 'sales', 'max');
assert.strictEqual(deptMin['Engineering'], 15000,
  `Engineering min: expected 15000, got ${deptMin['Engineering']}`);
assert.strictEqual(deptMax['Engineering'], 22000,
  `Engineering max: expected 22000, got ${deptMax['Engineering']}`);
console.log('PASS: aggregate MIN/MAX');

// 5. Sort by sales ascending — smallest first, largest last
const sorted = sortRecords(records, 'sales', 'asc');
const sortedSales = sorted.map(r => r.sales);
assert.strictEqual(sorted[0].sales, 12000,
  `First after asc sort: expected 12000, got ${sorted[0].sales}`);
assert.strictEqual(sorted[sorted.length - 1].sales, 30000,
  `Last after asc sort: expected 30000, got ${sorted[sorted.length - 1].sales}`);
for (let i = 1; i < sortedSales.length; i++) {
  assert.ok(sortedSales[i] >= sortedSales[i - 1],
    `Sort order broken at index ${i}: ${sortedSales[i - 1]} should be <= ${sortedSales[i]}`);
}
console.log('PASS: sortRecords ascending');

// 6. Running total for Engineering sales
const engRecords = byDept['Engineering'];
const withRunning = runningTotal(engRecords, 'sales');
assert.strictEqual(withRunning[0].sales_cumulative, 15000,
  `Running[0]: expected 15000, got ${withRunning[0].sales_cumulative}`);
assert.strictEqual(withRunning[1].sales_cumulative, 37000,
  `Running[1]: expected 37000, got ${withRunning[1].sales_cumulative}`);
assert.strictEqual(withRunning[2].sales_cumulative, 54000,
  `Running[2]: expected 54000, got ${withRunning[2].sales_cumulative}`);
console.log('PASS: runningTotal');

// 7. Pivot table
const pivotResult = pivot(records, 'department', 'sales', 'sum');
const engPivot = pivotResult.find(r => r.department === 'Engineering');
assert.ok(engPivot, 'Pivot should contain Engineering');
assert.strictEqual(engPivot.sum, 54000,
  `Pivot Engineering sum: expected 54000, got ${engPivot.sum}`);
console.log('PASS: pivot table');

// 8. groupBy count
const deptCount = aggregate(byDept, 'sales', 'count');
assert.strictEqual(deptCount['Engineering'], 3, 'Engineering should have 3 records');
assert.strictEqual(deptCount['Marketing'], 3, 'Marketing should have 3 records');
assert.strictEqual(deptCount['Sales'], 2, 'Sales should have 2 records');
console.log('PASS: aggregate COUNT');

console.log('\n=== All 8 data processor tests passed ===');
