// src/app/page.tsx
import Link from "next/link"
import { Sparkles, ArrowRight, Star, Zap, Palette, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Nav */}
      <nav className="border-b border-black/[0.04] sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/logo.svg" alt="SalesAI" className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              SalesAI
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/login"
              className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition text-xs md:text-sm font-semibold px-2 py-1"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-100 text-white dark:text-slate-900 px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition shadow-lg shadow-slate-900/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-28 pb-12 md:pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full px-3 md:px-5 py-2 md:py-2.5 mb-6 md:mb-10 text-xs md:text-sm font-semibold bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800">
          <Zap className="w-3 md:w-4 h-3 md:h-4 text-yellow-500" />
          <span className="text-slate-600 dark:text-gray-300">Powered by AI</span>
          <span className="text-slate-300 dark:text-gray-600">•</span>
          <span className="text-slate-500 dark:text-gray-400">Llama 3.3 70B</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[80px] font-extrabold text-slate-950 dark:text-white mb-4 md:mb-6 leading-[1.08] tracking-tight">
          Build{" "}
          <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            High-Converting
          </span>
          <br />
          Sales Pages with AI
        </h1>

        <p className="text-base md:text-xl lg:text-2xl text-slate-500 dark:text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium px-2">
          Transform raw product details into stunning, structured sales pages that convert visitors into customers.
          Powered by AI and premium design. No coding required.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-16 md:mb-24">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 md:py-5 rounded-2xl text-base md:text-lg font-bold text-white transition-all hover:scale-[1.02] shadow-xl"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)",
              boxShadow: "0 12px 36px rgba(251, 191, 36, 0.35)",
            }}
          >
            Start Generating Free
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-10 py-3.5 md:py-5 rounded-2xl text-base md:text-lg font-semibold text-slate-700 dark:text-gray-300 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 hover:shadow-lg transition-all"
          >
            View Demo
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md md:max-w-2xl mx-auto mb-16 md:mb-24 pb-12 md:pb-20 border-b border-slate-200 dark:border-gray-800">
          {[
            { icon: Users, number: "10K+", label: "Pages Generated" },
            { icon: TrendingUp, number: "3", label: "Templates" },
            { icon: Star, number: "98%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-5 md:w-6 h-5 md:h-6 text-yellow-500 mx-auto mb-2 md:mb-3" />
              <div className="text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white mb-0.5 md:mb-1">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-slate-500 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-3 md:mb-4 tracking-tight">
          Everything You Need
        </h2>
        <p className="text-base md:text-lg text-slate-500 dark:text-gray-400 mb-10 md:mb-16 max-w-2xl mx-auto">
          Built for speed, designed for conversion.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-16 md:mb-24">
          {[
            {
              icon: Sparkles,
              title: "3 Premium Templates",
              desc: "Modern Glass, Dark Luxury, and Minimalist — each designed for different brand personalities.",
              color: "#f59e0b",
              bg: "rgba(245,158,11,0.08)",
            },
            {
              icon: Zap,
              title: "AI-Powered Copy",
              desc: "Llama 3.3 generates persuasive, conversion-focused copy tailored to your audience.",
              color: "#3b82f6",
              bg: "rgba(59,130,246,0.08)",
            },
            {
              icon: Palette,
              title: "Export & Download",
              desc: "Download your sales page as standalone HTML with all styles included. Ready to publish.",
              color: "#ec4899",
              bg: "rgba(236,72,153,0.08)",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 text-left hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-12 md:w-14 h-12 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-5"
                style={{ background: feature.bg }}
              >
                <feature.icon className="w-6 md:w-7 h-6 md:h-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-slate-950 dark:text-white mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Templates Preview */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-3 md:mb-4 tracking-tight">
          Choose Your Style
        </h2>
        <p className="text-base md:text-lg text-slate-500 dark:text-gray-400 mb-10 md:mb-16 max-w-2xl mx-auto">
          Three distinct templates. One powerful AI engine.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-16 md:mb-24">
          {[
            {
              name: "Modern Glass",
              desc: "Energetic, conversational, perfect for SaaS & tech products.",
              gradient: "from-blue-400 via-purple-500 to-pink-500",
              tag: "Popular",
            },
            {
              name: "Dark Luxury",
              desc: "Sophisticated, exclusive, ideal for premium & high-end brands.",
              gradient: "from-yellow-500 via-amber-600 to-orange-700",
              tag: "Premium",
            },
            {
              name: "Minimalist",
              desc: "Clean, direct, Apple-style simplicity for modern brands.",
              gradient: "from-slate-700 via-slate-800 to-slate-900",
              tag: "Clean",
            },
          ].map((tpl, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-24 md:h-32 bg-gradient-to-br ${tpl.gradient}`} />
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <h3 className="text-base md:text-lg font-extrabold text-slate-950 dark:text-white">
                    {tpl.name}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                    {tpl.tag}
                  </span>
                </div>
                <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 font-medium">
                  {tpl.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bottom */}
        <div className="rounded-2xl md:rounded-3xl p-8 md:p-16 max-w-4xl mx-auto text-center bg-slate-900 dark:bg-slate-800">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 md:mb-4 tracking-tight">
            Ready to Build Your Sales Page?
          </h2>
          <p className="text-sm md:text-lg text-slate-400 mb-6 md:mb-10 max-w-xl mx-auto">
            Join 10,000+ marketers and founders who use AI to create high-converting sales pages.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 md:py-5 rounded-2xl text-base md:text-lg font-bold text-black transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              boxShadow: "0 8px 32px rgba(251, 191, 36, 0.4)",
            }}
          >
            Start Free Now
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-gray-800 py-8 md:py-12 text-center">
        <p className="text-sm text-slate-400 dark:text-gray-500 font-medium">
          © 2026 SalesAI. Built with Next.js, Supabase & Groq AI.
        </p>
      </footer>
    </div>
  )
}