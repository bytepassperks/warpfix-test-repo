/**
 * Data processing pipeline for sales analytics.
 * Parses CSV input, groups, aggregates, sorts, and computes running totals.
 */

/**
 * Parse a CSV string into an array of record objects.
 * First row is treated as column headers.
 * Handles quoted fields and trims whitespace.
 */
function parseCSV(csvString) {
  const lines = csvString.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const record = {};

    headers.forEach((header, idx) => {
      record[header] = values[idx] !== undefined ? values[idx] : null;
    });

    records.push(record);
  }

  return records;
}

/**
 * Group records by a specified key field.
 * Returns an object mapping each unique key value to its array of records.
 */
function groupBy(records, key) {
  return records.reduce((groups, record) => {
    const groupKey = String(record[key]);
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(record);
    return groups;
  }, {});
}

/**
 * Aggregate a numeric field across grouped records.
 * Supports: sum, avg, min, max, count
 */
function aggregate(groups, field, operation) {
  const result = {};

  for (const [key, records] of Object.entries(groups)) {
    const values = records.map(r => r[field]);

    switch (operation) {
      case 'sum':
        result[key] = values.reduce((acc, val) => acc + val, 0);
        break;
      case 'avg':
        result[key] = values.reduce((acc, val) => acc + val, 0) / values.length;
        break;
      case 'min':
        result[key] = Math.min(...values);
        break;
      case 'max':
        result[key] = Math.max(...values);
        break;
      case 'count':
        result[key] = records.length;
        break;
      default:
        throw new Error(`Unsupported aggregation: ${operation}`);
    }
  }

  return result;
}

/**
 * Sort records by a field in ascending or descending order.
 */
function sortRecords(records, field, order = 'asc') {
  return [...records].sort((a, b) => {
    if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Compute a running cumulative total for a numeric field.
 */
function runningTotal(records, field) {
  let total = 0;
  return records.map(record => {
    total += record[field];
    return { ...record, [`${field}_cumulative`]: total };
  });
}

/**
 * Build a pivot table: group by rowKey, aggregate valueField.
 * Returns a flat array of { [rowKey], [operation]: value }
 */
function pivot(records, rowKey, valueField, operation) {
  const groups = groupBy(records, rowKey);
  const agg = aggregate(groups, valueField, operation);

  return Object.entries(agg).map(([key, value]) => ({
    [rowKey]: key,
    [operation]: value,
  }));
}

module.exports = { parseCSV, groupBy, aggregate, sortRecords, runningTotal, pivot };
