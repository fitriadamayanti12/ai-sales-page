import Link from "next/link"
import { Plus, History, TrendingUp, Zap, FileText } from "lucide-react"

export default function DashboardContent() {
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-6 md:mb-12">
        {[
          {
            label: "Pages Generated",
            value: "12",
            icon: FileText,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            label: "Conversion Rate",
            value: "4.8%",
            icon: TrendingUp,
            color: "text-green-600 dark:text-green-400",
            bg: "bg-green-50 dark:bg-green-900/20",
          },
          {
            label: "AI Credits",
            value: "2,450",
            icon: Zap,
            color: "text-yellow-600 dark:text-yellow-400",
            bg: "bg-yellow-50 dark:bg-yellow-900/20",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-6 shadow-lg shadow-slate-200/80 dark:shadow-black/20 border border-slate-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`${stat.bg} p-2.5 md:p-3.5 rounded-xl`}>
                <stat.icon className={`w-5 md:w-6 h-5 md:h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-4 md:mb-5 tracking-tight">
        Quick Actions
      </h2>
      <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
        <Link
          href="/generate"
          className="bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-xl dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-200 group"
        >
          <div className="w-12 md:w-16 h-12 md:h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-6 md:w-8 h-6 md:h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            New Sales Page
          </h3>
          <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
            Create a new AI-powered sales page with your product details.
          </p>
        </Link>

        <Link
          href="/history"
          className="bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 hover:border-slate-400 dark:hover:border-gray-600 hover:shadow-xl dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-200 group"
        >
          <div className="w-12 md:w-16 h-12 md:h-16 bg-slate-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
            <History className="w-6 md:w-8 h-6 md:h-8 text-slate-600 dark:text-gray-400" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            View History
          </h3>
          <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
            Browse, search, and manage your previously generated sales pages.
          </p>
        </Link>
      </div>
    </div>
  )
}