import React, { useState } from 'react'
import { ShieldCheck, Lock, Mail, KeyRound, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { setDemoAdminAuthenticated } from '../../services/storageService'

interface AdminLoginModalProps {
  onSuccess: () => void
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const DEMO_EMAIL = 'demo@shreemangalmurti.in'
  const DEMO_PASS = 'Demo@123'

  const handleFillDemo = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASS)
    setError('')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase() && password === DEMO_PASS) {
      setDemoAdminAuthenticated(true)
      onSuccess()
    } else {
      setError('Invalid demo credentials. Please click "Auto-fill Demo Credentials" below.')
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center p-4 relative">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#C5A059]/40 z-10">
        
        {/* Top Emblem */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#800020] to-[#5B0E1E] text-[#DFBF77] flex items-center justify-center shadow-lg border border-[#C5A059]/50 mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <Sparkles className="w-3 h-3 text-amber-700" />
            Client Presentation Mode
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#27272A]">
            Venue Owner Portal
          </h2>
          <p className="text-xs text-[#71717A] mt-1">
            Sign in to access booking enquiries, calendar availability, and venue management.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="bg-[#FAF7F2] border border-[#C5A059]/40 rounded-2xl p-4 mb-6 text-xs text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[#800020] uppercase text-[10px] tracking-wider">
              Demo Credentials
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-[#800020] hover:text-[#5B0E1E] underline cursor-pointer"
            >
              Auto-fill Credentials
            </button>
          </div>
          <div className="font-mono text-xs space-y-1 text-[#27272A]">
            <div>User: <strong className="text-[#800020]">{DEMO_EMAIL}</strong></div>
            <div>Pass: <strong className="text-[#800020]">{DEMO_PASS}</strong></div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={DEMO_EMAIL}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Demo Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#800020] to-[#9B1B30] hover:from-[#5B0E1E] hover:to-[#800020] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <KeyRound className="w-4 h-4 text-[#DFBF77]" />
            <span>Access Admin Dashboard</span>
          </button>
        </form>

        {/* Back to Homepage */}
        <div className="mt-6 pt-4 border-t border-[#F5EFEB] text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] hover:text-[#800020] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>
        </div>

        {/* Security Disclaimer Notice */}
        <div className="mt-4 text-[10px] text-[#A1A1AA] text-center leading-relaxed">
          * Notice: This is a client presentation prototype authentication gate. No sensitive credentials or customer data are stored.
        </div>

      </div>
    </div>
  )
}
