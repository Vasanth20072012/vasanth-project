import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText,
  Upload,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Code2,
  Layers,
  HelpCircle,
  FileCheck,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import { useAnalysis } from '../context/AnalysisContext'
import { sampleJobRoles } from '../data/mockData'

export default function UploadScreen() {
  const {
    uploads,
    setUploads,
    jdFiles,
    setJdFiles,
    jdText,
    setJdText,
    runAnalysis,
    loadDemoRole,
  } = useAnalysis()

  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeStage, setActiveStage] = useState(0)
  const [jdTab, setJdTab] = useState('upload') // 'upload' | 'text'
  const fileInputRef = useRef(null)

  const stages = [
    'Parsing structured and unstructured resume tokens...',
    'Evaluating verified test benchmarks & industry credentials...',
    'Tracing multi-year career velocity and complexity progression...',
    'Calculating cross-domain skill adjacency & transferability vectors...',
    'Generating calibrated multidimensional potential rankings...',
  ]

  const validTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  const handleJdDrop = (e) => {
    e.preventDefault()
    addJdFiles(e.dataTransfer.files)
  }

  const handleResumeDrop = (e) => {
    e.preventDefault()
    addResumeFiles(e.dataTransfer.files)
  }

  const addJdFiles = (fileList) => {
    const files = Array.from(fileList)
    const accepted = files.filter((file) => {
      if (!validTypes.includes(file.type) && !/\.(pdf|docx)$/i.test(file.name)) {
        setError(`${file.name} is not a valid PDF or DOCX file.`)
        return false
      }
      if (file.size > 12 * 1024 * 1024) {
        setError(`${file.name} exceeds the 12 MB limit.`)
        return false
      }
      return true
    })

    if (jdFiles.length + accepted.length > 5) {
      setError('You can upload a maximum of 5 job specification files.')
      return
    }

    setError('')
    setJdFiles([...jdFiles, ...accepted])
  }

  const addResumeFiles = (fileList) => {
    const files = Array.from(fileList)
    const accepted = files.filter((file) => {
      if (!validTypes.includes(file.type) && !/\.(pdf|docx)$/i.test(file.name)) {
        setError(`${file.name} is not a valid PDF or DOCX file.`)
        return false
      }
      if (file.size > 12 * 1024 * 1024) {
        setError(`${file.name} exceeds the 12 MB limit.`)
        return false
      }
      return true
    })

    if (uploads.length + accepted.length > 20) {
      setError('You can upload a maximum of 20 candidate resumes.')
      return
    }

    setError('')
    setUploads([...uploads, ...accepted])
  }

  const handleLaunchAnalysis = () => {
    setIsProcessing(true)
    let current = 0
    const timer = setInterval(() => {
      current += 1
      setActiveStage(current)
      if (current >= stages.length) {
        clearInterval(timer)
        runAnalysis().then(() => {
          navigate('/dashboard')
        })
      }
    }, 600)
  }

  const handleQuickDemo = async (role) => {
    setIsProcessing(true)
    let current = 0
    const timer = setInterval(() => {
      current += 1
      setActiveStage(current)
      if (current >= stages.length) {
        clearInterval(timer)
        loadDemoRole(role).then(() => {
          navigate('/dashboard')
        })
      }
    }, 450)
  }

  const isFormReady = (jdFiles.length > 0 || jdText.trim().length > 20) && uploads.length > 0

  return (
    <div className="app-shell min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="mx-auto max-w-3xl text-center py-6 sm:py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 dark:border-indigo-800/60 bg-indigo-50/80 dark:bg-indigo-950/70 px-3.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-4 shadow-sm">
            <Sparkles size={14} className="animate-pulse-glow" />
            <span>Beyond Keyword Matching</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Discover True Candidate <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">Potential</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Standard ATS filters discard high-velocity learners and domain switchers. Our 4-axis engine scores direct skill match, verified credentials, career trajectory, and transferable skill adjacency.
          </p>

          {/* Quick Demo Launcher Card */}
          <div className="mt-8 rounded-2xl border border-indigo-200/80 dark:border-slate-800 bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/60 dark:from-indigo-950/70 dark:via-slate-900 dark:to-violet-950/50 p-5 shadow-sm sm:p-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold">
                    ★
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Instant Interactive Demo
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                  Test the intelligence engine immediately with pre-loaded candidate profiles (Lead Practitioner, Specialist, Experimenter, Upskiller).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {sampleJobRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleQuickDemo(role)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 px-3.5 py-2.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{role.title.split('/')[0]}</span>
                    <ArrowRight size={13} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/50 p-4 text-xs font-semibold text-rose-800 dark:text-rose-300 animate-fade-in">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Two-Column Upload Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Column 1: Job Description */}
          <section className="card-glass p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">1. Job Description</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Target role requirements & expectations</p>
                  </div>
                </div>

                {/* Tab switch */}
                <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
                  <button
                    onClick={() => setJdTab('upload')}
                    className={`rounded-md px-2.5 py-1 transition cursor-pointer ${
                      jdTab === 'upload' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    onClick={() => setJdTab('text')}
                    className={`rounded-md px-2.5 py-1 transition cursor-pointer ${
                      jdTab === 'text' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Paste Text
                  </button>
                </div>
              </div>

              {jdTab === 'upload' ? (
                <>
                  <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleJdDrop}
                    className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200/90 dark:border-indigo-800/80 bg-indigo-50/20 dark:bg-indigo-950/20 px-6 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/40"
                  >
                    <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-900/50">
                      <Upload size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Drag & drop Job Description here
                    </span>
                    <span className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      or <strong className="text-indigo-600 dark:text-indigo-400">browse files</strong> from computer
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.docx"
                      className="hidden"
                      onChange={(e) => addJdFiles(e.target.files)}
                    />
                  </label>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>PDF or DOCX format</span>
                    <span>Max 5 files • 12MB each</span>
                  </div>

                  {jdFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {jdFiles.map((file, idx) => (
                        <div
                          key={`${file.name}-${idx}`}
                          className="flex items-center justify-between rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileCheck size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </div>
                          <button
                            onClick={() => setJdFiles(jdFiles.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  <textarea
                    rows={6}
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste job description text here, including technical requirements, stack, and seniority expectations..."
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 p-3.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none transition leading-relaxed"
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-400 dark:text-slate-500">
                    <span>{jdText.length} characters</span>
                    <button
                      type="button"
                      onClick={() => setJdText(sampleJobRoles[0].description)}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
                    >
                      Use Sample Data Scientist JD
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
              <Sparkles size={13} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span>Job requirements will be used to calibrate skill adjacency vectors.</span>
            </div>
          </section>

          {/* Column 2: Resume Uploads */}
          <section className="card-glass p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400">
                    <Users size={18} />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">2. Candidate Resumes</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Upload candidate PDFs or DOCX files</p>
                  </div>
                </div>
                {uploads.length > 0 && (
                  <span className="rounded-full bg-violet-50 dark:bg-violet-950/70 px-2.5 py-1 text-xs font-bold text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60">
                    {uploads.length} Selected
                  </span>
                )}
              </div>

              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleResumeDrop}
                className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200/90 dark:border-violet-800/80 bg-violet-50/20 dark:bg-violet-950/20 px-6 py-6 text-center transition hover:border-violet-400 hover:bg-violet-50/40 dark:hover:bg-violet-950/40"
              >
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm border border-violet-100 dark:border-violet-900/50">
                  <Upload size={20} />
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Drag & drop candidate resumes here
                </span>
                <span className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  or <strong className="text-violet-600 dark:text-violet-400">browse files</strong> from computer
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => addResumeFiles(e.target.files)}
                />
              </label>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>PDF or DOCX format</span>
                <span>Upload up to 20 resumes</span>
              </div>

              {uploads.length > 0 && (
                <div className="mt-4 max-h-40 overflow-y-auto space-y-2 pr-1">
                  {uploads.map((file, idx) => (
                    <div
                      key={`${file.name}-${idx}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCheck size={15} className="text-violet-600 dark:text-violet-400 shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </div>
                      <button
                        onClick={() => setUploads(uploads.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span>Automatic text parsing & claim-to-evidence extraction</span>
              {uploads.length === 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const sampleFiles = [
                      new File([''], 'Rahul_Kumar_Resume.pdf', { type: 'application/pdf' }),
                      new File([''], 'Maya_Patel_Resume.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
                      new File([''], 'Aisha_Williams_Profile.pdf', { type: 'application/pdf' }),
                      new File([''], 'Daniel_Lee_Resume.pdf', { type: 'application/pdf' }),
                    ]
                    setUploads(sampleFiles)
                    if (jdFiles.length === 0 && !jdText) {
                      setJdFiles([new File([''], 'Senior_ML_Product_Specialist_Spec.pdf', { type: 'application/pdf' })])
                    }
                  }}
                  className="font-bold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
                >
                  Populate 4 Sample Files
                </button>
              )}
            </div>
          </section>
        </div>

        {/* Launch Button Section */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            disabled={!isFormReady || isProcessing}
            onClick={handleLaunchAnalysis}
            className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Run Multidimensional Analysis</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>

          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            {isFormReady
              ? `Ready to evaluate ${uploads.length} candidate${uploads.length > 1 ? 's' : ''}`
              : 'Add at least one job description and resume to run analysis, or try the interactive demo above.'}
          </p>
        </div>
      </main>

      {/* Processing Modal Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 dark:bg-black/80 p-4 backdrop-blur-md animate-fade-in">
          <div className="card-glass w-full max-w-lg p-7 shadow-2xl border-indigo-200 dark:border-slate-800">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
                <Loader2 className="animate-spin" size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  AI Potential Engine Running
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Synthesizing multidimensional signals...</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {stages.map((stage, idx) => {
                const isPassed = idx < activeStage
                const isCurrent = idx === activeStage
                return (
                  <div
                    key={stage}
                    className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                      isPassed
                        ? 'font-semibold text-slate-800 dark:text-slate-200'
                        : isCurrent
                        ? 'font-bold text-indigo-600 dark:text-indigo-400 scale-[1.01]'
                        : 'text-slate-400 dark:text-slate-500 opacity-60'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    ) : isCurrent ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shrink-0">
                        {idx + 1}
                      </span>
                    ) : (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                    )}
                    <span className="truncate">{stage}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
