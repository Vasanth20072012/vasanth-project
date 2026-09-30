import { useState } from 'react'
import { X, ExternalLink, Check, Copy, Sparkles, Layers, ArrowUpRight } from 'lucide-react'
import { PLATFORMS, getAllPlatformUrls } from '../utils/platformSearch'
import { PlatformIcon } from './PlatformIcons'

export default function PlatformLauncherModal({
  role = 'Software Engineer',
  filters = {},
  onClose,
}) {
  const [openedPlatforms, setOpenedPlatforms] = useState([])
  const [copied, setCopied] = useState(false)

  const platformUrls = getAllPlatformUrls({
    role,
    location: filters.location || '',
    workplaceType: filters.workplaceType || 'all',
    jobType: filters.jobType || 'all',
    experienceLevel: filters.experienceLevel || 'all',
    datePosted: filters.datePosted || 'all',
  })

  const handleOpenPlatform = (platformId, url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    if (!openedPlatforms.includes(platformId)) {
      setOpenedPlatforms((prev) => [...prev, platformId])
    }
  }

  const handleOpenAll = () => {
    platformUrls.forEach((p) => {
      window.open(p.url, '_blank', 'noopener,noreferrer')
    })
    setOpenedPlatforms(PLATFORMS.map((p) => p.id))
  }

  const handleCopyLinks = () => {
    const text = platformUrls
      .map((p) => `${p.name}: ${p.url}`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="card-glass relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-indigo-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50/70 via-white to-violet-50/40 dark:from-indigo-950/70 dark:via-slate-900 dark:to-violet-950/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                Multi-Platform Job Search
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">8 Authorized Engines</span>
            </div>
            <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
              {role}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {filters.location || 'Worldwide'} • {filters.workplaceType || 'All Workplace Types'} • {filters.jobType || 'All Job Types'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
            <span>Select a platform to search:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLinks}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                {copied ? <Check size={12} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'Links Copied' : 'Copy All URLs'}</span>
              </button>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {platformUrls.map((platform) => {
              const isOpened = openedPlatforms.includes(platform.id)
              return (
                <div
                  key={platform.id}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    isOpened
                      ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-850 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-xs"
                      style={{ backgroundColor: platform.color }}
                    >
                      <PlatformIcon platformId={platform.id} size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-slate-900 dark:text-white text-sm">
                          {platform.name}
                        </span>
                        {isOpened && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                            <Check size={10} strokeWidth={3} /> Opened
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[170px]">
                        {platform.tagline}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenPlatform(platform.id, platform.url)}
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-900 dark:bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-600 dark:hover:bg-indigo-500 transition shrink-0 ml-2"
                  >
                    <span>Launch</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50/70 dark:bg-slate-900/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {openedPlatforms.length} of {PLATFORMS.length} platforms opened
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAll}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition"
            >
              <Sparkles size={14} />
              <span>Launch All Platforms</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
