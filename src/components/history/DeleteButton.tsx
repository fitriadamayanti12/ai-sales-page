// src/components/history/DeleteButton.tsx
"use client"

import { useState } from "react"
import { Trash2, X, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DeleteButton({ pageId }: { pageId: string }) {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`/api/delete/${pageId}`, { method: "POST" })
      
      if (res.ok) {
        toast.success("Sales page deleted successfully!")
        setShowConfirm(false)
        router.refresh()
      } else {
        toast.error("Failed to delete. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition text-slate-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Custom Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
          
          {/* Dialog */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-500 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Delete Sales Page?
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                  This action cannot be undone. The sales page will be permanently removed from your history.
                </p>
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}