import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Bookmark,
  Users,
  TrendingUp,
  Scale,
  Award,
  Layers,
  ArrowRight,
  HelpCircle,
  Briefcase,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import CandidateCard from '../components/CandidateCard'
import WeightSliders from '../components/WeightSliders'
import InterviewGuideModal from '../components/InterviewGuideModal'
import { useAnalysis } from '../context/AnalysisContext'
import { rankCandidates, scoreLabels } from '../utils/scoring'

export default function DashboardScreen() {
  const { analysis, weights, bookmarks, clearAnalysis } = useAnalysis()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const sort = params.get('sort') || 'potential_score'
  const selected = (params.get('selected') || '').split(',').filter(Boolean)
  
  const [search, setSearch] = useState('')
  const [onlyShortlisted, setOnlyShortlisted] = useState(false)
  const [activeInterviewCandidate, setActiveInterviewCandidate] = useState(null)

  // Rank candidates dynamically based on live weights
  const rankedAll = useMemo(() => {
    return rankCandidates(analysis?.candidates || [], weights, sort)
  }, [analysis, weights, sort])

  // Filtered candidate list
  const filteredCandidates = useMemo(() => {
    return rankedAll.filter((candidate) => {
      if (onlyShortlisted && !bookmarks.includes(candidate.id)) {
        return false
      }
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchName = candidate.name.toLowerCase().includes(query)
        const matchRole = candidate.role_title?.toLowerCase().includes(query)
        const matchSkills = candidate.skill_match_detail?.matched_skills?.some((s) =>
          s.toLowerCase().includes(query)
        )
        const matchTags = candidate.tags?.some((t) => t.toLowerCase().includes(query))
        return matchName || matchRole || matchSkills || matchTags
      }
      return true
    })
  }, [rankedAll, search, onlyShortlisted, bookmarks])

  const setSort = (newSort) => {
    const next = new URLSearchParams(params)
    next.set('sort', newSort)
    setParams(next)
  }

  const toggleSelect = (id) => {
    const nextSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : selected.length < 4
      ? [...selected, id]
      : selected

    const nextParams = new URLSearchParams(params)
    if (nextSelected.length > 0) {
      nextParams.set('selected', nextSelected.join(','))
    } else {
      nextParams.delete('selected')
    }
    setParams(nextParams)
  }

  // Summary Metrics
  const topCandidate = rankedAll[0]
  const avgScore = rankedAll.length
    ? Math.round(rankedAll.reduce((sum, c) => sum + c.potential_score, 0) / rankedAll.length)
    : 0
  const highGrowthCount = rankedAll.filter((c) => (c.sub_scores.growth_signals || 0) >= 85).length

  return (
    <div className="app-shell min-h-screen pb-20">
      <Navbar selectedCount={selected.length} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Talent Intelligence Dashboard
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-xs">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-md">
                Role: <strong className="text-slate-800 dark:text-slate-200">{analysis?.job?.title || 'Data Science & Machine Learning Lead'}</strong>
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Candidate Potential Rankings
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                clearAnalysis()
                navigate('/upload')
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition shadow-sm cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>New Analysis</span>
            </button>

            {selected.length >= 2 && (
              <button
                onClick={() => navigate(`/compare?selected=${selected.join(',')}`)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition cursor-pointer"
              >
                <Scale size={14} />
                <span>Compare {selected.length} Selected</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Intelligence Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          <div className="card-glass p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Talent Pool</span>
              <Users size={16} className="text-indigo-500" />
            </div>
            <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
              {rankedAll.length}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Total profiles indexed</p>
          </div>

          <div className="card-glass p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Top Potential</span>
              <Award size={16} className="text-emerald-500" />
            </div>
            <div className="font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {topCandidate ? `${topCandidate.potential_score}%` : '—'}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 truncate">
              {topCandidate ? topCandidate.name : 'None'}
            </p>
          </div>

          <div className="card-glass p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Avg Potential</span>
              <Sparkles size={16} className="text-violet-500" />
            </div>
            <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
              {avgScore}%
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Weighted benchmark</p>
          </div>

          <div className="card-glass p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">High Velocity</span>
              <TrendingUp size={16} className="text-amber-500" />
            </div>
            <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
              {highGrowthCount}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Growth score ≥ 85%</p>
          </div>
        </div>

        {/* Main Grid: Sidebar + Candidate List */}
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Left Controls Column */}
          <aside className="space-y-5">
            {/* Weight Sliders Engine */}
            <WeightSliders />

            {/* Quick Sort Controls */}
            <div className="card-glass p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                <ArrowUpDown size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span>Sort Candidates</span>
              </div>

              <div className="space-y-1">
                {[
                  ['potential_score', 'Overall Potential Score'],
                  ['skill_match', 'Direct Skill Match'],
                  ['test_score', 'Test & Certifications'],
                  ['growth_signals', 'Growth Velocity'],
                  ['skill_adjacency', 'Skill Adjacency'],
                ].map(([key, label]) => {
                  const isActive = sort === key
                  return (
                    <button
                      key={key}
                      onClick={() => setSort(key)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 font-bold text-indigo-700 dark:text-indigo-300'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Right Candidates Feed */}
          <section className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="card-glass flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5">
              <div className="relative w-full sm:w-80">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, skill, or tag..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/80 pl-9 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition"
                />
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                <button
                  onClick={() => setOnlyShortlisted(!onlyShortlisted)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    onlyShortlisted
                      ? 'border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <Bookmark size={13} fill={onlyShortlisted ? 'currentColor' : 'none'} />
                  <span>Shortlisted ({bookmarks.length})</span>
                </button>

                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  Showing <strong className="text-slate-800 dark:text-slate-200">{filteredCandidates.length}</strong> of {rankedAll.length}
                </span>
              </div>
            </div>

            {/* Candidate Cards */}
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  rank={index + 1}
                  isSelected={selected.includes(candidate.id)}
                  onToggleSelect={() => toggleSelect(candidate.id)}
                  onOpenInterviewGuide={(cand) => setActiveInterviewCandidate(cand)}
                />
              ))
            ) : (
              <div className="card-glass p-12 text-center">
                <Users size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <h4 className="font-display text-base font-bold text-slate-700 dark:text-slate-200">No candidates match your criteria</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
                  Try clearing the search query or disabling the shortlisted filter to view all evaluated candidates.
                </p>
                <button
                  onClick={() => {
                    setSearch('')
                    setOnlyShortlisted(false)
                  }}
                  className="mt-4 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Floating Compare Action Bar */}
      {selected.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 flex items-center gap-3 rounded-2xl bg-slate-900/95 dark:bg-slate-850/95 backdrop-blur-md px-5 py-3 text-white shadow-2xl border border-slate-700 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold">
              {selected.length}
            </span>
            <span>Candidates Selected for Comparison</span>
          </div>
          <button
            onClick={() => navigate(`/compare?selected=${selected.join(',')}`)}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm cursor-pointer"
          >
            <span>Launch Comparison</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* Interview Guide Modal */}
      {activeInterviewCandidate && (
        <InterviewGuideModal
          candidate={activeInterviewCandidate}
          onClose={() => setActiveInterviewCandidate(null)}
        />
      )}
    </div>
  )
}
