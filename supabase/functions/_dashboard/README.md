# Dashboard-ready (bundled) Edge Functions

These are **generated, paste-ready** single-file builds for the Supabase
Dashboard editor, which can't resolve local relative imports.

- `submit-connect-form/index.ts`
- `retry-connect-emails/index.ts`

**Do not edit these by hand.** The canonical source is the normal modular
layout one level up:

```
supabase/functions/
  _shared/{model,emails,security}.ts
  submit-connect-form/{index,cors,validation}.ts
  retry-connect-emails/index.ts
```

Regenerate after any change to those modules:

```bash
node supabase/functions/_dashboard/build.mjs
```

The bundler only drops local relative imports, hoists the single remote
import (`@supabase/supabase-js`), and strips `export ` keywords before
concatenating the module bodies verbatim — no statement is rewritten, so
the bundled behavior is identical to the canonical modules by
construction. That equivalence is checked by the bundle verifier
(compares every bundle output against the canonical modules).

The `_dashboard` folder name starts with `_`, so the Supabase CLI ignores
it — `supabase functions deploy` still deploys the canonical
`submit-connect-form` / `retry-connect-emails` folders, never these
copies.

## Two ways to deploy

- **CLI** (recommended): deploy the canonical folders as documented in
  `../../README.md`. You never touch these bundled files.
- **Dashboard**: create each function, disable "Verify JWT", and paste
  the matching `index.ts` from this folder. Set the secrets listed in
  `../../README.md`.
