import Link from "next/link"
import { Plus, History, TrendingUp, Zap, FileText, Sparkles, ArrowRight } from "lucide-react"

export default function DashboardContent() {
  return (
    <div>
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-gray-400 mt-2 text-lg">
          Overview of your AI-generated sales pages.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            label: "Pages Generated",
            value: "12",
            sub: "+3 this week",
            icon: FileText,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            label: "Conversion Rate",
            value: "4.8%",
            sub: "+0.5% from last month",
            icon: TrendingUp,
            color: "text-green-600 dark:text-green-400",
            bg: "bg-green-50 dark:bg-green-900/20",
          },
          {
            label: "AI Credits",
            value: "2,450",
            sub: "Resets monthly",
            icon: Zap,
            color: "text-yellow-600 dark:text-yellow-400",
            bg: "bg-yellow-50 dark:bg-yellow-900/20",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`${stat.bg} px-3 py-1 rounded-full`}>
                <span className={`text-xs font-bold ${stat.color}`}>
                  {stat.sub}
                </span>
              </div>
            </div>
            <p className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              {stat.value}
            </p>
            <p className="text-base font-semibold text-slate-600 dark:text-gray-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/generate"
          className="bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 rounded-3xl p-8 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-2xl hover:shadow-yellow-50 dark:hover:shadow-yellow-900/10 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-50 dark:from-yellow-900/10 to-transparent rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative">
            <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-yellow-100 dark:border-yellow-800/30">
              <Sparkles className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Generate New Sales Page
            </h3>
            <p className="text-slate-500 dark:text-gray-400 leading-relaxed mb-6 text-base">
              Fill in product details and let AI create a high-converting sales page with your choice of 3 premium templates.
            </p>
            <span className="inline-flex items-center gap-2 text-base font-bold text-yellow-600 dark:text-yellow-400 group-hover:gap-3 transition-all">
              Start Generating
              <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </Link>

        <Link
          href="/history"
          className="bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 rounded-3xl p-8 hover:border-slate-400 dark:hover:border-gray-600 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 dark:from-gray-800/20 to-transparent rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative">
            <div className="w-16 h-16 bg-slate-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-gray-700">
              <History className="w-8 h-8 text-slate-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              View History
            </h3>
            <p className="text-slate-500 dark:text-gray-400 leading-relaxed mb-6 text-base">
              Browse, search, preview, download, and manage all your previously generated sales pages.
            </p>
            <span className="inline-flex items-center gap-2 text-base font-bold text-slate-600 dark:text-gray-300 group-hover:gap-3 transition-all">
              View All Pages
              <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}