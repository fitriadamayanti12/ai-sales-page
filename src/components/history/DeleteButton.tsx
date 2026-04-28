// src/components/history/DeleteButton.tsx
"use client"

import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DeleteButton({ pageId }: { pageId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Delete this sales page? This action cannot be undone.")) {
      return
    }

    try {
      const res = await fetch(`/api/delete/${pageId}`, { method: "POST" })
      
      if (res.ok) {
        toast.success("Sales page deleted successfully!")
        router.refresh()
      } else {
        toast.error("Failed to delete. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="p-2.5 rounded-xl hover:bg-red-50 transition text-slate-400 hover:text-red-500"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}