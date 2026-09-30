import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sparkles, Users, Scale, Upload, Briefcase, ArrowRight, Sun, Moon } from 'lucide-react'
import { useAnalysis } from '../context/AnalysisContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar({ selectedCount = 0 }) {
  const { analysis, loadDemoRole } = useAnalysis()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const handleQuickDemo = async () => {
    await loadDemoRole()
    navigate('/dashboard')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/upload" className="group flex items-center gap-3 no-underline">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-105">
            <Sparkles size={20} className="animate-pulse-glow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                Candidate Potential
              </span>
              <span className="rounded bg-indigo-50 dark:bg-indigo-950/70 border border-transparent dark:border-indigo-800/40 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Engine
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-400">Multidimensional Talent Intelligence</p>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {analysis && (
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                location.pathname === '/dashboard'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users size={15} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {/* Career & Job Finder Link */}
          <Link
            to="/career-finder"
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
              location.pathname === '/career-finder'
                ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase size={15} className="text-indigo-600 dark:text-indigo-400" />
            <span>Find Jobs</span>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 px-1.5 py-0.2 text-[9px] font-extrabold text-emerald-700 dark:text-emerald-300">
              8 Sites
            </span>
          </Link>

          {analysis && selectedCount >= 2 && (
            <Link
              to="/compare"
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                location.pathname === '/compare'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Scale size={15} />
              <span>Compare</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {selectedCount}
              </span>
            </Link>
          )}

          <Link
            to="/upload"
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
              location.pathname === '/upload'
                ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload size={15} />
            <span className="hidden sm:inline">{analysis ? 'New Analysis' : 'Upload'}</span>
          </Link>

          {!analysis && (
            <button
              onClick={handleQuickDemo}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:brightness-110 active:scale-95"
            >
              <Sparkles size={13} />
              <span>Explore Demo</span>
              <ArrowRight size={13} />
            </button>
          )}

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-800/90 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-amber-300 transition shadow-xs cursor-pointer"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </nav>
      </div>
    </header>
  )
}
