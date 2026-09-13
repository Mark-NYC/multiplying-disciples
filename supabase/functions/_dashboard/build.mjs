// Deterministic single-file bundler for the Connect Edge Functions.
//
// The canonical source is the normal modular layout under
// supabase/functions/ (submit-connect-form/, retry-connect-emails/, and
// _shared/). Supabase's Dashboard editor can't resolve local relative
// imports, so this script inlines those modules into one self-contained
// index.ts per function that you can paste directly into the Dashboard.
//
// It only ever (a) drops local relative imports, (b) hoists the single
// remote import, and (c) removes `export ` keywords before concatenating
// the module bodies verbatim — no statement is rewritten, so the bundled
// behavior is identical to the canonical modules by construction.
//
// Regenerate after editing any module:  node supabase/functions/_dashboard/build.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const FN = resolve(HERE, '..'); // supabase/functions

const read = (rel) => readFileSync(resolve(FN, rel), 'utf8');

const LOCAL_IMPORT = /import\s+[\s\S]*?\s+from\s+['"]\.\.?\/[^'"]+['"];?\r?\n?/g;
const REMOTE_IMPORT = /import\s+[\s\S]*?\s+from\s+['"]https?:[^'"]+['"];?/g;
const REMOTE_IMPORT_LINE = /import\s+[\s\S]*?\s+from\s+['"]https?:[^'"]+['"];?\r?\n?/g;

const remoteImportsOf = (src) => (src.match(REMOTE_IMPORT) || []).map((s) => s.trim());
const stripBody = (src) =>
  src
    .replace(LOCAL_IMPORT, '')
    .replace(REMOTE_IMPORT_LINE, '')
    .replace(/^export\s+/gm, '')
    .trim();

function bundle(name, modulePaths) {
  const originals = modulePaths.map(read);
  const remote = [...new Set(originals.flatMap(remoteImportsOf))];
  const bodies = originals.map(stripBody);

  const header = [
    '// AUTO-GENERATED — DO NOT EDIT.',
    `// Paste-ready, self-contained build of the "${name}" Edge Function`,
    '// for the Supabase Dashboard. All local modules are inlined; the only',
    '// import left is the remote Supabase client (required, not local).',
    '//',
    '// Canonical source: the modular files under supabase/functions/.',
    '// Regenerate with: node supabase/functions/_dashboard/build.mjs',
    '',
  ].join('\n');

  const out = `${header}\n${remote.join('\n')}\n\n${bodies.join('\n\n')}\n`;
  const dest = resolve(HERE, name, 'index.ts');
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, out);
  console.log(`wrote ${dest} (${out.split('\n').length} lines)`);
}

// Order matters only so top-level const declarations (model, cors,
// emails) precede their use; functions are called at request time.
bundle('submit-connect-form', [
  '_shared/model.ts',
  '_shared/security.ts',
  '_shared/turnstile.ts',
  '_shared/spam.ts',
  '_shared/emails.ts',
  'submit-connect-form/cors.ts',
  'submit-connect-form/validation.ts',
  'submit-connect-form/index.ts',
]);

bundle('retry-connect-emails', [
  '_shared/model.ts',
  '_shared/emails.ts',
  'retry-connect-emails/index.ts',
]);
