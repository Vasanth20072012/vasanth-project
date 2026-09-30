import { initialAnalysis } from '../data/mockData.js'

/**
 * Simulates intelligent resume parsing, career trajectory mapping, and signal extraction.
 * Can be hooked into actual LLM / backend endpoints.
 */
export async function analyzeCandidates({
  jdFiles = [],
  jdText = '',
  weights,
  uploads = [],
  activeJobPreset,
}) {
  // Simulate network / processing delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  let candidates = []

  if (uploads.length === 0) {
    // If no custom uploads provided, fallback to rich sample candidates
    candidates = initialAnalysis.candidates
  } else {
    candidates = uploads.map((file, index) => {
      const matchingCandidate = initialAnalysis.candidates.find(
        (candidate) =>
          candidate.resume_filename.toLowerCase() === file.name.toLowerCase() ||
          candidate.name.toLowerCase() === file.name.replace(/\.(pdf|docx)$/i, '').toLowerCase()
      )

      if (matchingCandidate) {
        return matchingCandidate
      }

      // Map to template with customized dynamic metrics for fresh uploads
      const template = initialAnalysis.candidates[index % initialAnalysis.candidates.length]
      const cleanName = file.name
        .replace(/\.(pdf|docx)$/i, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

      const initials = cleanName
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')

      return {
        ...template,
        id: `uploaded-${Date.now()}-${index + 1}`,
        name: cleanName,
        resume_filename: file.name,
        avatar_seed: initials || 'CD',
        analyzed_at: new Date().toISOString(),
        tags: ['New Upload', 'Parsed Resume'],
      }
    })
  }

  const jobTitle = activeJobPreset?.title || 'Data Science & Machine Learning Lead'
  const jobDescription = jdText || (jdFiles.length ? `Requirements from ${jdFiles.map(f => f.name).join(', ')}` : initialAnalysis.job.description)

  return {
    job: {
      ...initialAnalysis.job,
      title: jobTitle,
      description: jobDescription,
      jd_filenames: jdFiles.map((file) => file.name),
      weights,
    },
    candidates,
  }
}
