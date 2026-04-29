"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sparkles, ArrowRight, Loader2, Wand2, Target, Type, Tag, DollarSign, Star, RotateCw } from "lucide-react"
import { toast } from "sonner"
import GenerateSkeleton from "./GenerateSkeleton"

function GenerateFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")

  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    features: "",
    targetAudience: "",
    price: "",
    sellingPoints: "",
    template: "modern",
  })

  // Load existing data for editing/regenerating
  useEffect(() => {
    if (!editId) return

    async function loadPage() {
      setLoadingData(true)
      try {
        const res = await fetch(`/api/page/${editId}`)
        const result = await res.json()
        if (result.success) {
          const page = result.data
          setFormData({
            productName: page.product_name || "",
            description: page.description || "",
            features: Array.isArray(page.features)
              ? page.features.join(", ")
              : page.features || "",
            targetAudience: page.target_audience || "",
            price: page.price || "",
            sellingPoints: page.selling_points || "",
            template: page.template_style || "modern",
          })
          toast.info("Loaded existing page. Modify and regenerate!")
        }
      } catch (error) {
        toast.error("Failed to load page data.")
      } finally {
        setLoadingData(false)
      }
    }
    loadPage()
  }, [editId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (result.success) {
        toast.success(
          editId
            ? "Sales page regenerated successfully!"
            : "Sales page generated successfully!"
        )
        router.push(`/preview/${result.pageId}`)
      } else {
        toast.error(result.error || "Something went wrong. Please try again.")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Failed to connect. Please check your connection.")
      setLoading(false)
    }
  }

  // Loading state for fetching existing data
  if (loadingData) {
    return <GenerateSkeleton />
  }

  // Loading state for generating
  if (loading) {
    return <GenerateSkeleton />
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 rounded-full px-4 py-2 mb-4">
          {editId ? (
            <RotateCw className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          ) : (
            <Wand2 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          )}
          <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
            {editId
              ? "Regenerating with AI — Powered by Llama 3.3 70B"
              : "AI-Powered with Llama 3.3 70B"}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          {editId ? "Edit & Regenerate Sales Page" : "Create a Sales Page"}
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-lg font-medium">
          {editId
            ? "Modify the details below and generate a new version."
            : "Fill in your product details and let AI craft a high-converting sales page."}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg shadow-slate-200/80 dark:shadow-black/20 border border-slate-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2.5 rounded-xl">
              <Tag className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <label className="font-bold text-slate-900 dark:text-white">
              Product Name *
            </label>
          </div>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
            placeholder="e.g., AI Writing Assistant Pro"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 transition font-medium"
            required
          />
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg shadow-slate-200/80 dark:shadow-black/20 border border-slate-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-xl">
              <Type className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <label className="font-bold text-slate-900 dark:text-white">
              Description *
            </label>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe your product in detail..."
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 transition resize-none font-medium"
            required
          />
        </div>

        {/* Features & Target Audience */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg shadow-slate-200/80 dark:shadow-black/20 border border-slate-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-2.5 rounded-xl">
                <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <label className="font-bold text-slate-900 dark:text-white">
                Key Features
              </label>
            </div>
            <textarea
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              placeholder="AI writing, SEO optimization, Team collaboration..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 transition resize-none font-medium"
            />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg shadow-slate-200/80 dark:shadow-black/20 border border-slate-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 rounded-xl">
                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <label className="font-bold text-slate-900 dark:text-white">
                Target Audience
              </label>
            </div>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) =>
                setFormData({ ...formData, targetAudience: e.target.value })
              }
              placeholder="e.g., Small business owners"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 transition font-medium"
            />
          </div>
        </div>

        {/* Price & Selling Points */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg shadow-slate-200/80 dark:shadow-black/20 border border-slate-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-rose-50 dark:bg-rose-900/20 p-2.5 rounded-xl">
                <DollarSign className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <label className="font-bold text-slate-900 dark:text-white">
                Price
              </label>
            </div>
            <input
              type="text"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="e.g., $49/month"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 transition font-medium"
            />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg shadow-slate-200/80 dark:shadow-black/20 border border-slate-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2.5 rounded-xl">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <label className="font-bold text-slate-900 dark:text-white">
                Unique Selling Points
              </label>
            </div>
            <input
              type="text"
              value={formData.sellingPoints}
              onChange={(e) =>
                setFormData({ ...formData, sellingPoints: e.target.value })
              }
              placeholder="e.g., 50% faster, 24/7 support"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 transition font-medium"
            />
          </div>
        </div>

        {/* Template Selection */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg shadow-slate-200/80 dark:shadow-black/20 border border-slate-200 dark:border-gray-800">
          <label className="font-bold text-slate-900 dark:text-white mb-4 block">
            Choose Template
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                value: "modern",
                label: "Modern Glass",
                gradient: "from-blue-400 to-purple-500",
              },
              {
                value: "luxury",
                label: "Dark Luxury",
                gradient: "from-yellow-500 to-amber-700",
              },
              {
                value: "minimal",
                label: "Minimalist",
                gradient: "from-slate-400 to-slate-600",
              },
            ].map((tpl) => (
              <button
                key={tpl.value}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, template: tpl.value })
                }
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  formData.template === tpl.value
                    ? "border-yellow-400 dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 shadow-md"
                    : "border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600"
                }`}
              >
                <div
                  className={`w-full h-16 rounded-xl bg-gradient-to-br ${tpl.gradient} mb-3 shadow-sm`}
                />
                <span className="text-sm font-bold text-slate-700 dark:text-gray-300">
                  {tpl.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl text-lg font-bold text-white transition-all hover:scale-[1.01] disabled:opacity-50 shadow-xl"
          style={{
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            boxShadow: "0 12px 36px rgba(251, 191, 36, 0.4)",
          }}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              {editId ? "Regenerating..." : "Generating..."}
            </>
          ) : (
            <>
              {editId ? (
                <RotateCw className="w-6 h-6" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
              {editId ? "Regenerate Sales Page" : "Generate Sales Page"}
              <ArrowRight className="w-6 h-6" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default function GenerateForm() {
  return (
    <Suspense fallback={<GenerateSkeleton />}>
      <GenerateFormContent />
    </Suspense>
  )
}