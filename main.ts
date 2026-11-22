// THE WORLD LEDGER — Sunday, November 22, 2026.
// Entry for make.fun news-image-20261122: one image summing up the day's world news.
//
// The front page is composed in this repository as entry.png (1024x1024, JPEG
// bytes under the name entry.png): masthead "THE WORLD LEDGER", dated Sunday,
// November 22, 2026, headlined "CLIMATE TALKS COLLAPSE" over a purpose-built
// illustration of the empty COP31 hall in Antalya, carrying ten stories from
// around the world — the COP31 collapse, Iran's strikes on US bases in
// Bahrain, the capture of cartel boss 'El Chapo Isidro' in Sinaloa, Russian
// strikes on Kyiv and Kryvyi Rih, the markets correction, the EU–Indonesia
// trade deal, the Cikande factory fire, plus BepiColombo at Mercury, South
// Korea's minister resigning, the FBI database hack and the Nigeria boat
// disaster. Every fact was checked against reporting of 21–22 November 2026;
// the illustration carries no text, and all type on the page is drawn crisp
// by the build script so it stays legible at 300 pixels across.
//
// This program copies that image to /output/entry.png. It runs with no network,
// in a fresh container, twice, and both runs must write the same bytes — a plain
// copy is deterministic by construction.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
const MAX_BYTES = 1048576; // 1 MiB, the competition's cap

// A PNG's dimensions sit in its IHDR chunk: after the 8-byte signature come a
// 4-byte length and the 4-byte type "IHDR", then width and height as 4-byte
// big-endian integers each.
function pngDimensions(bytes: Buffer): [number, number] {
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

// A JPEG's dimensions sit in a Start of Frame segment (SOF0–SOF15 except DHT,
// JPG and DAC): its payload holds precision (1 byte), then height and width as
// 2-byte big-endian integers. Walk the segments past the SOI marker to find one.
function jpegDimensions(bytes: Buffer): [number, number] {
  const SOF = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
                       0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  const STANDALONE = new Set([0x01, 0xd0, 0xd1, 0xd2, 0xd3, 0xd4,
                              0xd5, 0xd6, 0xd7, 0xd8, 0xd9]);
  let i = 2; // past the SOI marker
  while (i + 1 < bytes.length) {
    if (bytes[i] !== 0xff) {
      throw new Error('entry.png is a malformed JPEG');
    }
    const marker = bytes[i + 1];
    if (STANDALONE.has(marker)) {
      i += 2;
      continue;
    }
    if (SOF.has(marker)) {
      const height = bytes.readUInt16BE(i + 5);
      const width = bytes.readUInt16BE(i + 7);
      return [width, height];
    }
    const length = bytes.readUInt16BE(i + 2);
    i += 2 + length;
  }
  throw new Error('entry.png is a JPEG with no frame to measure');
}

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing from the repository');
}
const bytes = readFileSync(source);
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}
let width: number, height: number;
if (bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  [width, height] = pngDimensions(bytes);
} else if (bytes.subarray(0, 3).equals(JPEG_MAGIC)) {
  [width, height] = jpegDimensions(bytes);
} else {
  throw new Error('entry.png is neither a PNG nor a JPEG');
}
if (width > 1024 || height > 1024) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 cap`);
}
copyFileSync(source, target);
