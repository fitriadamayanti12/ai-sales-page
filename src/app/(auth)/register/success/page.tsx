// src/app/(auth)/register/success/page.tsx
import Link from "next/link"
import { Mail, Sparkles, ArrowRight, CheckCircle } from "lucide-react"

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-black/[0.03] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-black/[0.04] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg relative z-20">
        <div className="bg-white backdrop-blur-2xl border border-slate-200 rounded-3xl p-10 shadow-2xl shadow-slate-200/60 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-5 rounded-3xl shadow-lg shadow-yellow-500/30">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Check Your Email!
          </h1>
          <p className="text-slate-500 text-lg mb-4 leading-relaxed">
            We&apos;ve sent a verification link to your email address.
          </p>
          <p className="text-slate-400 text-sm mb-10 leading-relaxed">
            Click the link in the email to activate your account. If you don&apos;t see it, check your spam folder.
          </p>

          {/* Resend button (placeholder) */}
          <button
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition mb-4"
          >
            <Mail className="w-4 h-4" />
            Resend verification email
          </button>

          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-3 py-3.5 rounded-2xl text-base font-semibold text-white transition-all hover:scale-[1.01]"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              boxShadow: "0 8px 24px rgba(251, 191, 36, 0.35)",
            }}
          >
            Go to Login
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}