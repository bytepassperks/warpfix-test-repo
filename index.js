// Simple calculator module
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  // FIX: corrected to use multiplication instead of addition
  return a * b;
}

module.exports = { add, subtract, multiply };