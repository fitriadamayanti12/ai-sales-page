// src/components/history/HistoryList.tsx
import { createClient } from "@/lib/supabase/server"
import { Eye, Sparkles, RotateCw } from "lucide-react"
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
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Generation History
          </h1>
          <p className="text-base text-slate-500 dark:text-gray-400 font-medium mt-1">
            {isEmpty
              ? "No pages generated yet."
              : `${pages?.length || 0} sales page${pages?.length !== 1 ? "s" : ""} generated`}
          </p>
        </div>
        <Link
          href="/generate"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-5 py-3 rounded-xl shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition text-base"
        >
          <Sparkles className="w-5 h-5" />
          New Page
        </Link>
      </div>

      {/* Empty State */}
      {isEmpty ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-gray-800 p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            No pages yet
          </h2>
          <p className="text-base text-slate-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Generate your first AI-powered sales page and it will appear here.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-100 transition shadow-lg text-base"
          >
            <Sparkles className="w-5 h-5" />
            Create Your First Page
          </Link>
        </div>
      ) : (
        /* Table */
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/30">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-800/50">
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider w-48">
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
                      {/* Product Name */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white text-base truncate max-w-[250px]">
                              {page.product_name}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 truncate max-w-[250px]">
                              {page.description?.substring(0, 80)}...
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Template */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 capitalize">
                          <span
                            className={`w-2 h-2 rounded-full ${
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

                      {/* Date */}
                      <td className="px-6 py-5">
                        <p className="text-base text-slate-700 dark:text-gray-200 font-semibold">
                          {formattedDate}
                        </p>
                        <p className="text-sm text-slate-400 dark:text-gray-500 mt-0.5">
                          {formattedTime}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          {/* Preview */}
                          <Link
                            href={`/preview/${page.id}`}
                            className="p-2.5 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition text-slate-400 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400"
                            title="Preview"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>

                          {/* Download */}
                          <a
                            href={`/api/download/${page.id}`}
                            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-800 transition text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300"
                            title="Download HTML"
                          >
                            <svg
                              className="w-5 h-5"
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

                          {/* Regenerate */}
                          <Link
                            href={`/generate?edit=${page.id}`}
                            className="p-2.5 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition text-slate-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400"
                            title="Regenerate"
                          >
                            <RotateCw className="w-5 h-5" />
                          </Link>

                          {/* Delete */}
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