/**
 * Career & Job Role Suggestion Engine.
 * Evaluates candidates' skills, certifications, career velocity, and resume text
 * to recommend optimal career paths, quantify match percentages, and diagnose skill gaps.
 */

// Comprehensive role archetypes with required competencies
export const ROLE_ARCHETYPES = [
  {
    role: 'Lead Data Scientist & Applied ML',
    category: 'Data Science & Machine Learning',
    seniority: 'Lead / Staff',
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Scikit-learn', 'Demand Forecasting', 'Statistical Modeling'],
    goodToHave: ['MLOps', 'FastAPI', 'A/B Testing', 'PyTorch'],
    highDemandSkills: ['Causal Inference', 'Model Observability', 'PyTorch / CUDA'],
    estimatedSalary: '$165,000 – $210,000 / yr',
    marketDemand: 'Very High (+28% YoY)',
  },
  {
    role: 'Senior Machine Learning Engineer (MLOps)',
    category: 'Engineering & Infrastructure',
    seniority: 'Senior',
    requiredSkills: ['Python', 'AWS', 'Docker', 'Machine Learning', 'Model Monitoring', 'NLP'],
    goodToHave: ['Kubernetes', 'FastAPI', 'TensorFlow', 'CI/CD Pipelines'],
    highDemandSkills: ['Triton Inference Server', 'vLLM / TensorRT', 'Distributed Training'],
    estimatedSalary: '$175,000 – $230,000 / yr',
    marketDemand: 'Exceptional (+36% YoY)',
  },
  {
    role: 'Staff Product Analyst & Experimentation Lead',
    category: 'Product & Analytics',
    seniority: 'Staff / Principal',
    requiredSkills: ['SQL', 'Python', 'A/B Testing', 'Product Analytics', 'Looker', 'dbt'],
    goodToHave: ['Causal Inference', 'User Cohort Analysis', 'Tableau', 'Feature Engineering'],
    highDemandSkills: ['CUPED Variance Reduction', 'Customer Lifetime Value Modeling', 'dbt Mesh'],
    estimatedSalary: '$150,000 – $195,000 / yr',
    marketDemand: 'High (+22% YoY)',
  },
  {
    role: 'Senior Analytics Engineer (dbt & Data Modeling)',
    category: 'Data Platform',
    seniority: 'Senior',
    requiredSkills: ['SQL', 'dbt', 'Python', 'Data Modeling', 'Looker', 'Airflow'],
    goodToHave: ['Snowflake', 'BigQuery', 'Power BI', 'Git'],
    highDemandSkills: ['Semantic Layer Modeling', 'Dagster Orchestration', 'DuckDB'],
    estimatedSalary: '$140,000 – $180,000 / yr',
    marketDemand: 'Very High (+31% YoY)',
  },
  {
    role: 'Senior Business Intelligence Engineer',
    category: 'Business Intelligence & Operations',
    seniority: 'Senior',
    requiredSkills: ['SQL', 'Power BI', 'Excel', 'Data Modeling', 'Operations Analytics'],
    goodToHave: ['Python', 'Tableau', 'ETL Pipelines', 'Automated Reporting'],
    highDemandSkills: ['Python Automation', 'Executive KPI Storytelling', 'Azure Synapse'],
    estimatedSalary: '$125,000 – $165,000 / yr',
    marketDemand: 'Steady (+16% YoY)',
  },
  {
    role: 'AI Solutions Architect',
    category: 'Solutions & Client Engineering',
    seniority: 'Senior / Principal',
    requiredSkills: ['Python', 'Cloud Architecture', 'Machine Learning', 'Stakeholder Storytelling', 'Docker'],
    goodToHave: ['AWS', 'Kubernetes', 'FastAPI', 'Business Problem Framing'],
    highDemandSkills: ['Enterprise LLM Integration', 'SOC2 / AI Governance', 'Cost Optimization'],
    estimatedSalary: '$180,000 – $240,000 / yr',
    marketDemand: 'High (+25% YoY)',
  },
  {
    role: 'Full-Stack AI Application Engineer',
    category: 'Full-Stack & Systems',
    seniority: 'Mid-Senior',
    requiredSkills: ['Python', 'React', 'FastAPI', 'SQL', 'Git'],
    goodToHave: ['Docker', 'TypeScript', 'Tailwind CSS', 'Vector Databases'],
    highDemandSkills: ['LangChain / LlamaIndex', 'Streaming WebSockets', 'Next.js'],
    estimatedSalary: '$145,000 – $190,000 / yr',
    marketDemand: 'Exceptional (+42% YoY)',
  },
  {
    role: 'Quantitative Product Strategist',
    category: 'Strategy & Growth',
    seniority: 'Lead',
    requiredSkills: ['SQL', 'Product Analytics', 'A/B Testing', 'Executive Communication', 'Python'],
    goodToHave: ['Forecasting', 'Marketplace Dynamics', 'Experiment Design'],
    highDemandSkills: ['Pricing Sensitivity Analysis', 'Econometric Modeling'],
    estimatedSalary: '$160,000 – $215,000 / yr',
    marketDemand: 'High (+19% YoY)',
  },
]

