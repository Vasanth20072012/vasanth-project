import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Sparkles, Scale, Check, Trophy, TrendingUp, Award, Layers } from 'lucide-react'
import Navbar from '../components/Navbar'
import ScoreRing from '../components/ScoreRing'
import RadarChart from '../components/RadarChart'
import { useAnalysis } from '../context/AnalysisContext'
import { rankCandidates, scoreLabels, getComparisonInsight, getScoreTier } from '../utils/scoring'

export default function CompareScreen() {
  const { analysis, weights } = useAnalysis()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const selectedIds = (params.get('selected') || '').split(',').filter(Boolean)

  const candidates = analysis
    ? selectedIds
        .map((id) => rankCandidates(analysis.candidates, weights).find((c) => c.id === id))
        .filter(Boolean)
    : []

  if (candidates.length < 2 || candidates.length > 4) {
    return (
      <div className="app-shell min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-lg text-center py-20 px-4">
          <Scale size={42} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Select 2 to 4 Candidates to Compare
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Please select between 2 and 4 candidates from the dashboard to launch the side-by-side intelligence matrix.
          </p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition"
          >
            <ArrowLeft size={14} /> Go to Dashboard
          </Link>
        </main>
      </div>
    )
  }

  const insight = getComparisonInsight(candidates)

  // Find dimension champions
  const leadersByDimension = Object.keys(scoreLabels).reduce((acc, key) => {
    const leader = candidates.reduce(
      (best, c) => ((c.sub_scores[key] || 0) > (best.sub_scores[key] || 0) ? c : best),
      candidates[0]
    )
    acc[key] = leader
    return acc
  }, {})

  return (
    <div className="app-shell min-h-screen pb-20">
      <Navbar selectedCount={candidates.length} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition mb-2"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Head-to-Head Candidate Matrix
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Comparing {candidates.length} candidate profiles across four intelligence dimensions
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition shadow-sm"
          >
            Adjust Weights / Selection
          </button>
        </div>

        {/* AI Comparative Synthesis Banner - High Contrast & Clearly Visible */}
        <div className="relative overflow-hidden rounded-2xl p-6 sm:p-7 mb-8 border border-indigo-500/30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white shadow-2xl shadow-indigo-950/30">
          {/* Subtle ambient light effects */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-3 rounded-full bg-indigo-500/20 border border-indigo-400/40 px-3 py-1 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="text-indigo-400 animate-pulse-glow" />
              <span>AI Comparative Synthesis</span>
            </div>

            <p className="font-display text-base sm:text-lg font-bold leading-relaxed max-w-4xl text-white tracking-normal drop-shadow-xs">
              {insight}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs text-indigo-200 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Check size={14} strokeWidth={2.5} /> Dynamically calibrated from active role weights
              </span>
              <span className="text-white/30">•</span>
              <span className="text-slate-300">
                Reflects non-linear career velocity and transferable skill adjacency
              </span>
            </div>
          </div>
        </div>

        {/* Superimposed Radar Comparison & Dimension Leaders */}
        <div className="grid gap-6 lg:grid-cols-[380px_1fr] mb-8">
          {/* Radar Chart */}
          <div className="card-glass p-6 flex flex-col items-center justify-center">
            <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-2">
              4-Axis Multi-Candidate Overlay
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 mb-4 text-center">
              Superimposed signal boundaries highlighting relative strengths
            </p>
            <RadarChart candidates={candidates} size={250} />
          </div>

          {/* Dimension Champions Card */}
          <div className="card-glass p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-4">
                <Trophy size={15} className="text-amber-500" />
                <span>Category Champions</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(scoreLabels).map(([key, meta]) => {
                  const champ = leadersByDimension[key]
                  const champScore = champ.sub_scores[key]
                  return (
                    <div
                      key={key}
                      className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/60 p-3.5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-500 dark:text-slate-400">{meta.label}</span>
                        <span
                          className="font-mono font-extrabold text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                        >
                          {champScore}%
                        </span>
                      </div>
                      <div className="font-display text-sm font-bold text-slate-900 dark:text-white truncate">
                        {champ.name}
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-400 line-clamp-1">
                        Leads this dimension among selected candidates
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 p-3 text-xs text-indigo-900/90 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>
                Tip: If your team needs immediate velocity, prioritize the Growth Signals champion. For core execution, look to the Skill Match champion.
              </span>
            </div>
          </div>
        </div>

        {/* Head-to-Head Candidate Columns */}
        <div className={`grid gap-6 ${candidates.length === 2 ? 'md:grid-cols-2' : candidates.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {candidates.map((candidate, idx) => {
            const tier = getScoreTier(candidate.potential_score)
            return (
              <article key={candidate.id} className="card-glass p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Candidate {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tier.badgeClass}`}>
                      {tier.tier.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 font-display text-sm font-extrabold text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                      {candidate.avatar_seed || candidate.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white truncate">
                        {candidate.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {candidate.role_title || 'Specialist'}
                      </p>
                    </div>
                  </div>

                  {/* Score Ring */}
                  <div className="my-5 flex flex-col items-center justify-center border-y border-slate-100 dark:border-slate-800 py-4">
                    <ScoreRing score={candidate.potential_score} size={88} strokeWidth={7} />
                    <span className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Composite Potential
                    </span>
                  </div>

                  {/* 4 Dimension Bars */}
                  <div className="space-y-3.5">
                    {Object.entries(scoreLabels).map(([key, meta]) => {
                      const val = candidate.sub_scores[key] || 0
                      const isLeader = leadersByDimension[key].id === candidate.id
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                              {meta.shortLabel}
                              {isLeader && <Trophy size={11} className="text-amber-500" />}
                            </span>
                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{val}%</span>
                          </div>
                          <div className="progress-track">
                            <div
                              className="progress-fill"
                              style={{ width: `${val}%`, backgroundColor: meta.color }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* View Details Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={`/candidates/${candidate.id}`}
                    className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-900 dark:bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 transition shadow-sm"
                  >
                    <span>Full Breakdown</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </main>
    </div>
  )
}
