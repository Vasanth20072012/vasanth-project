import { useNavigate } from 'react-router-dom'
import { Check, Bookmark, ArrowRight, Sparkles, FileText, HelpCircle } from 'lucide-react'
import ScoreRing from './ScoreRing'
import { scoreLabels, getScoreTier } from '../utils/scoring'
import { useAnalysis } from '../context/AnalysisContext'

export default function CandidateCard({
  candidate,
  rank = 1,
  isSelected = false,
  onToggleSelect,
  onOpenInterviewGuide,
}) {
  const navigate = useNavigate()
  const { bookmarks, toggleBookmark } = useAnalysis()
  const isBookmarked = bookmarks.includes(candidate.id)
  const tier = getScoreTier(candidate.potential_score)

  const handleCardClick = (e) => {
    // Avoid triggering when clicking buttons/checkboxes
    if (e.target.closest('button') || e.target.closest('input')) return
    navigate(`/candidates/${candidate.id}`)
  }

  return (
    <article
      onClick={handleCardClick}
      className={`card-glass-interactive group relative cursor-pointer p-5 sm:p-6 transition-all ${
        isSelected
          ? 'border-indigo-500/80 dark:border-indigo-500/80 ring-2 ring-indigo-500/20 shadow-glow bg-white dark:bg-slate-800/90'
          : ''
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section: Selection, Avatar, Name & Meta */}
        <div className="flex items-start gap-3.5 sm:gap-4 lg:w-[38%]">
          {/* Compare Checkbox */}
          <div className="pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onToggleSelect()
              }}
              title={isSelected ? 'Remove from comparison' : 'Select for side-by-side comparison'}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-transparent hover:border-indigo-400 dark:hover:border-indigo-400'
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </button>
          </div>

          {/* Avatar Initials */}
          <div className="relative shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-100 to-indigo-100/60 dark:from-slate-800 dark:to-indigo-950/60 font-display text-sm font-extrabold text-indigo-700 dark:text-indigo-300 shadow-inner border border-indigo-200/50 dark:border-indigo-800/50">
              {candidate.avatar_seed || candidate.name.slice(0, 2).toUpperCase()}
            </div>
            {rank <= 3 && (
              <span
                className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold text-white shadow-sm ${
                  rank === 1 ? 'bg-amber-500' : rank === 2 ? 'bg-slate-400' : 'bg-amber-700'
                }`}
              >
                #{rank}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Rank #{rank}</span>
              {rank === 1 && (
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <Sparkles size={11} /> Top Potential
                </span>
              )}
              {candidate.archetype && (
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300 truncate max-w-[160px]">
                  {candidate.archetype}
                </span>
              )}
            </div>

            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {candidate.name}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2 font-medium">
              {candidate.role_title || 'Data & Analytics Specialist'}
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
              {candidate.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-indigo-50/60 dark:bg-indigo-950/60 border border-indigo-100/80 dark:border-indigo-800/60 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center Section: Composite Potential Score Ring */}
        <div className="flex items-center gap-4 lg:w-[22%] border-y lg:border-y-0 lg:border-x border-slate-100 dark:border-slate-800 py-3 lg:py-0 lg:px-4">
          <ScoreRing score={candidate.potential_score} size={82} strokeWidth={7} />
          <div className="min-w-0">
            <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tier.badgeClass}`}>
              {tier.tier}
            </span>
            <p className="mt-1 text-[11px] leading-tight text-slate-400 dark:text-slate-500">
              Evaluated across 4 signal dimensions
            </p>
          </div>
        </div>

        {/* Right Section: Dimension Progress Bars */}
        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 lg:max-w-xs">
          {Object.entries(scoreLabels).map(([key, meta]) => {
            const val = candidate.sub_scores[key] || 0
            return (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-600 dark:text-slate-300 truncate">{meta.shortLabel}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{val}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${val}%`,
                      backgroundColor: meta.color,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions Section */}
        <div className="flex items-center justify-end gap-2 shrink-0 pt-2 lg:pt-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleBookmark(candidate.id)
            }}
            title={isBookmarked ? 'Remove from shortlist' : 'Shortlist candidate'}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
              isBookmarked
                ? 'border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {candidate.interview_guide && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onOpenInterviewGuide(candidate)
              }}
              title="View Tailored Interview Questions"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <HelpCircle size={15} />
            </button>
          )}

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </article>
  )
}
