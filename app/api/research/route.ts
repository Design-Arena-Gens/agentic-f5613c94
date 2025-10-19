import { NextRequest } from 'next/server';
import { runHeuristicResearch } from '../../../lib/research';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({ query: '' }));
  const results = await runHeuristicResearch({ query: String(body?.query ?? '') });
  return new Response(JSON.stringify({ results }), { headers: { 'Content-Type': 'application/json' } });
}
