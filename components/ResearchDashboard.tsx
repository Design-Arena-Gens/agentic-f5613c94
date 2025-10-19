"use client";

import { useState } from 'react';

type ResearchResult = {
  niche: string;
  searchVolume: number;
  competitionScore: number; // lower is better
  platforms: string[];
  buyerIntentNotes: string;
};

export default function ResearchDashboard() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResearchResult[]>([]);
  const [selected, setSelected] = useState<ResearchResult | null>(null);
  const [genLoading, setGenLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  async function runResearch() {
    setLoading(true);
    setGeneratedUrl(null);
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data.results as ResearchResult[]);
      setSelected(null);
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    if (!selected) return;
    setGenLoading(true);
    setGeneratedUrl(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: selected.niche }),
      });
      const data = await res.json();
      setGeneratedUrl(data.url ?? null);
    } finally {
      setGenLoading(false);
    }
  }

  return (
    <div>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium">Seed query or audience</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., productivity for students, habit tracking, digital planners"
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>
        <button onClick={runResearch} disabled={loading} className="h-10 px-4 rounded bg-black text-white disabled:opacity-60">
          {loading ? 'Researching…' : 'Research'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((r) => (
            <button
              key={r.niche}
              onClick={() => setSelected(r)}
              className={`text-left rounded border p-4 hover:bg-slate-50 ${selected?.niche === r.niche ? 'border-black' : 'border-slate-200'}`}
            >
              <div className="font-semibold">{r.niche}</div>
              <div className="text-xs text-slate-600 mt-1">Platforms: {r.platforms.join(', ')}</div>
              <div className="mt-2 text-sm">Search volume: {r.searchVolume.toLocaleString()}</div>
              <div className="text-sm">Competition: {r.competitionScore.toFixed(2)}</div>
              <div className="text-xs text-slate-600 mt-2">Buyer intent: {r.buyerIntentNotes}</div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="mt-6">
          <div className="text-sm">Selected: <span className="font-medium">{selected.niche}</span></div>
          <button onClick={generate} disabled={genLoading} className="mt-3 h-10 px-4 rounded bg-emerald-600 text-white disabled:opacity-60">
            {genLoading ? 'Generating…' : 'Generate Product'}
          </button>
        </div>
      )}

      {generatedUrl && (
        <div className="mt-6">
          <a href={generatedUrl} target="_blank" className="text-emerald-700 underline">Download generated product</a>
        </div>
      )}
    </div>
  );
}
