// Simulates a real infra/config CI failure: a required secret is not set in
// the CI environment. This is NOT a code bug — WarpFix must NOT open a source
// repair PR for it (it should post a diagnostic comment instead).
if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL is not set');
}
console.log('env ok');
