import { Sliders, RotateCcw, Zap, Compass, ShieldCheck, Flame } from 'lucide-react'
import { scoreLabels, weightPresets } from '../utils/scoring'
import { useAnalysis } from '../context/AnalysisContext'

const PRESET_ICONS = {
  balanced: Compass,
  growth_focus: Flame,
  specialist: ShieldCheck,
  adjacent_pivot: Zap,
}

export default function WeightSliders({ className = '' }) {
  const { weights, setWeights, selectedPresetId, applyPreset } = useAnalysis()

  const handleSliderChange = (key, value) => {
    setWeights((prev) => ({
      ...prev,
      [key]: Number(value) / 100,
    }))
  }

  // Calculate sum for normalization display
  const total = Object.values(weights).reduce((sum, v) => sum + Number(v || 0), 0) || 1

  return (
    <div className={`card-glass p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Sliders size={15} />
          </div>
          <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">Score Weighting Engine</h3>
        </div>
        <button
          onClick={() => applyPreset('balanced')}
          title="Reset to Balanced default"
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset Pills */}
      <div className="mt-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
          Role Strategy Presets
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {weightPresets.map((preset) => {
            const Icon = PRESET_ICONS[preset.id] || Compass
            const isSelected = selectedPresetId === preset.id
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`flex items-center gap-1.5 rounded-xl border p-2 text-left text-xs transition ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/80 font-bold text-indigo-900 dark:text-indigo-200 shadow-sm'
                    : 'border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-800/60 font-medium text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={14} className={isSelected ? 'text-indigo-600 dark:text-indigo-400 shrink-0' : 'text-slate-400 shrink-0'} />
                <span className="truncate">{preset.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Custom Sliders */}
      <div className="mt-5 space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
          <span>Signal Dimensions</span>
          <span>Effective Weight</span>
        </div>

        {Object.entries(scoreLabels).map(([key, meta]) => {
          const rawVal = Math.round((weights[key] || 0) * 100)
          const normalizedPct = Math.round(((weights[key] || 0) / total) * 100)

          return (
            <div key={key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{meta.label}</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.5 text-[11px]">
                  {normalizedPct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={rawVal}
                onChange={(e) => handleSliderChange(key, e.target.value)}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition"
              />
              <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">{meta.description}</p>
            </div>
          )
        })}
      </div>

      {/* Helper Note */}
      <div className="mt-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 p-2.5 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 leading-relaxed">
        Sliders auto-normalize in real-time. Changing weights recalculates all candidates' potential scores immediately.
      </div>
    </div>
  )
}
