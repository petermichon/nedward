import type { VercelRequest, VercelResponse } from 'npm:@vercel/node';

export default function handler(_: VercelRequest, res: VercelResponse) {
  return res.json({
    message: `Goodbye!`,
  });
}
