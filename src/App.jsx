import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Sparkles, ArrowRight, FileQuestion } from 'lucide-react'
import UploadScreen from './pages/UploadScreen'
import DashboardScreen from './pages/DashboardScreen'
import DetailScreen from './pages/DetailScreen'
import CompareScreen from './pages/CompareScreen'
import CareerFinderScreen from './pages/CareerFinderScreen'
import Navbar from './components/Navbar'
import { useAnalysis } from './context/AnalysisContext'

function RouteGuard({ children }) {
  const { analysis } = useAnalysis()
  if (!analysis) {
    return <Navigate to="/upload" replace />
  }
  return children
}

function NotFoundScreen() {
  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 mb-4 shadow-sm border border-indigo-100 dark:border-indigo-900/50">
          <FileQuestion size={28} />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          The requested page doesn't exist or there is no active candidate evaluation in progress.
        </p>
        <Link
          to="/upload"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition"
        >
          <span>Return to Engine</span>
          <ArrowRight size={14} />
        </Link>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/upload" replace />} />
      <Route path="/upload" element={<UploadScreen />} />
      <Route path="/career-finder" element={<CareerFinderScreen />} />
      <Route path="/jobs" element={<Navigate to="/career-finder" replace />} />
      <Route
        path="/dashboard"
        element={
          <RouteGuard>
            <DashboardScreen />
          </RouteGuard>
        }
      />
      <Route
        path="/candidates/:candidateId"
        element={
          <RouteGuard>
            <DetailScreen />
          </RouteGuard>
        }
      />
      <Route
        path="/compare"
        element={
          <RouteGuard>
            <CompareScreen />
          </RouteGuard>
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}
