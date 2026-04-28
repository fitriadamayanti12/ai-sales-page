import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded-2xl shadow-lg shadow-yellow-500/20">
            <Sparkles className="w-8 h-8 text-black" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">AI Sales Page Generator</h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          Transform your product information into stunning, high-converting sales pages with AI.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl transition inline-flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/register" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition border border-white/20">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}