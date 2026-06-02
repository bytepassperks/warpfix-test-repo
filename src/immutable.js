// Pure list helpers — these must NOT modify their inputs.

// Return a new array sorted in descending order.
// BUG: Array.prototype.sort sorts in place, so the caller's array is
// mutated as a side effect. The function should leave the input untouched.
function sortedDescending(arr) {
  return arr.sort((a, b) => b - a);
}

// Return a new array with `value` appended, leaving the input unchanged.
// BUG: push() mutates the input array instead of producing a new one.
function withAppended(arr, value) {
  arr.push(value);
  return arr;
}

module.exports = { sortedDescending, withAppended };
