// src/app/auth/callback/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const code = params.code as string

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      redirect('/dashboard')
    }
  }

  // Kalau ga ada code atau error, tampilin halaman sukses
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-black/[0.04] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg relative z-20">
        <div className="bg-white backdrop-blur-2xl border border-slate-200 rounded-3xl p-10 shadow-2xl shadow-slate-200/60 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-5 rounded-3xl shadow-lg shadow-green-500/30">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Email Verified!
          </h1>
          <p className="text-slate-500 text-lg mb-10">
            Your account has been successfully activated.
          </p>

          <Link
            href="/dashboard"
            className="w-full inline-flex items-center justify-center gap-3 py-3.5 rounded-2xl text-base font-semibold text-white transition-all hover:scale-[1.01]"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              boxShadow: "0 8px 24px rgba(251, 191, 36, 0.35)",
            }}
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}