"use client"

import { useState } from "react"
import { login } from "@/actions/auth"
import Link from "next/link"
import { Loader2, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react"

export default function LoginForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="bg-white backdrop-blur-2xl border border-slate-200 rounded-3xl p-10 shadow-2xl shadow-slate-200/60">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            boxShadow: "0 12px 32px rgba(251, 191, 36, 0.35)",
          }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-slate-900 text-center mb-2 tracking-tight">
        Welcome Back
      </h1>
      <p className="text-slate-500 text-center mb-10 text-base">
        Login to your account
      </p>

      <form action={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-50 transition text-base"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-50 transition text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-4 rounded-2xl font-medium">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 py-3.5 rounded-2xl text-base font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          style={{
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            boxShadow: "0 8px 24px rgba(251, 191, 36, 0.35)",
          }}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <p className="text-slate-500 text-center mt-8 text-base">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-yellow-600 hover:text-yellow-700 font-semibold transition"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}