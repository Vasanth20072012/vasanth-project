import { X, Sparkles, Copy, Check, MessageSquare, Target } from 'lucide-react'
import { useState } from 'react'

export default function InterviewGuideModal({ candidate, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  if (!candidate) return null

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 1800)
  }

  const questions = candidate.interview_guide || [
    {
      category: 'Growth & Adaptability',
      question: `Given your rapid expansion in scope at ${candidate.growth_signals_detail?.timeline?.[0]?.company || 'your previous roles'}, how do you quickly assimilate knowledge when entering an ambiguous domain?`,
      look_for: 'Evidence of systematic framework for learning, humility, and willingness to ask questions.',
    },
    {
      category: 'Adjacent Competency Bridge',
      question: `Your profile highlights strengths in ${candidate.skill_adjacency_detail?.candidate_has?.slice(0, 2).join(' and ')}. How does that perspective change how you approach core engineering bottlenecks?`,
      look_for: 'Demonstrated lateral problem-solving rather than rote technical execution.',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="card-glass relative w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-indigo-100 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 p-5 bg-gradient-to-r from-indigo-50/50 dark:from-indigo-950/50 to-white dark:to-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                AI Interview Guide • {candidate.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tailored interview questions targeting growth potential & skill transferability
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/40 p-3.5 text-xs text-indigo-900/80 dark:text-indigo-200 leading-relaxed flex items-start gap-2.5">
            <Target size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <span>
              These questions are synthesized specifically to probe areas where <strong>{candidate.name}</strong> displays strong adjacency signals or where their resume indicates accelerated career velocity.
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-850 p-4 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-600 transition"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="rounded-md bg-slate-100 dark:bg-slate-700/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleCopy(item.question, idx)}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check size={12} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug mb-3">
                  "{item.question}"
                </p>

                <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 p-2.5 text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">Look for:</span>
                  <span>{item.look_for}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 dark:bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
