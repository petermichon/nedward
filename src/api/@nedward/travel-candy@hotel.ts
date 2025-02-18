// export function GET(_: Request) {
//   return new Response(JSON.stringify({ name: 'Hotel' }), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

import { readFileSync } from 'fs';
import { resolve } from 'path';

export function GET(_: Request) {
  const svgFilePath = resolve(__dirname, 'image.svg');
  const svgContent = readFileSync(svgFilePath, 'utf-8');

  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}
