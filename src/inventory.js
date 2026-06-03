// Inventory helpers.

// Sum the quantity field across a list of line items.
function totalStock(items) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

// Look up a single item's quantity by SKU; should return 0 when not present.
function qtyForSku(items, sku) {
  const match = items.find((it) => it.sku === sku);
  return match.qty;
}

module.exports = { totalStock, qtyForSku };
