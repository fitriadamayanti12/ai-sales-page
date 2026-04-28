import Link from "next/link"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-slate-200 dark:text-gray-800 mb-4">
          404
        </h1>
        <div className="w-20 h-20 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-slate-500 dark:text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-5 py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-100 transition shadow-lg"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 font-semibold px-5 py-3 rounded-xl hover:border-slate-300 dark:hover:border-gray-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}