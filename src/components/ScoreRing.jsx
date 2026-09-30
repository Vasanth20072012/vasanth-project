import { getScoreTier } from '../utils/scoring'

export default function ScoreRing({
  score = 0,
  size = 110,
  strokeWidth = 8,
  showLabel = true,
  sublabel = 'POTENTIAL',
}) {
  const tier = getScoreTier(score)
  const radius = (size - strokeWidth * 2) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (circumference * Math.min(Math.max(score, 0), 100)) / 100

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-slate-100 dark:stroke-slate-800 transition-colors"
        />
        {/* Animated Fill */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={tier.ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Center Label */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-none" style={{ fontSize: size * 0.28 }}>
            {score}
          </span>
          {sublabel && (
            <span
              className="mt-0.5 font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 leading-none"
              style={{ fontSize: Math.max(size * 0.08, 9) }}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
