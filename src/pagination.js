// Pagination helpers. Pages are 1-indexed (page 1 is the first page).

// Return the slice of items belonging to the given page.
// FIX: Adjusted the start index calculation to account for 1-indexed pages.
function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize; // Changed from page * pageSize to (page - 1) * pageSize
  const end = start + pageSize;
  return items.slice(start, end);
}

// Number of pages needed to display all items.
// BUG: uses Math.floor, which drops the final partial page
// (e.g. 10 items / 3 per page should be 4 pages, not 3).
function pageCount(totalItems, pageSize) {
  return Math.floor((totalItems + pageSize - 1) / pageSize); // Adjusted to correctly count pages
}

module.exports = { paginate, pageCount };