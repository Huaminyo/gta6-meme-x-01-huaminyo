// gta6-meme-x-01 entry for @huaminyo — "Leonida High School Final Report Card".
// The program's only job: copy POST.json from the repository root to the output
// directory, where the gate reads the X post's address. The post itself is the
// entry; nothing this program writes is judged.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR || '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

mkdirSync(outDir, { recursive: true });
let post;
try {
  post = readFileSync(join(botDir, 'POST.json'));
  // Sanity check: POST.json must be a JSON object with a url string. The gate
  // validates the address itself; this only fails fast on a corrupt file.
  const parsed = JSON.parse(post.toString('utf8'));
  if (!parsed || typeof parsed.url !== 'string') {
    throw new Error('POST.json has no url string');
  }
} catch (err) {
  console.error(`POST.json could not be read from ${botDir}: ${err.message}`);
  process.exit(1);
}
writeFileSync(join(outDir, 'POST.json'), post);
console.log('POST.json copied to ' + join(outDir, 'POST.json'));
