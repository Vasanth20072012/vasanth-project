import { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  HelpCircle,
  FileText,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Check,
  Target,
  Clock,
  ArrowRight,
  Briefcase,
  ExternalLink,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import ScoreRing from '../components/ScoreRing'
import RadarChart from '../components/RadarChart'
import InterviewGuideModal from '../components/InterviewGuideModal'
import JobCard from '../components/JobCard'
import PlatformLauncherModal from '../components/PlatformLauncherModal'
import { useAnalysis } from '../context/AnalysisContext'
import { rankCandidates, scoreLabels, getScoreTier } from '../utils/scoring'
import { getJobSuggestionsForCandidate } from '../utils/jobSuggestions'

export default function DetailScreen() {
  const { candidateId } = useParams()
  const navigate = useNavigate()
  const { analysis, weights, bookmarks, toggleBookmark } = useAnalysis()

  const [activeTab, setActiveTab] = useState('signals') // 'signals' | 'jobs' | 'resume'
  const [showInterviewModal, setShowInterviewModal] = useState(false)
  const [activeLauncherRole, setActiveLauncherRole] = useState(null)
  
  const [expandedSections, setExpandedSections] = useState({
    skill_match: true,
    test_score: true,
    growth_signals: true,
    skill_adjacency: true,
  })

  const [jobFilters, setJobFilters] = useState({
    location: 'Remote',
    workplaceType: 'all',
    jobType: 'all',
    experienceLevel: 'all',
    datePosted: 'all',
  })

  const candidate = analysis?.candidates?.find((c) => c.id === candidateId)
  const ranked = analysis ? rankCandidates(analysis.candidates, weights) : []
  const rank = ranked.findIndex((c) => c.id === candidateId) + 1

  const suggestions = useMemo(() => {
    return candidate ? getJobSuggestionsForCandidate(candidate) : []
  }, [candidate])

  if (!candidate) {
    return (
      <div className="app-shell min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-lg text-center py-20 px-4">
          <FileText size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">Candidate Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">The requested candidate profile is unavailable.</p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </main>
      </div>
    )
  }

  const isBookmarked = bookmarks.includes(candidate.id)
  const tier = getScoreTier(candidate.potential_score)

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="app-shell min-h-screen pb-20">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(candidate.id)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                isBookmarked
                  ? 'border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? 'Shortlisted' : 'Shortlist'}</span>
            </button>

            <button
              onClick={() => setShowInterviewModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition cursor-pointer"
            >
              <HelpCircle size={14} />
              <span>Interview Guide</span>
            </button>
          </div>
        </div>

        {/* Executive Profile Header Card */}
        <div className="card-glass p-6 sm:p-8 mb-8 border-indigo-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 font-display text-xl font-extrabold text-white shadow-lg shadow-indigo-500/25">
                {candidate.avatar_seed || candidate.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                    Rank #{rank}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tier.badgeClass}`}>
                    {tier.tier}
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {candidate.name}
                </h1>

                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {candidate.role_title || 'Applied ML Specialist'}
                </p>

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1.5">
                  <FileText size={13} />
                  <span>{candidate.resume_filename}</span>
                  <span>•</span>
                  <span>Evaluated against target role</span>
                </p>
              </div>
            </div>

            {/* Score Ring & Mini Radar */}
            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div className="text-center">
                <ScoreRing score={candidate.potential_score} size={94} strokeWidth={8} />
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Potential Score
                </span>
              </div>

              <div className="hidden sm:block">
                <RadarChart candidates={[candidate]} size={120} showLabels={false} />
              </div>
            </div>
          </div>

          {candidate.summary && (
            <div className="mt-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/70 p-4 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
              <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <span>{candidate.summary}</span>
            </div>
          )}
        </div>

        {/* View Switch: Signals vs Career Finder vs Raw Resume */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('signals')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'signals'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles size={14} />
            <span>Multidimensional Signal Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Briefcase size={14} />
            <span>Career Paths & Job Matches ({suggestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText size={14} />
            <span>Extracted Resume Text</span>
          </button>
        </div>

        {/* Tab 1: Signals Breakdown */}
        {activeTab === 'signals' && (
          <div className="space-y-5">
            {/* 1. Skill Match */}
            <section className="card-glass overflow-hidden border-indigo-100/80 dark:border-slate-800">
              <button
                onClick={() => toggleSection('skill_match')}
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/70 font-display font-extrabold text-indigo-700 dark:text-indigo-300">
                    {candidate.sub_scores.skill_match}%
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      Direct Skill Match
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Alignment with target technical competencies & stack
                    </p>
                  </div>
                </div>
                {expandedSections.skill_match ? (
                  <ChevronUp size={18} className="text-slate-400 dark:text-slate-500" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400 dark:text-slate-500" />
                )}
              </button>

              {expandedSections.skill_match && (
                <div className="border-t border-slate-100 dark:border-slate-800 p-5 sm:p-6 space-y-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      Matched Core Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.skill_match_detail?.matched_skills?.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1"
                        >
                          <Check size={12} strokeWidth={2.5} /> {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {candidate.skill_match_detail?.relevant_skills?.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        Relevant Supporting Capabilities
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skill_match_detail.relevant_skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Claims to Evidence */}
                  <div className="rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 p-4 border border-indigo-100/60 dark:border-indigo-900/60 mt-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-2.5 flex items-center gap-1.5">
                      <Sparkles size={13} />
                      <span>Synthesized Claims & Verifiable Evidence</span>
                    </div>
                    <div className="space-y-2.5">
                      {candidate.skill_match_detail?.reasoning?.map((r, i) => (
                        <div key={i} className="text-xs">
                          <strong className="text-slate-800 dark:text-slate-200 font-semibold">{r.claim}: </strong>
                          <span className="text-slate-600 dark:text-slate-400">{r.evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 2. Test & Certifications */}
            <section className="card-glass overflow-hidden border-sky-100/80 dark:border-slate-800">
              <button
                onClick={() => toggleSection('test_score')}
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/70 font-display font-extrabold text-sky-700 dark:text-sky-300">
                    {candidate.sub_scores.test_score}%
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      Standardized Benchmarks & Credentials
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Externally validated technical certifications & practical assessments
                    </p>
                  </div>
                </div>
                {expandedSections.test_score ? (
                  <ChevronUp size={18} className="text-slate-400 dark:text-slate-500" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400 dark:text-slate-500" />
                )}
              </button>

              {expandedSections.test_score && (
                <div className="border-t border-slate-100 dark:border-slate-800 p-5 sm:p-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50/80 dark:bg-slate-850 p-3.5 border border-slate-200/80 dark:border-slate-700">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                        <Award size={14} className="text-sky-600 dark:text-sky-400" />
                        <span>Verified Certifications</span>
                      </div>
                      <ul className="space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {candidate.test_score_detail?.certifications?.map((c) => (
                          <li key={c} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-slate-50/80 dark:bg-slate-850 p-3.5 border border-slate-200/80 dark:border-slate-700">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span>Standardized Test Results</span>
                      </div>
                      <ul className="space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {candidate.test_score_detail?.tests?.map((t) => (
                          <li key={t} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {candidate.test_score_detail?.reasoning?.map((r, i) => (
                    <div key={i} className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      <strong className="text-slate-800 dark:text-slate-200 font-semibold">{r.claim}: </strong>
                      <span>{r.evidence}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 3. Growth Velocity */}
            <section className="card-glass overflow-hidden border-emerald-100/80 dark:border-slate-800">
              <button
                onClick={() => toggleSection('growth_signals')}
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/70 font-display font-extrabold text-emerald-700 dark:text-emerald-300">
                    {candidate.sub_scores.growth_signals}%
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      Growth Signals & Career Velocity
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Slope of progression, expanding leadership scope & learning agility
                    </p>
                  </div>
                </div>
                {expandedSections.growth_signals ? (
                  <ChevronUp size={18} className="text-slate-400 dark:text-slate-500" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400 dark:text-slate-500" />
                )}
              </button>

              {expandedSections.growth_signals && (
                <div className="border-t border-slate-100 dark:border-slate-800 p-5 sm:p-6 space-y-4">
                  {/* Career Timeline */}
                  <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-200/80 dark:border-emerald-800 space-y-6 my-2">
                    {candidate.growth_signals_detail?.timeline?.map((item, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[31px] sm:-left-[39px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 border-2 border-white dark:border-slate-900 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 shadow-sm">
                          {idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded">
                            {item.date}
                          </span>
                          <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                            {item.role}
                          </h4>
                          {item.company && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                              @ {item.company}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.complexity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl bg-emerald-50/50 dark:bg-emerald-950/40 p-4 border border-emerald-100/60 dark:border-emerald-900/60 mt-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                      <TrendingUp size={13} />
                      <span>Velocity Synthesis</span>
                    </div>
                    {candidate.growth_signals_detail?.reasoning?.map((r, i) => (
                      <div key={i} className="text-xs text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-white font-semibold">{r.claim}: </strong>
                        <span>{r.evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 4. Skill Adjacency */}
            <section className="card-glass overflow-hidden border-amber-100/80 dark:border-slate-800">
              <button
                onClick={() => toggleSection('skill_adjacency')}
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/70 font-display font-extrabold text-amber-700 dark:text-amber-300">
                    {candidate.sub_scores.skill_adjacency}%
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      Skill Adjacency & Transferability
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Transferable conceptual bridges to required role functions
                    </p>
                  </div>
                </div>
                {expandedSections.skill_adjacency ? (
                  <ChevronUp size={18} className="text-slate-400 dark:text-slate-500" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400 dark:text-slate-500" />
                )}
              </button>

              {expandedSections.skill_adjacency && (
                <div className="border-t border-slate-100 dark:border-slate-800 p-5 sm:p-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-amber-50/40 dark:bg-amber-950/30 p-4 border border-amber-200/60 dark:border-amber-800/60">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                        <Target size={14} />
                        <span>Candidate Possesses</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skill_adjacency_detail?.candidate_has?.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800/60 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-50 dark:bg-slate-850 p-4 border border-slate-200 dark:border-slate-700">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                        <ArrowRight size={14} />
                        <span>Transfers Into Job Need</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skill_adjacency_detail?.job_requires?.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-50/50 dark:bg-amber-950/40 p-4 border border-amber-100/60 dark:border-amber-900/60 mt-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
                      Transferability Reasoning
                    </div>
                    {candidate.skill_adjacency_detail?.reasoning?.map((r, i) => (
                      <div key={i} className="text-xs text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-white font-semibold">{r.claim}: </strong>
                        <span>{r.evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Tab 2: Career Paths & Job Finder */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="card-glass p-5 border-indigo-100 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
                    <span>Matched Career Opportunities for {candidate.name}</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Based on verified resume skills, career progression slope, and certifications.
                  </p>
                </div>
                <Link
                  to="/career-finder"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition hover:underline"
                >
                  <span>Open Full Job Search Hub</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {suggestions.map((suggestion) => (
                <JobCard
                  key={suggestion.role}
                  suggestion={suggestion}
                  filters={jobFilters}
                  onSearchAll={(role) => setActiveLauncherRole(role)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Raw Resume */}
        {activeTab === 'resume' && (
          <div className="card-glass p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Raw Resume Text Extraction
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(candidate.resume_text)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Copy Resume Text
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-200 bg-slate-50/60 dark:bg-slate-850 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700 max-h-[600px] overflow-y-auto">
              {candidate.resume_text}
            </pre>
          </div>
        )}
      </main>

      {/* Interview Guide Modal */}
      {showInterviewModal && (
        <InterviewGuideModal
          candidate={candidate}
          onClose={() => setShowInterviewModal(false)}
        />
      )}

      {/* Multi-Platform Search Launcher Modal */}
      {activeLauncherRole && (
        <PlatformLauncherModal
          role={activeLauncherRole}
          filters={jobFilters}
          onClose={() => setActiveLauncherRole(null)}
        />
      )}
    </div>
  )
}
