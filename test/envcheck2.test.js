// Second infra test: required secret missing in CI (not a code bug).
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}
console.log('env ok');
