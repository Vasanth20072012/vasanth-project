export const scoreLabels = {
  skill_match: {
    label: 'Skill Match',
    shortLabel: 'Skills',
    description: 'Direct alignment with target technical stack & requirements',
    color: '#6366f1', // Indigo
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  test_score: {
    label: 'Test & Certifications',
    shortLabel: 'Tests',
    description: 'Externally verified capabilities, benchmarks & credentials',
    color: '#0ea5e9', // Sky
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  growth_signals: {
    label: 'Growth Velocity',
    shortLabel: 'Growth',
    description: 'Career trajectory, rapid promotions & increasing scope',
    color: '#10b981', // Emerald
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  skill_adjacency: {
    label: 'Skill Adjacency',
    shortLabel: 'Adjacency',
    description: 'High-leverage transferable capabilities and lateral problem solving',
    color: '#f59e0b', // Amber
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
}

export const weightPresets = [
  {
    id: 'balanced',
    name: 'Balanced Potential',
    description: 'Harmonious evaluation across all four intelligence dimensions',
    weights: { skill_match: 0.30, test_score: 0.20, growth_signals: 0.25, skill_adjacency: 0.25 },
  },
  {
    id: 'growth_focus',
    name: 'Growth & Velocity Focus',
    description: 'Ideal for finding high-slope, fast learners and future leaders',
    weights: { skill_match: 0.20, test_score: 0.15, growth_signals: 0.45, skill_adjacency: 0.20 },
  },
  {
    id: 'specialist',
    name: 'Senior Depth Specialist',
    description: 'Prioritizes immediate technical execution and verified mastery',
    weights: { skill_match: 0.45, test_score: 0.25, growth_signals: 0.15, skill_adjacency: 0.15 },
  },
  {
    id: 'adjacent_pivot',
    name: 'Transferable Talent Finder',
    description: 'Uncovers hidden gems with strong lateral problem-solving abilities',
    weights: { skill_match: 0.15, test_score: 0.15, growth_signals: 0.30, skill_adjacency: 0.40 },
  },
]

export function normalizeWeights(weights) {
  const total = Object.values(weights).reduce((sum, value) => sum + Number(value || 0), 0) || 1
  return Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [key, Number(value || 0) / total])
  )
}

export function getWeightedScore(candidate, weights) {
  const normalized = normalizeWeights(weights)
  const score = Object.entries(normalized).reduce((sum, [key, weight]) => {
    return sum + (candidate.sub_scores[key] || 0) * weight
  }, 0)
  return Math.round(score)
}

export function getScoreTier(score) {
  if (score >= 85) {
    return {
      tier: 'Exceptional Potential',
      tag: 'Tier 1 • Prime Pick',
      color: '#10b981',
      bgClass: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      gradient: 'from-emerald-500 to-teal-600',
      ringColor: '#10b981',
    }
  }
  if (score >= 75) {
    return {
      tier: 'High Potential',
      tag: 'Tier 2 • Strong Contender',
      color: '#4f46e5',
      bgClass: 'bg-indigo-500/10 text-indigo-700 border-indigo-300',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      gradient: 'from-indigo-600 to-violet-600',
      ringColor: '#6366f1',
    }
  }
  if (score >= 65) {
    return {
      tier: 'Moderate Potential',
      tag: 'Tier 3 • Selective Fit',
      color: '#f59e0b',
      bgClass: 'bg-amber-500/10 text-amber-700 border-amber-300',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      gradient: 'from-amber-500 to-orange-600',
      ringColor: '#f59e0b',
    }
  }
  return {
    tier: 'Developing Signal',
    tag: 'Tier 4 • High Gap',
    color: '#94a3b8',
    bgClass: 'bg-slate-500/10 text-slate-700 border-slate-300',
    badgeClass: 'bg-slate-50 text-slate-700 border-slate-200',
    gradient: 'from-slate-400 to-slate-600',
    ringColor: '#94a3b8',
  }
}

export function rankCandidates(candidates = [], weights, sort = 'potential_score') {
  return candidates
    .map((candidate) => ({
      ...candidate,
      potential_score: getWeightedScore(candidate, weights),
    }))
    .sort((a, b) => {
      if (sort === 'potential_score') {
        return b.potential_score - a.potential_score || a.name.localeCompare(b.name)
      }
      const scoreA = a.sub_scores[sort] ?? 0
      const scoreB = b.sub_scores[sort] ?? 0
      return scoreB - scoreA || b.potential_score - a.potential_score || a.name.localeCompare(b.name)
    })
}

// Generates polygon point coordinates for a 4-axis radar chart
export function getRadarPoints(subScores, center = 100, radius = 70) {
  const keys = ['skill_match', 'test_score', 'growth_signals', 'skill_adjacency']
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]
  
  const points = keys.map((key, index) => {
    const val = (subScores[key] || 0) / 100
    const r = val * radius
    const x = center + r * Math.cos(angles[index])
    const y = center + r * Math.sin(angles[index])
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  return points.join(' ')
}

export function getComparisonInsight(candidates) {
  if (!candidates || candidates.length === 0) return ''
  const dimensions = Object.keys(scoreLabels)
  
  const leader = candidates.reduce((best, c) => (c.potential_score > best.potential_score ? c : best), candidates[0])
  
  const spreads = dimensions.map((key) => {
    const sorted = [...candidates].sort((a, b) => (b.sub_scores[key] || 0) - (a.sub_scores[key] || 0))
    const high = sorted[0]
    const low = sorted[sorted.length - 1]
    const spread = (high.sub_scores[key] || 0) - (low.sub_scores[key] || 0)
    return { key, label: scoreLabels[key].label, high, low, spread }
  }).sort((a, b) => b.spread - a.spread)

  const topSpread = spreads[0]

  return `${leader.name} leads overall with a composite Potential Score of ${leader.potential_score}/100. The key competitive differentiator is ${topSpread.label}, where ${topSpread.high.name} (${topSpread.high.sub_scores[topSpread.key]}%) outperforms ${topSpread.low.name} (${topSpread.low.sub_scores[topSpread.key]}%) by a significant ${topSpread.spread}-point margin.`
}
