/**
 * One-shot dev script: rasterise public/og-image.svg → public/og-image.png
 * Uses @resvg/resvg-js (WASM). Run with: node scripts/svg-to-png.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dirname, '..', 'public', 'og-image.svg');
const pngPath = resolve(__dirname, '..', 'public', 'og-image.png');

let svgStr = readFileSync(svgPath, 'utf-8');

// Comprehensive HTML named-entity → Unicode map (covers all entities
// used across the project's HTML-in-JS templates).
const htmlEntities = {
  '&nbsp;': '\u00A0', '&iexcl;': '\u00A1', '&cent;': '\u00A2',
  '&pound;': '\u00A3', '&curren;': '\u00A4', '&yen;': '\u00A5',
  '&brvbar;': '\u00A6', '&sect;': '\u00A7', '&uml;': '\u00A8',
  '&copy;': '\u00A9', '&ordf;': '\u00AA', '&laquo;': '\u00AB',
  '&not;': '\u00AC', '&shy;': '\u00AD', '&reg;': '\u00AE',
  '&macr;': '\u00AF', '&deg;': '\u00B0', '&plusmn;': '\u00B1',
  '&sup2;': '\u00B2', '&sup3;': '\u00B3', '&acute;': '\u00B4',
  '&micro;': '\u00B5', '&para;': '\u00B6', '&middot;': '\u00B7',
  '&cedil;': '\u00B8', '&sup1;': '\u00B9', '&ordm;': '\u00BA',
  '&raquo;': '\u00BB', '&frac14;': '\u00BC', '&frac12;': '\u00BD',
  '&frac34;': '\u00BE', '&iquest;': '\u00BF',
  '&Agrave;': '\u00C0', '&Aacute;': '\u00C1', '&Acirc;': '\u00C2',
  '&Atilde;': '\u00C3', '&Auml;': '\u00C4', '&Aring;': '\u00C5',
  '&AElig;': '\u00C6', '&Ccedil;': '\u00C7', '&Egrave;': '\u00C8',
  '&Eacute;': '\u00C9', '&Ecirc;': '\u00CA', '&Euml;': '\u00CB',
  '&Igrave;': '\u00CC', '&Iacute;': '\u00CD', '&Icirc;': '\u00CE',
  '&Iuml;': '\u00CF', '&ETH;': '\u00D0', '&Ntilde;': '\u00D1',
  '&Ograve;': '\u00D2', '&Oacute;': '\u00D3', '&Ocirc;': '\u00D4',
  '&Otilde;': '\u00D5', '&Ouml;': '\u00D6', '&times;': '\u00D7',
  '&Oslash;': '\u00D8', '&Ugrave;': '\u00D9', '&Uacute;': '\u00DA',
  '&Ucirc;': '\u00DB', '&Uuml;': '\u00DC', '&Yacute;': '\u00DD',
  '&THORN;': '\u00DE', '&szlig;': '\u00DF',
  '&agrave;': '\u00E0', '&aacute;': '\u00E1', '&acirc;': '\u00E2',
  '&atilde;': '\u00E3', '&auml;': '\u00E4', '&aring;': '\u00E5',
  '&aelig;': '\u00E6', '&ccedil;': '\u00E7', '&egrave;': '\u00E8',
  '&eacute;': '\u00E9', '&ecirc;': '\u00EA', '&euml;': '\u00EB',
  '&igrave;': '\u00EC', '&iacute;': '\u00ED', '&icirc;': '\u00EE',
  '&iuml;': '\u00EF', '&eth;': '\u00F0', '&ntilde;': '\u00F1',
  '&ograve;': '\u00F2', '&oacute;': '\u00F3', '&ocirc;': '\u00F4',
  '&otilde;': '\u00F5', '&ouml;': '\u00F6', '&divide;': '\u00F7',
  '&oslash;': '\u00F8', '&ugrave;': '\u00F9', '&uacute;': '\u00FA',
  '&ucirc;': '\u00FB', '&uuml;': '\u00FC', '&yacute;': '\u00FD',
  '&thorn;': '\u00FE', '&yuml;': '\u00FF',
  '&OElig;': '\u0152', '&oelig;': '\u0153', '&Scaron;': '\u0160',
  '&scaron;': '\u0161', '&Yuml;': '\u0178', '&fnof;': '\u0192',
  '&circ;': '\u02C6', '&tilde;': '\u02DC',
  '&ndash;': '\u2013', '&mdash;': '\u2014', '&lsquo;': '\u2018',
  '&rsquo;': '\u2019', '&sbquo;': '\u201A', '&ldquo;': '\u201C',
  '&rdquo;': '\u201D', '&bdquo;': '\u201E', '&dagger;': '\u2020',
  '&Dagger;': '\u2021', '&bull;': '\u2022', '&hellip;': '\u2026',
  '&permil;': '\u2030', '&prime;': '\u2032', '&Prime;': '\u2033',
  '&lsaquo;': '\u2039', '&rsaquo;': '\u203A', '&oline;': '\u203E',
  '&euro;': '\u20AC', '&trade;': '\u2122', '&larr;': '\u2190',
  '&uarr;': '\u2191', '&rarr;': '\u2192', '&darr;': '\u2193',
  '&harr;': '\u2194', '&lArr;': '\u21D0', '&uArr;': '\u21D1',
  '&rArr;': '\u21D2', '&dArr;': '\u21D3', '&hArr;': '\u21D4',
  '&minus;': '\u2212', '&infin;': '\u221E', '&sum;': '\u2211',
  '&radic;': '\u221A', '&prop;': '\u221D', '&nabla;': '\u2207',
  '&part;': '\u2202', '&int;': '\u222B', '&ne;': '\u2260',
  '&equiv;': '\u2261', '&le;': '\u2264', '&ge;': '\u2265',
};

for (const [entity, char] of Object.entries(htmlEntities)) {
  svgStr = svgStr.replaceAll(entity, char);
}

const resvg = new Resvg(svgStr, {
  fitTo: { mode: 'width', value: 1200 },
});
const pngData = resvg.render();
const pngBuffer = pngData.asPng();
writeFileSync(pngPath, pngBuffer);

// Verify dimensions
const { width, height } = pngData;
console.log(`Written ${pngPath}`);
console.log(`Dimensions: ${width} x ${height}`);
console.log(`File size: ${pngBuffer.byteLength} bytes`);
if (width !== 1200 || height !== 630) {
  console.error(`ERROR: Expected 1200x630, got ${width}x${height}`);
  process.exit(1);
}
