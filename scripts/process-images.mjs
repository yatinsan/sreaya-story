/**
 * Turns the generated comic art into web-ready assets.
 *
 *   node scripts/process-images.mjs [sourceDir]
 *
 * - Character art: removes the flat white background (flood fill from the edges),
 *   bakes a white "sticker" border around the figure, trims and exports transparent WebP.
 * - Scene art: resized and exported as WebP.
 * - Photos: resized JPEGs in /public/images/photos.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const DEFAULT_SRC = path.join(os.homedir(), '.cursor', 'projects', 'c-Users-yatin-Documents-sreaya-life', 'assets');
const SRC = process.argv[2] ?? DEFAULT_SRC;
const OUT = path.resolve('public', 'images');

const CUTOUTS = [
  'sreaya-hero-schoolbag',
  'sreaya-school-walk',
  'sreaya-school-shocked',
  'sreaya-exam-panic',
  'sreaya-walk-away',
  'sreaya-college-firstday',
  'sreaya-sleeping-class',
  'sreaya-canteen',
  'sreaya-assignments',
  'sreaya-now',
  'teacher',
  'school-friends',
  'friend-1',
  'friend-2',
  'friend-3',
  'friend-4',
  'college-bus',
];

const SCENES = ['school-building', 'classroom', 'idukki-college'];

const PHOTOS = [
  ['c__Users_yatin_AppData_Roaming_Cursor_User_workspaceStorage_abd24581c8db9f09f9ea1a24d5ea4504_images_IMG_0929-d8a20551-a362-473e-a4c7-a23e54decccb.jpg', 'sreaya-1.jpg'],
  ['c__Users_yatin_AppData_Roaming_Cursor_User_workspaceStorage_abd24581c8db9f09f9ea1a24d5ea4504_images_07cd7381-e41a-404f-9205-e20ab0814506-92d79521-7f03-4286-8926-7e5f4f4fa64e.jpg', 'sreaya-2.jpg'],
];

async function findSource(name) {
  for (const ext of ['.png', '.jpg', '.jpeg', '.webp']) {
    const file = path.join(SRC, name + ext);
    try {
      await fs.access(file);
      return file;
    } catch {}
  }
  return null;
}

const isBackground = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return min > 228 && max - min < 28;
};

/** Flood-fill near-white pixels connected to the image border; returns a foreground mask. */
function foregroundMask(data, w, h) {
  const bg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;

  const push = (i) => {
    if (bg[i]) return;
    const o = i * 4;
    if (!isBackground(data[o], data[o + 1], data[o + 2])) return;
    bg[i] = 1;
    queue[tail++] = i;
  };

  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }

  while (head < tail) {
    const i = queue[head++];
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (y > 0) push(i - w);
    if (y < h - 1) push(i + w);
  }

  const fg = new Uint8Array(w * h);
  for (let i = 0; i < fg.length; i++) fg[i] = bg[i] ? 0 : 1;
  return fg;
}

/** Two-pass chamfer (3-4) distance from every pixel to the nearest foreground pixel. */
function distanceToForeground(fg, w, h) {
  const INF = 1e9;
  const d = new Float32Array(w * h);
  for (let i = 0; i < d.length; i++) d[i] = fg[i] ? 0 : INF;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      let v = d[i];
      if (x > 0) v = Math.min(v, d[i - 1] + 3);
      if (y > 0) {
        v = Math.min(v, d[i - w] + 3);
        if (x > 0) v = Math.min(v, d[i - w - 1] + 4);
        if (x < w - 1) v = Math.min(v, d[i - w + 1] + 4);
      }
      d[i] = v;
    }
  }
  for (let y = h - 1; y >= 0; y--) {
    for (let x = w - 1; x >= 0; x--) {
      const i = y * w + x;
      let v = d[i];
      if (x < w - 1) v = Math.min(v, d[i + 1] + 3);
      if (y < h - 1) {
        v = Math.min(v, d[i + w] + 3);
        if (x < w - 1) v = Math.min(v, d[i + w + 1] + 4);
        if (x > 0) v = Math.min(v, d[i + w - 1] + 4);
      }
      d[i] = v;
    }
  }
  return d;
}

async function processCutout(name) {
  const file = await findSource(name);
  if (!file) return console.warn(`  ! missing ${name}`);

  const pad = 24;
  const { data: src, info } = await sharp(file)
    .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#ffffff' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const rgb = new Uint8Array(w * h * 4);
  for (let i = 0, j = 0; i < w * h; i++, j += 3) {
    rgb[i * 4] = src[j];
    rgb[i * 4 + 1] = src[j + 1];
    rgb[i * 4 + 2] = src[j + 2];
    rgb[i * 4 + 3] = 255;
  }

  const fg = foregroundMask(rgb, w, h);
  const dist = distanceToForeground(fg, w, h);
  const border = 9 * 3;

  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const o = i * 4;
    if (fg[i]) {
      out[o] = rgb[o];
      out[o + 1] = rgb[o + 1];
      out[o + 2] = rgb[o + 2];
      out[o + 3] = 255;
    } else {
      const a = Math.max(0, Math.min(1, (border + 2 - dist[i]) / 3));
      out[o] = 255;
      out[o + 1] = 255;
      out[o + 2] = 255;
      out[o + 3] = Math.round(a * 255);
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 })
    .webp({ quality: 84, alphaQuality: 90, effort: 5 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(`  ✓ cutout ${name}`);
}

async function processScene(name) {
  const file = await findSource(name);
  if (!file) return console.warn(`  ! missing ${name}`);
  await sharp(file)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(`  ✓ scene ${name}`);
}

async function processPhoto([srcName, outName]) {
  const file = path.join(SRC, srcName);
  try {
    await fs.access(file);
  } catch {
    return console.warn(`  ! missing photo ${srcName}`);
  }
  await sharp(file)
    .rotate()
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, 'photos', outName));
  console.log(`  ✓ photo ${outName}`);
}

await fs.mkdir(path.join(OUT, 'photos'), { recursive: true });
console.log(`Source: ${SRC}`);
for (const name of CUTOUTS) await processCutout(name);
for (const name of SCENES) await processScene(name);
for (const p of PHOTOS) await processPhoto(p);
console.log('Done.');
