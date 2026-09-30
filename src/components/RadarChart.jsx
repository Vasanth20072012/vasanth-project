import { useMemo } from 'react'
import { scoreLabels, getRadarPoints } from '../utils/scoring'

const PALETTE = [
  { stroke: '#4f46e5', fill: 'rgba(79, 70, 229, 0.22)', point: '#4338ca' }, // Indigo
  { stroke: '#059669', fill: 'rgba(5, 150, 105, 0.22)', point: '#047857' }, // Emerald
  { stroke: '#d97706', fill: 'rgba(217, 119, 6, 0.22)', point: '#b45309' }, // Amber
  { stroke: '#0284c7', fill: 'rgba(2, 132, 199, 0.22)', point: '#0369a1' }, // Sky
]

export default function RadarChart({
  candidates = [],
  size = 240,
  showLabels = true,
  className = '',
}) {
  const center = size / 2
  const maxRadius = (size / 2) * 0.72

  // Axis definitions: top, right, bottom, left
  const axes = [
    { key: 'skill_match', label: 'Skill Match', x: center, y: center - maxRadius - 14, align: 'middle' },
    { key: 'test_score', label: 'Test & Certs', x: center + maxRadius + 14, y: center + 4, align: 'start' },
    { key: 'growth_signals', label: 'Growth Velocity', x: center, y: center + maxRadius + 18, align: 'middle' },
    { key: 'skill_adjacency', label: 'Skill Adjacency', x: center - maxRadius - 14, y: center + 4, align: 'end' },
  ]

  // Concentric levels: 25%, 50%, 75%, 100%
  const levels = [0.25, 0.5, 0.75, 1.0]

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Concentric Guide Webs */}
        {levels.map((level, i) => {
          const r = maxRadius * level
          return (
            <polygon
              key={i}
              points={`${center},${center - r} ${center + r},${center} ${center},${center + r} ${center - r},${center}`}
              className={`${
                i === levels.length - 1
                  ? 'fill-slate-50 dark:fill-slate-800/50'
                  : 'fill-none'
              } stroke-slate-200 dark:stroke-slate-700/80 transition-colors`}
              strokeWidth="1"
              strokeDasharray={level === 1 ? 'none' : '2,2'}
            />
          )
        })}

        {/* Crosshair Axes */}
        <line
          x1={center}
          y1={center - maxRadius}
          x2={center}
          y2={center + maxRadius}
          className="stroke-slate-300 dark:stroke-slate-700 transition-colors"
          strokeWidth="1"
        />
        <line
          x1={center - maxRadius}
          y1={center}
          x2={center + maxRadius}
          y2={center}
          className="stroke-slate-300 dark:stroke-slate-700 transition-colors"
          strokeWidth="1"
        />

        {/* Candidate Polygons */}
        {candidates.map((candidate, idx) => {
          const color = PALETTE[idx % PALETTE.length]
          const points = getRadarPoints(candidate.sub_scores, center, maxRadius)
          return (
            <g key={candidate.id || idx} className="transition-all duration-500">
              <polygon
                points={points}
                fill={color.fill}
                stroke={color.stroke}
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
              {/* Vertex Dots */}
              {['skill_match', 'test_score', 'growth_signals', 'skill_adjacency'].map((key, kIdx) => {
                const val = (candidate.sub_scores[key] || 0) / 100
                const r = val * maxRadius
                const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]
                const vx = center + r * Math.cos(angles[kIdx])
                const vy = center + r * Math.sin(angles[kIdx])
                return (
                  <circle
                    key={key}
                    cx={vx}
                    cy={vy}
                    r="4"
                    fill={color.point}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                )
              })}
            </g>
          )
        })}

        {/* Axis Labels */}
        {showLabels &&
          axes.map((axis) => (
            <text
              key={axis.key}
              x={axis.x}
              y={axis.y}
              textAnchor={axis.align}
              className="fill-slate-500 dark:fill-slate-400 font-sans text-[11px] font-bold uppercase tracking-wider"
            >
              {scoreLabels[axis.key].shortLabel}
            </text>
          ))}
      </svg>

      {/* Legend if multiple candidates */}
      {candidates.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {candidates.map((c, i) => {
            const color = PALETTE[i % PALETTE.length]
            return (
              <div key={c.id || i} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color.stroke }}
                />
                <span>{c.name}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
