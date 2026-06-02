// Text utilities.
function firstWord(s) {
  // BUG: crashes on null/undefined instead of handling it gracefully.
  if (s == null || typeof s !== 'string') return '';
  return s.trim().split(' ')[0];
}

module.exports = { firstWord };