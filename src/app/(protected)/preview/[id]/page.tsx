// src/app/(protected)/preview/[id]/page.tsx
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, Eye, Sparkles, CheckCircle, Star } from "lucide-react"

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Fetch dari Supabase
  const { data: page, error } = await supabase
    .from("sales_pages")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !page) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-slate-500 mb-8">The sales page you're looking for doesn't exist.</p>
        <Link href="/history" className="text-yellow-600 font-semibold hover:text-yellow-700">
          ← Back to History
        </Link>
      </div>
    )
  }

  const content = page.generated_content

  // Tentukan template style
  const isLuxury = page.template_style === "luxury"
  const isMinimal = page.template_style === "minimal"
  const isModern = page.template_style === "modern" || (!isLuxury && !isMinimal)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Back to History</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium">
            Template: <span className="text-slate-900 font-bold capitalize">{page.template_style}</span>
          </span>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/80 overflow-hidden border border-slate-200">
        {/* Browser Bar */}
        <div className="bg-slate-100 px-6 py-3 flex items-center gap-2 border-b border-slate-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4 bg-white rounded-lg px-4 py-1 text-xs text-slate-400 text-center">
            {page.product_name} — Sales Page Preview
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-200 transition text-slate-500">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sales Page Content */}
        <div className={`p-10 md:p-16 ${isLuxury ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white" : isMinimal ? "bg-white" : "bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"}`}>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight ${isLuxury ? "text-yellow-400 font-playfair" : "text-slate-900"
              }`}>
              {content.headline}
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed font-medium ${isLuxury ? "text-gray-300" : "text-slate-600"
              }`}>
              {content.subheadline}
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-xl shadow-yellow-500/30 hover:scale-[1.02]">
              {content.heroCta}
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          {/* Benefits Section */}
          <div className={`grid md:grid-cols-3 gap-6 mb-16`}>
            {content.benefits?.map((benefit: any, i: number) => (
              <div key={i} className={`p-8 rounded-2xl ${isLuxury
                  ? "bg-white/5 border border-white/10 backdrop-blur"
                  : isMinimal
                    ? "bg-slate-50 border border-slate-100"
                    : "bg-white border border-slate-200 shadow-lg shadow-slate-200/50"
                }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isLuxury ? "bg-yellow-500/20" : "bg-yellow-50"
                  }`}>
                  <CheckCircle className={`w-6 h-6 ${isLuxury ? "text-yellow-400" : "text-yellow-600"}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isLuxury ? "text-white" : "text-slate-900"}`}>
                  {benefit.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isLuxury ? "text-gray-400" : "text-slate-600"}`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className={`rounded-3xl p-10 mb-16 ${isLuxury ? "bg-white/5 border border-white/10" : "bg-white border border-slate-200 shadow-lg"
            }`}>
            <h2 className={`text-2xl font-bold mb-8 text-center ${isLuxury ? "text-white" : "text-slate-900"}`}>
              Powerful Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.features?.map((feature: any, i: number) => (
                <div key={i} className="text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-3 ${isLuxury ? "bg-yellow-500" : "bg-yellow-400"}`} />
                  <h4 className={`font-bold mb-1 ${isLuxury ? "text-white" : "text-slate-900"}`}>
                    {feature.name}
                  </h4>
                  <p className={`text-sm ${isLuxury ? "text-gray-400" : "text-slate-500"}`}>
                    {feature.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          {content.socialProof && (
            <div className={`text-center mb-16 p-10 rounded-3xl ${isLuxury ? "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20" : "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100"
              }`}>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <blockquote className={`text-lg md:text-xl font-medium mb-4 italic ${isLuxury ? "text-gray-300" : "text-slate-700"}`}>
                "{content.socialProof.quote}"
              </blockquote>
              <p className={`font-bold ${isLuxury ? "text-white" : "text-slate-900"}`}>
                {content.socialProof.author}
              </p>
              <p className={`text-sm ${isLuxury ? "text-gray-400" : "text-slate-500"}`}>
                {content.socialProof.role}
              </p>
            </div>
          )}

          {/* Pricing */}
          {content.pricing && (
            <div className={`text-center mb-16 p-10 rounded-3xl ${isLuxury ? "bg-white/5 border border-white/10" : isMinimal ? "bg-slate-50 border border-slate-200" : "bg-white border-2 border-yellow-400 shadow-xl shadow-yellow-50"
              }`}>
              <h2 className={`text-2xl font-bold mb-6 ${isLuxury ? "text-white" : "text-slate-900"}`}>
                Start Today
              </h2>
              <p className={`text-5xl font-extrabold mb-2 ${isLuxury ? "text-yellow-400" : "text-slate-900"}`}>
                {content.pricing.price}
              </p>
              <p className={`mb-4 ${isLuxury ? "text-gray-400" : "text-slate-500"}`}>
                {content.pricing.billing}
              </p>
              <p className={`text-sm font-medium mb-8 ${isLuxury ? "text-green-400" : "text-green-600"}`}>
                ✅ {content.pricing.guarantee}
              </p>
            </div>
          )}

          {/* Final CTA */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold px-12 py-5 rounded-2xl text-xl transition-all shadow-xl shadow-yellow-500/30 hover:scale-[1.02]">
              {content.finalCta || "Get Started Now"}
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8">
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 rounded-2xl px-6 py-3 text-slate-700 font-semibold hover:border-yellow-400 hover:shadow-lg transition"
        >
          <Sparkles className="w-4 h-4" />
          Generate Another
        </Link>
        <a
          href={`/api/download/${id}`}
          className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-2xl px-8 py-3 font-bold hover:bg-slate-800 transition shadow-lg"
        >
          <Download className="w-4 h-4" />
          Download HTML
        </a>

      </div>
    </div>
  )
}