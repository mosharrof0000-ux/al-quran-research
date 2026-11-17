import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const loader = readFileSync(new URL('../ui/home-v1/home-v1.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../ui/home-v1/home-v1.html', import.meta.url), 'utf8');
const coreFixture = readFileSync(new URL('./fixtures/private-research-ui-core.js', import.meta.url), 'utf8');
const patchMatch = loader.match(/function patch\(code\) \{([\s\S]*?)\n  \}/);
assert.ok(patchMatch, 'loader must expose its core patch function');
const patch = new Function('code', patchMatch[1] + '\nreturn code;');

const unlockFixture = [
  "const b=document.createElement('button');b.type='button';b.textContent='খুলুন';",
  "b.onclick=()=>{selectedPrivateSource=s.source_id;privateUnlock.hidden=false;privatePin.focus();privateStatus.textContent='এই Source-এর server-side PIN দিন।'};",
  "toast('Private Source খোলা হয়েছে');",
  "privateStatus.textContent='Access granted — গবেষণা context সক্রিয়।';",
  "privateUnlock.hidden=true;privatePin.value='';"
].join('\n');

const patchedCore = patch(coreFixture);
assert.doesNotThrow(() => new Function(patchedCore), 'patched pinned home core must remain syntactically valid');
const patched = patch(unlockFixture);
assert.match(patched, /b\.textContent=s\.installed\?'খুলুন':'ইনস্টল বাকি'/);
assert.match(patched, /b\.disabled=!s\.installed/);
assert.match(patched, /এই Private Source এখনো ইনস্টল হয়নি/);
assert.doesNotMatch(patched, /Access granted — গবেষণা context সক্রিয়/);
assert.match(patched, /data\.access_token/);
assert.match(patched, /data\.token_type!=='Bearer'/);
assert.match(patched, /Chat retrieval এখনো সংযুক্ত নয়/);
assert.match(html, /maxlength="128" aria-label="Private Research PIN"/);
const css = readFileSync(new URL('../ui/home-v1/home-v1.css', import.meta.url), 'utf8');
assert.ok(css.includes('#privateResearchUnlock[hidden]{display:none}'));

console.log('PASS: uninstalled private sources cannot be unlocked in UI');
console.log('PASS: UI does not claim Chat context activation without a valid bearer session');
console.log('PASS: successful session is not misrepresented as integrated Chat retrieval');
console.log('PASS: PIN input length matches the Worker contract');
