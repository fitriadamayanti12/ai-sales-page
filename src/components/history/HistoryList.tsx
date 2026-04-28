// src/components/history/HistoryList.tsx
import { createClient } from "@/lib/supabase/server"
import { Eye, Sparkles } from "lucide-react"
import Link from "next/link"
import DeleteButton from "./DeleteButton"

export default async function HistoryList() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: pages, error } = await supabase
    .from("sales_pages")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  const isEmpty = !pages || pages.length === 0

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight">
            Generation History
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 font-medium">
            {isEmpty
              ? "No pages generated yet."
              : `${pages?.length || 0} sales page${pages?.length !== 1 ? "s" : ""} generated`}
          </p>
        </div>
        <Link
          href="/generate"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-4 md:px-5 py-2.5 rounded-xl shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition text-sm md:text-base"
        >
          <Sparkles className="w-4 h-4" />
          New Page
        </Link>
      </div>

      {/* Empty State */}
      {isEmpty ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-dashed border-slate-200 dark:border-gray-800 p-8 md:p-16 text-center shadow-sm">
          <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm">
            <Sparkles className="w-8 md:w-10 h-8 md:h-10 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No pages yet
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 mb-6 md:mb-8 max-w-md mx-auto">
            Generate your first AI-powered sales page and it will appear here.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-5 md:px-6 py-2.5 md:py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-100 transition shadow-lg text-sm md:text-base"
          >
            <Sparkles className="w-4 h-4" />
            Create Your First Page
          </Link>
        </div>
      ) : (
        /* Table */
        <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/30">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-800/50">
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Template
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-right px-4 md:px-6 py-3 md:py-4 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
                {pages?.map((page) => {
                  const date = new Date(page.created_at)
                  const formattedDate = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  const formattedTime = date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })

                  return (
                    <tr
                      key={page.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-gray-800/50 transition group"
                    >
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-900/40 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white text-xs md:text-sm truncate max-w-[120px] md:max-w-[200px]">
                              {page.product_name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 truncate max-w-[120px] md:max-w-[200px] hidden sm:block">
                              {page.description?.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 md:px-6 py-3 md:py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 capitalize">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              page.template_style === "luxury"
                                ? "bg-yellow-500"
                                : page.template_style === "minimal"
                                ? "bg-slate-400"
                                : "bg-blue-500"
                            }`}
                          />
                          {page.template_style}
                        </span>
                      </td>

                      <td className="px-4 md:px-6 py-3 md:py-4 hidden lg:table-cell">
                        <p className="text-sm text-slate-600 dark:text-gray-300 font-medium">
                          {formattedDate}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-gray-500">
                          {formattedTime}
                        </p>
                      </td>

                      <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                        <div className="flex items-center justify-end gap-0.5 md:gap-1">
                          <Link
                            href={`/preview/${page.id}`}
                            className="p-2 md:p-2.5 rounded-lg md:rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition text-slate-400 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400"
                            title="Preview"
                          >
                            <Eye className="w-3.5 md:w-4 h-3.5 md:h-4" />
                          </Link>
                          <a
                            href={`/api/download/${page.id}`}
                            className="p-2 md:p-2.5 rounded-lg md:rounded-xl hover:bg-slate-100 dark:hover:bg-gray-800 transition text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 hidden sm:block"
                            title="Download HTML"
                          >
                            <svg
                              className="w-3.5 md:w-4 h-3.5 md:h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                          </a>
                          <DeleteButton pageId={page.id} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}