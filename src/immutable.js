function sortedDescending(arr) {
  return arr.sort((a, b) => b - a);
}
function withAppended(arr, value) {
  arr.push(value);
  return arr;
}
module.exports = { sortedDescending, withAppended };
