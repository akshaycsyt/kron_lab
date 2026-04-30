import { Terminal, Zap, Code2, Sparkles } from 'lucide-react';

const LOGIC_MAPPING = [
  { freq: 'Every Second', logic: 'N/A', cron: '* * * * * *' },
  { freq: 'Every Minute', logic: '0 Seconds', cron: '0 * * * * ?' },
  { freq: 'Every 15 Mins', logic: 'n = 15', cron: '0 */15 * * * ?' },
  { freq: 'Every Hour', logic: '0 Mins, 0 Secs', cron: '0 0 * * * ?' },
  { freq: 'Every 4 Hours', logic: 'n = 4', cron: '0 0 */4 * * ?' },
  { freq: 'Every Day', logic: '14:30:00', cron: '0 30 14 * * ?' },
  { freq: 'Every Week', logic: 'Mon @ Midnight', cron: '0 0 0 ? * MON' },
  { freq: 'Every Month', logic: '1st @ Midnight', cron: '0 0 0 1 * ?' },
  { freq: 'Every Year', logic: 'Jan 1st', cron: '0 0 0 1 1 ?' },
];

const ADVANCED_FEATURES = [
  { title: 'Workdays Only', cron: '0 0 9 * * MON-FRI', desc: 'Runs at 9:00 AM, Monday through Friday.' },
  { title: 'Specific Hours', cron: '0 0 8,12,16 * * ?', desc: 'Runs at exactly 8AM, 12PM, and 4PM.' },
  { title: 'Last Day of Month', cron: '0 0 0 L * ?', desc: 'Perfect for end-of-month reporting.' },
  { title: 'Nearest Weekday', cron: '0 0 0 15W * ?', desc: 'If 15th is Sunday, runs on Monday 16th.' },
  { title: 'Last Friday', cron: '0 0 0 ? * 5L', desc: 'Commonly used for payroll processing.' },
  { title: 'Time Ranges', cron: '0 0 9-17 * * ?', desc: 'Every hour but only during working hours.' },
];

export default function AdvancedScriptsList() {
  return (
    <section className="mt-20 space-y-16">
      {/* Core Logic Table */}
      <div>
        <h2 className="text-white flex items-center gap-2 mb-6 uppercase tracking-widest text-sm">
          <Code2 size={18} className="text-green-500" /> <span className="text-green-500">//_LOGIC_SCHEMA</span>
        </h2>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-white/5 text-slate-500 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-medium border-b border-white/10">Frequency</th>
                <th className="p-4 font-medium border-b border-white/10">Logic Parameter</th>
                <th className="p-4 font-medium border-b border-white/10 text-green-500/70">Spring Cron</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {LOGIC_MAPPING.map((item, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-slate-300 font-medium">{item.freq}</td>
                  <td className="p-4 text-slate-500 font-mono text-[10px]">{item.logic}</td>
                  <td className="p-4">
                    <code className="bg-black/50 px-2 py-1 rounded text-green-400 font-mono text-[11px] border border-green-500/10 group-hover:border-green-500/30 transition-all">
                      {item.cron}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advanced Features Grid */}
      <div>
        <h2 className="flex items-center gap-2 mb-6 uppercase tracking-widest text-sm">
          <Sparkles size={18} className="text-green-500" /> <span className="text-green-500">//_SPECIAL_OPERATIONS</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADVANCED_FEATURES.map((feature, i) => (
            <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-bold text-xs uppercase tracking-tight">{feature.title}</h3>
                <Zap size={14} className="text-green-500/50 group-hover:text-green-500 transition-colors" />
              </div>
              <code className="block bg-black/40 p-2 rounded text-green-400 font-mono text-[10px] mb-3 border border-white/5">
                {feature.cron}
              </code>
              <p className="text-slate-500 text-[10px] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
