// src/components/generate/GenerateSkeleton.tsx
export default function GenerateSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="w-48 h-8 bg-slate-200 rounded-full mb-4 animate-pulse" />
        <div className="w-72 h-10 bg-slate-200 rounded-xl mb-2 animate-pulse" />
        <div className="w-96 h-6 bg-slate-100 rounded-lg animate-pulse" />
      </div>

      {/* Form skeleton */}
      <div className="space-y-5">
        {/* Product name */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse" />
            <div className="w-32 h-5 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          <div className="w-full h-12 bg-slate-50 rounded-xl animate-pulse" />
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse" />
            <div className="w-28 h-5 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          <div className="w-full h-28 bg-slate-50 rounded-xl animate-pulse" />
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-full h-20 bg-slate-50 rounded-xl animate-pulse" />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-full h-20 bg-slate-50 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Template */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-36 h-5 bg-slate-200 rounded-lg mb-4 animate-pulse" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-slate-50 rounded-xl animate-pulse" />
            <div className="h-24 bg-slate-50 rounded-xl animate-pulse" />
            <div className="h-24 bg-slate-50 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Submit button */}
        <div className="w-full h-14 bg-yellow-200 rounded-2xl animate-pulse flex items-center justify-center gap-3">
          <div className="w-5 h-5 bg-yellow-300 rounded-full animate-spin" />
          <span className="text-yellow-700 font-bold">Generating with AI...</span>
        </div>
      </div>
    </div>
  )
}