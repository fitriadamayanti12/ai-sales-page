// src/components/layout/ProtectedHeader.tsx
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default async function ProtectedHeader() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header
      className="border-b border-black/[0.04] sticky top-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <img src="/logo.svg" alt="SalesAI" className="w-9 h-9" />
          <span className="text-lg font-bold text-slate-900">SalesAI</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-slate-600 hover:text-slate-900 transition text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/generate"
              className="text-slate-600 hover:text-slate-900 transition text-sm font-medium"
            >
              Generate
            </Link>
            <Link
              href="/history"
              className="text-slate-600 hover:text-slate-900 transition text-sm font-medium"
            >
              History
            </Link>
          </nav>

          {/* User section */}
          <div className="flex items-center gap-4 pl-6 border-l border-black/[0.08]">
            <span className="text-slate-500 text-sm">{user?.email}</span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}