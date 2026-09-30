import { useState } from 'react'
import {
  Check,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { PLATFORMS, buildPlatformUrl } from '../utils/platformSearch'
import { PlatformIcon } from './PlatformIcons'

export default function JobCard({
  suggestion,
  filters = {},
  onSearchAll,
}) {
  const [expanded, setExpanded] = useState(false)

  const {
    role,
    category,
    seniority,
    matchPercentage = 85,
    matchingSkills = [],
    missingSkills = [],
    recommendedSkills = [],
    estimatedSalary,
    marketDemand,
  } = suggestion

  const getMatchColor = (pct) => {
    if (pct >= 90) return { text: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/60', border: 'border-emerald-200 dark:border-emerald-800/60', ring: '#10b981' }
    if (pct >= 80) return { text: 'text-indigo-700 dark:text-indigo-300', bg: 'bg-indigo-50 dark:bg-indigo-950/60', border: 'border-indigo-200 dark:border-indigo-800/60', ring: '#6366f1' }
    if (pct >= 70) return { text: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/60', border: 'border-amber-200 dark:border-amber-800/60', ring: '#f59e0b' }
    return { text: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-50 dark:bg-slate-800', border: 'border-slate-200 dark:border-slate-700', ring: '#94a3b8' }
  }

  const matchTheme = getMatchColor(matchPercentage)

  const handleLaunchPlatform = (platformId, e) => {
    e.stopPropagation()
    const url = buildPlatformUrl(platformId, {
      role,
      location: filters.location || '',
      workplaceType: filters.workplaceType || 'all',
      jobType: filters.jobType || 'all',
      experienceLevel: filters.experienceLevel || 'all',
      datePosted: filters.datePosted || 'all',
    })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="card-glass p-5 sm:p-6 transition-all hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-black/40 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                {category}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {seniority}
              </span>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {role}
            </h3>
          </div>

          {/* Match Score Badge */}
          <div className="text-right shrink-0">
            <div className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-1 font-display font-extrabold text-sm sm:text-base ${matchTheme.bg} ${matchTheme.text} ${matchTheme.border} shadow-2xs`}>
              <Sparkles size={14} />
              <span>{matchPercentage}% Match</span>
            </div>
          </div>
        </div>

        {/* Salary & Demand Signals */}
        {(estimatedSalary || marketDemand) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            {estimatedSalary && (
              <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                <DollarSign size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span>{estimatedSalary}</span>
              </span>
            )}
            {marketDemand && (
              <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                <TrendingUp size={13} />
                <span>{marketDemand}</span>
              </span>
            )}
          </div>
        )}

        {/* Skills Breakdown */}
        <div className="space-y-3.5 my-4">
          {/* Matching Skills */}
          {matchingSkills.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                <Check size={12} className="text-emerald-600 dark:text-emerald-400" />
                <span>Matching Skills Verified</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1"
                  >
                    <Check size={10} strokeWidth={3} /> {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {missingSkills.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                <AlertTriangle size={12} className="text-amber-600 dark:text-amber-400" />
                <span>Missing Skills in Resume</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-amber-50/70 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Skills to Learn */}
          {recommendedSkills.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                <Lightbulb size={12} className="text-indigo-600 dark:text-indigo-400" />
                <span>Recommended Skills to Learn</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recommendedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1"
                  >
                    <Sparkles size={10} /> {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Platform Search Triggers */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Find Live Openings On:</span>
          <button
            onClick={() => onSearchAll(role)}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition hover:underline flex items-center gap-1"
          >
            <span>Search All Platforms</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* 8 Platform Buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              onClick={(e) => handleLaunchPlatform(platform.id, e)}
              title={`Search ${platform.name} for ${role}`}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 transition-all hover:scale-105 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs group`}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white mb-1 shadow-2xs group-hover:brightness-110"
                style={{ backgroundColor: platform.color }}
              >
                <PlatformIcon platformId={platform.id} size={15} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white truncate max-w-full">
                {platform.shortName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}
