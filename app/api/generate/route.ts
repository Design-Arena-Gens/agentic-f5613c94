import { NextRequest } from 'next/server';
import { generateProductForNiche } from '../../../lib/generators';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({ niche: '' }));
  const niche = String(body?.niche ?? '').trim() || 'digital planner';
  const result = await generateProductForNiche(niche);
  return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
}
