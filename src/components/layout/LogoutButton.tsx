'use client'

import { logout } from '@/actions/auth'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </form>
  )
}