/**
 * Calculates tailored job suggestions for a given candidate profile.
 */
export function getJobSuggestionsForCandidate(candidate) {
  if (!candidate) return []

  // Collect candidate skill signals from all available fields
  const candidateSkills = new Set([
    ...(candidate.skill_match_detail?.matched_skills || []),
    ...(candidate.skill_match_detail?.relevant_skills || []),
    ...(candidate.skill_adjacency_detail?.candidate_has || []),
    ...(candidate.test_score_detail?.certifications || []),
  ].map((s) => s.toLowerCase()))

  // Normalize candidate text for deep token searching
  const fullText = (
    (candidate.resume_text || '') + ' ' +
    (candidate.summary || '') + ' ' +
    (candidate.role_title || '')
  ).toLowerCase()

  const scoredRoles = ROLE_ARCHETYPES.map((roleDef) => {
    const matching = []
    const missing = []

    // Evaluate required skills
    roleDef.requiredSkills.forEach((skill) => {
      const lower = skill.toLowerCase()
      const foundInList = Array.from(candidateSkills).some((cs) => cs.includes(lower) || lower.includes(cs))
      const foundInText = fullText.includes(lower)

      if (foundInList || foundInText) {
        matching.push(skill)
      } else {
        missing.push(skill)
      }
    })

    // Evaluate good-to-have skills for bonus score
    let bonusMatches = 0
    roleDef.goodToHave.forEach((skill) => {
      const lower = skill.toLowerCase()
      if (Array.from(candidateSkills).some((cs) => cs.includes(lower) || lower.includes(cs)) || fullText.includes(lower)) {
        if (!matching.includes(skill)) {
          matching.push(skill)
          bonusMatches += 1
        }
      }
    })

    // Match percentage calculation
    const baseWeight = (matching.length / (roleDef.requiredSkills.length + roleDef.goodToHave.length * 0.4)) * 100
    // Factor in candidate growth signals & overall potential
    const potentialBonus = ((candidate.potential_score || 80) - 70) * 0.25
    const matchPercentage = Math.min(Math.max(Math.round(baseWeight + potentialBonus), 62), 98)

    // Recommended skills to learn
    const recommendedSkills = [
      ...missing.slice(0, 2),
      ...roleDef.highDemandSkills.slice(0, 2),
    ].slice(0, 3)

    return {
      role: roleDef.role,
      category: roleDef.category,
      seniority: roleDef.seniority,
      matchPercentage,
      matchingSkills: matching.slice(0, 6),
      missingSkills: missing.slice(0, 4),
      recommendedSkills,
      estimatedSalary: roleDef.estimatedSalary,
      marketDemand: roleDef.marketDemand,
    }
  })

  // Sort by highest match percentage first
  return scoredRoles.sort((a, b) => b.matchPercentage - a.matchPercentage)
}
