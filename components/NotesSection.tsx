// components/NotesSection.tsx
import { Info, HelpCircle, Layout } from 'lucide-react';

const CRON_FIELDS = [
  { name: 'Seconds', range: '0-59', note: 'Precise timing' },
  { name: 'Minutes', range: '0-59', note: 'Minute mark' },
  { name: 'Hours', range: '0-23', note: '24h format' },
  { name: 'Day', range: '1-31', note: 'Date of month' },
  { name: 'Month', range: '1-12', note: 'JAN-DEC' },
  { name: 'Weekday', range: '0-6', note: 'SUN-SAT' },
];

const EXAMPLES = [
  { title: "Top of the Hour", cron: "0 0 * * * ?", desc: "Runs exactly at the start of every hour." },
  { title: "Business Hours", cron: "0 0 9-17 * * MON-FRI", desc: "Every hour from 9 AM to 5 PM, weekdays only." },
  { title: "Every 15 Minutes", cron: "0 0/15 * * * ?", desc: "Quarter-hour intervals (0, 15, 30, 45)." }
];

export default function NotesSection() {
  return (
    <section className="mt-20 space-y-16">
      {/* Field Anatomy */}
      <div>
        <h2 className="text-green-500 font-mono text-sm mb-8 tracking-widest flex items-center gap-2">
          <Layout size={16} /> //_THE_ANATOMY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {CRON_FIELDS.map((field, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -top-3 -left-2 text-[40px] font-black text-white/5 select-none group-hover:text-green-500/10 transition-colors">
                {idx + 1}
              </div>
              <div className="relative p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white font-bold text-xs mb-1">{field.name}</p>
                <p className="text-green-500 font-mono text-[10px] mb-2">{field.range}</p>
                <p className="text-slate-500 text-[10px] leading-tight">{field.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Symbols */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-green-500 font-mono text-sm mb-6 tracking-widest flex items-center gap-2">
            <HelpCircle size={16} /> //_OPERATOR_GUIDE
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/50 transition-all">
              <code className="text-green-400 font-mono text-sm bg-black px-2 py-1 rounded">*</code>
              <div>
                <p className="text-white text-xs font-bold mb-1">The Wildcard</p>
                <p className="text-slate-400 text-xs">Means "every" value. An asterisk in the Hour field means "every hour".</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/50 transition-all">
              <code className="text-green-400 font-mono text-sm bg-black px-2 py-1 rounded">?</code>
              <div>
                <p className="text-white text-xs font-bold mb-1">No Specific Value</p>
                <p className="text-slate-400 text-xs">Used when you don't want to specify a value for Day or Weekday. Essential for Spring Boot.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/50 transition-all">
              <code className="text-green-400 font-mono text-sm bg-black px-2 py-1 rounded">/</code>
              <div>
                <p className="text-white text-xs font-bold mb-1">Increments</p>
                <p className="text-slate-400 text-xs">Used for intervals. <code className="text-green-300">0/15</code> means "starting at 0, every 15 units".</p>
              </div>
            </div>
          </div>
        </div>

        {/* Example Presets */}
        <div>
          <h2 className="text-green-500 font-mono text-sm mb-6 tracking-widest flex items-center gap-2">
            <Info size={16} /> //_COMMON_SCRIPTS
          </h2>
          <div className="grid gap-4">
            {EXAMPLES.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/50 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-bold text-xs">{item.title}</h3>
                  <code className="text-green-400 font-mono text-[10px] bg-black px-2 py-0.5 rounded">
                    {item.cron}
                  </code>
                </div>
                <p className="text-slate-500 text-[10px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
