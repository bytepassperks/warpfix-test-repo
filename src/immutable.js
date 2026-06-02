function sortedDescending(arr) {
  return [...arr].sort((a, b) => b - a);
}
function withAppended(arr, value) {
  return [...arr, value];
}
module.exports = { sortedDescending, withAppended };