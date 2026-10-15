import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

test('production entry resolves scripts and styles under the Pages repository path', () => {
  const html = readFileSync('dist/index.html','utf8');
  const base = process.env.VITE_BASE_PATH || '/tepeeya.github.io/';
  const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]);
  assert.ok(urls.length >= 3);
  for (const url of urls) { assert.ok(url.startsWith(base), url); assert.ok(existsSync(path.join('dist',url.slice(base.length))),url); }
});

test('six optimized films have fast-start metadata and remain within the media budget',()=>{
  let total=0;
  for(const name of ['hero','origins','sensory']) for(const size of ['', '-mobile']) {
    const file=readFileSync(`dist/media/${name}${size}.mp4`);
    total+=file.length;
    const atoms=[];let pos=0;
    while(pos+8<=file.length){ const length=file.readUInt32BE(pos); if(length<8) break; atoms.push(file.toString('ascii',pos+4,pos+8)); pos+=length; }
    assert.ok(atoms.indexOf('moov')>=0 && atoms.indexOf('moov')<atoms.indexOf('mdat'),`${name}${size} must be fast-start`);
    assert.ok(file.length<(size?1000000:3500000),`${name}${size} exceeds its budget`);
  }
  assert.ok(total<10000000);
});

test('every supplied product derivative and video poster is included',()=>{
  for(const file of ['bottle','lineup','classic','mango','spicy','og','honey','logo','wordmark','brand-logo','classic-label','hero-poster','origins-poster','sensory-poster','mixology-poster','mix-pour','mix-golden','mix-serve']){
    const bytes=readFileSync(`dist/media/${file}.webp`);
    assert.equal(bytes.toString('ascii',8,12),'WEBP');
  }
});

test('new mixer film has desktop/mobile fast-start files within budget',()=>{
  for(const size of ['', '-mobile']) {
    const file=readFileSync(`dist/media/mixology${size}.mp4`);
    assert.ok(file.indexOf('moov')>0 && file.indexOf('moov')<file.indexOf('mdat'));
    assert.ok(file.length<(size?1000000:3500000));
  }
});
