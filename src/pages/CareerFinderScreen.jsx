import { useState, useMemo } from 'react'
import {
  Briefcase,
  MapPin,
  Filter,
  Sparkles,
  Search,
  Globe,
  Clock,
  Layers,
  Building,
  UserCheck,
  ArrowRight,
  RotateCcw,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import JobCard from '../components/JobCard'
import PlatformLauncherModal from '../components/PlatformLauncherModal'
import { useAnalysis } from '../context/AnalysisContext'
import { initialAnalysis } from '../data/mockData'
import { getJobSuggestionsForCandidate } from '../utils/jobSuggestions'

const LOCATION_PRESETS = ['Remote', 'Bengaluru', 'San Francisco', 'London', 'New York', 'Singapore']

export default function CareerFinderScreen() {
  const { analysis } = useAnalysis()
  
  // Available candidates: from analysis if present, or fallback to mock candidates
  const candidates = analysis?.candidates?.length ? analysis.candidates : initialAnalysis.candidates
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidates[0]?.id || 'c1')

  const activeCandidate = useMemo(() => {
    return candidates.find((c) => c.id === selectedCandidateId) || candidates[0]
  }, [candidates, selectedCandidateId])

  // Filter States
  const [filters, setFilters] = useState({
    location: 'Remote',
    workplaceType: 'all',    // all | remote | hybrid | onsite
    jobType: 'all',          // all | fulltime | parttime | internship | contract
    experienceLevel: 'all',  // all | internship | entry | mid | senior | lead
    datePosted: 'all',       // all | 24h | week | month
  })

  const [activeModalRole, setActiveModalRole] = useState(null)

  // Suggested roles for current candidate
  const suggestions = useMemo(() => {
    return getJobSuggestionsForCandidate(activeCandidate)
  }, [activeCandidate])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      location: 'Remote',
      workplaceType: 'all',
      jobType: 'all',
      experienceLevel: 'all',
      datePosted: 'all',
    })
  }

  return (
    <div className="app-shell min-h-screen pb-24">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                <Briefcase size={12} /> Career Intelligence & Multi-Platform Jobs
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-xs">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">8 Live Search Engines</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Career & Job Role Finder
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Synthesizes verified skills, certifications, and career velocity to match top job roles, diagnose missing competencies, and launch live searches across LinkedIn, Indeed, Glassdoor, Naukri, Wellfound, Internshala, Foundit, and Google Jobs.
            </p>
          </div>

          {/* Candidate Switcher Dropdown */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">Profile:</span>
            <select
              value={selectedCandidateId}
              onChange={(e) => setSelectedCandidateId(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:outline-none transition cursor-pointer"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.potential_score || 85}% Potential)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Candidate Snapshot Bar */}
        <div className="card-glass p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-indigo-100 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 font-display text-sm font-bold text-white shadow-sm">
              {activeCandidate?.avatar_seed || activeCandidate?.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {activeCandidate?.name}
                </h2>
                <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  {suggestions.length} Roles Matched
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {activeCandidate?.role_title || 'Applied ML Specialist'} • {activeCandidate?.resume_filename}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeCandidate?.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Search Filters Bar */}
        <section className="card-glass p-5 sm:p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Filter size={15} className="text-indigo-600 dark:text-indigo-400" />
              <span>Job Search Filters & Targeting</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* 1. Location Input & Quick Chips */}
            <div className="space-y-1.5 lg:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <MapPin size={13} className="text-indigo-600 dark:text-indigo-400" />
                <span>Target Location</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="e.g. Remote, Bengaluru, London, San Francisco"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition shadow-2xs"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {LOCATION_PRESETS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleFilterChange('location', loc)}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition cursor-pointer ${
                      filters.location.toLowerCase() === loc.toLowerCase()
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Workplace Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Globe size={13} className="text-indigo-600 dark:text-indigo-400" />
                <span>Workplace</span>
              </label>
              <select
                value={filters.workplaceType}
                onChange={(e) => handleFilterChange('workplaceType', e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs focus:border-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="all">All Workplace Types</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site / In-Office</option>
              </select>
            </div>

            {/* 3. Job Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Building size={13} className="text-indigo-600 dark:text-indigo-400" />
                <span>Job Type</span>
              </label>
              <select
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs focus:border-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="all">All Commitment Types</option>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            {/* 4. Experience Level & Date Posted */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Clock size={13} className="text-indigo-600 dark:text-indigo-400" />
                <span>Experience & Date</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs focus:border-indigo-500 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Exp</option>
                  <option value="internship">Intern</option>
                  <option value="entry">Entry</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                </select>

                <select
                  value={filters.datePosted}
                  onChange={(e) => handleFilterChange('datePosted', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs focus:border-indigo-500 focus:outline-none cursor-pointer"
                >
                  <option value="all">Any Date</option>
                  <option value="24h">Past 24h</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Suggested Roles Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600 dark:text-indigo-400" />
              <span>Top Recommended Job Roles for {activeCandidate?.name}</span>
            </h2>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Ranked by quantified resume compatibility
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {suggestions.map((suggestion) => (
              <JobCard
                key={suggestion.role}
                suggestion={suggestion}
                filters={filters}
                onSearchAll={(role) => setActiveModalRole(role)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Multi-Platform Launcher Modal */}
      {activeModalRole && (
        <PlatformLauncherModal
          role={activeModalRole}
          filters={filters}
          onClose={() => setActiveModalRole(null)}
        />
      )}
    </div>
  )
}
