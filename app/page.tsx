import ResearchDashboard from '../components/ResearchDashboard';

export default function Page() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Agentic Product Builder</h1>
      <p className="text-sm text-slate-600 mt-1">Research niches and generate digital products (PDFs) end-to-end.</p>
      <div className="mt-6">
        <ResearchDashboard />
      </div>
    </main>
  );
}
