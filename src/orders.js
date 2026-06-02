// Order processing utilities.

// Count the total number of line items across all orders.
// BUG: assumes every order has an `items` array; throws a TypeError
// ("Cannot read properties of undefined") on orders where `items`
// is missing or null (a common real-world data shape for empty orders).
function totalItems(orders) {
  let total = 0;
  for (const order of orders) {
    total += order.items.length;
  }
  return total;
}

// Find the highest item price across all orders.
function maxItemPrice(orders) {
  let max = 0;
  for (const order of orders) {
    for (const item of order.items) {
      if (item.price > max) max = item.price;
    }
  }
  return max;
}

module.exports = { totalItems, maxItemPrice };
