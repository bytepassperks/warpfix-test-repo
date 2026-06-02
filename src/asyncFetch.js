// Async user-record lookup utilities.
// Simulates reading from an async data source (DB / network).

function getRecordById(db, id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(db[id] || null), 1);
  });
}

// Resolve a user's display name by id.
// BUG: the async lookup is not awaited, so `record` is a pending Promise
// (always truthy) and `record.name` is undefined.
async function getUserName(db, id) {
  const record = getRecordById(db, id);
  return record ? record.name : 'unknown';
}

// Returns true if the user exists in the data source.
async function userExists(db, id) {
  const record = getRecordById(db, id);
  return record !== null;
}

module.exports = { getRecordById, getUserName, userExists };
