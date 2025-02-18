import { readFileSync } from 'fs';
import { resolve } from 'path';

// SVG Repo
// Travel Theme Candy Vectors Collection
// Hotel SVG Vector
export function GET(_: Request) {
  const svgFilePath = resolve(__dirname, 'hotel.svg');
  const svgContent = readFileSync(svgFilePath, 'utf-8');

  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}
