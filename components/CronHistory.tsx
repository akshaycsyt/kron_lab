import { Book } from "lucide-react";

export default function CronHistory() {
  return (
    <section className="mt-18">
      <h2 className="text-white font-bold flex items-center gap-2 mb-6 uppercase tracking-widest text-sm">
        <Book size={18} className="text-green-500" /> <span className="text-green-500">//_HISTORY</span>
      </h2>
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/50 transition-all">
        <p className="mb-2 text-slate-400"><span className="text-green-500">Cron</span> is derived from word <span className="text-green-500">'Chronos'</span> which is Greek word for time.</p>
        <p className="text-slate-400 mb-2">
          It is a time-based job scheduler in Unix-like computer operating systems. It is used to schedule jobs to run at specified times or intervals.
        </p>

        <p>
          Also used in backend applications like <span className="text-green-500">Spring Boot</span> to schedule jobs to run at specified times or intervals.
        </p>
      </div>
    </section>
  );
}