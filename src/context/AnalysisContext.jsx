import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { initialAnalysis, sampleJobRoles } from '../data/mockData.js'
import { analyzeCandidates } from '../services/analysisService.js'
import { weightPresets } from '../utils/scoring.js'

const AnalysisContext = createContext(null)

export function AnalysisProvider({ children }) {
  const [analysis, setAnalysis] = useState(null)
  const [uploads, setUploads] = useState([])
  const [jdFiles, setJdFiles] = useState([])
  const [jdText, setJdText] = useState('')
  const [activeJobPreset, setActiveJobPreset] = useState(sampleJobRoles[0])
  const [weights, setWeights] = useState(weightPresets[0].weights)
  const [selectedPresetId, setSelectedPresetId] = useState('balanced')
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cpe_bookmarks') || '[]')
    } catch {
      return []
    }
  })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('cpe_bookmarks', JSON.stringify(bookmarks))
    } catch (e) {
      console.warn('Could not save bookmarks to localStorage', e)
    }
  }, [bookmarks])

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const applyPreset = (presetId) => {
    const preset = weightPresets.find((p) => p.id === presetId)
    if (preset) {
      setWeights(preset.weights)
      setSelectedPresetId(presetId)
    }
  }

  const handleSetWeights = (updater) => {
    setSelectedPresetId('custom')
    setWeights((current) => (typeof updater === 'function' ? updater(current) : updater))
  }

  const loadDemoRole = async (jobRole = sampleJobRoles[0]) => {
    setActiveJobPreset(jobRole)
    setWeights(jobRole.weights)
    setSelectedPresetId('balanced')
    setAnalysis({
      ...initialAnalysis,
      job: {
        ...initialAnalysis.job,
        title: jobRole.title,
        description: jobRole.description,
        weights: jobRole.weights,
      },
    })
  }

  const value = useMemo(() => ({
    analysis,
    setAnalysis,
    uploads,
    setUploads,
    jdFiles,
    setJdFiles,
    jdText,
    setJdText,
    activeJobPreset,
    setActiveJobPreset,
    weights,
    setWeights: handleSetWeights,
    selectedPresetId,
    applyPreset,
    bookmarks,
    toggleBookmark,
    searchQuery,
    setSearchQuery,
    loadDemoRole,
    runAnalysis: async () => {
      const result = await analyzeCandidates({
        jdFiles,
        jdText,
        weights,
        uploads,
        activeJobPreset,
      })
      setAnalysis(result)
      return result
    },
    clearAnalysis: () => {
      setAnalysis(null)
      setUploads([])
      setJdFiles([])
      setJdText('')
    },
  }), [
    analysis,
    uploads,
    jdFiles,
    jdText,
    activeJobPreset,
    weights,
    selectedPresetId,
    bookmarks,
    searchQuery,
  ])

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider')
  }
  return context
}
