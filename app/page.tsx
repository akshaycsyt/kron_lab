"use client";

import { useState, useEffect } from 'react';
import cronstrue from 'cronstrue';
import { CronExpressionParser } from 'cron-parser';
import { Copy, Terminal, Info, Calendar } from 'lucide-react';
import NotesSection from '@/components/NotesSection';
import AdvancedScriptsList from '@/components/AdvancedScriptsList';
import AppHeader from '@/components/AppHeader';
import CronHistory from '@/components/CronHistory';

export default function CronLab() {
  const [fields, setFields] = useState(['0', '0', '0', '*', '*', '?']);
  const [humanReadable, setHumanReadable] = useState('');
  const [nextRuns, setNextRuns] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const fieldLabels = [
    { label: 'Seconds', range: '0-59' },
    { label: 'Minutes', range: '0-59' },
    { label: 'Hours', range: '0-23' },
    { label: 'Day (Month)', range: '1-31' },
    { label: 'Month', range: '1-12' },
    { label: 'Day (Week)', range: '0-6' },
  ];

  useEffect(() => {
    const cronString = fields.join(' ');

    // Update Human Readable
    try {
      setHumanReadable(cronstrue.toString(cronString));
    } catch (e) {
      setHumanReadable('Invalid cron sequence...');
    }

    // Update Next 5 Runs
    try {
      const interval = CronExpressionParser.parse(cronString, {
        currentDate: new Date(),
      });
      const runs = [];
      for (let i = 0; i < 5; i++) {
        runs.push(interval.next().toString());
      }
      setNextRuns(runs);
    } catch (e) {
      setNextRuns([]);
    }
  }, [fields]);

  const updateField = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const copyToClipboard = () => {
    const code = `@Scheduled(cron = "${fields.join(' ')}")`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-green-500/30">
      {/* Futuristic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#166534_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-900/20 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <AppHeader />

        {/* Hero: The Generator */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
            {fieldLabels.map((f, i) => (
              <div key={f.label} className="group">
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2 ml-1 tracking-widest">
                  {f.label}
                </label>
                <input
                  // suppressHydrationWarning
                  type="text"
                  value={fields[i]}
                  onChange={(e) => updateField(i, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-2xl font-mono text-white text-center focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all outline-none"
                />
                <span className="block text-[10px] font-mono text-slate-600 mt-2 text-center">{f.range}</span>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-xs font-mono text-slate-500 uppercase mb-4 ml-1 tracking-[0.2em] flex items-center gap-2">
              <Calendar size={14} className="text-green-500" /> Next 5 Iterations
            </h2>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {nextRuns.length > 0 ? (
                  nextRuns.map((run, i) => (
                    <div key={i} className="flex flex-col gap-1 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors group">
                      <span className="text-[10px] font-mono text-green-500/50 uppercase tracking-widest">Run #{i + 1}</span>
                      <span className="text-sm font-mono text-white group-hover:text-green-400 transition-colors">
                        {new Date(run).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(run).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-5 py-4 text-center text-slate-500 italic font-mono text-sm">
                    Waiting for a valid cron expression...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Output HUD */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <p className="text-xs font-mono text-green-500/70 flex items-center gap-2 uppercase tracking-tighter">
                  <Terminal size={14} /> Spring Boot Annotation
                </p>
                <code className="text-xl md:text-2xl font-mono text-white block">
                  @Scheduled(cron = <span className="text-green-400">"{fields.join(' ')}"</span>)
                </code>
                <p className="text-slate-400 italic text-sm">" {humanReadable} "</p>
              </div>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded-lg transition-all active:scale-95 whitespace-nowrap"
              >
                <Copy size={18} />
                {copied ? 'COPIED!' : 'COPY CODE'}
              </button>
            </div>
          </div>
        </section>

        <NotesSection />

        <AdvancedScriptsList />

        <CronHistory />

        <footer className="mt-20 text-center border-t border-white/10 pt-10">
          <p className="text-[10px] font-mono text-slate-600 flex justify-center items-center gap-2">
            <Info size={12} /> REMEMBER: SPRING BOOT CRON HAS 6 FIELDS. TRADITIONAL LINUX CRON HAS 5.
          </p>
          <p className="text-xs font-mono text-slate-500 flex justify-center items-center gap-2 py-2">
            <span className="text-green-500">// Built by Akshay</span>
          </p>
        </footer>
      </main>
    </div>
  );
}