import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Building2, 
  RotateCcw, 
  ExternalLink, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  X
} from 'lucide-react'
import { VenueSettings } from '../../types/booking'
import { resetToDefaultDemoData } from '../../services/storageService'

interface AdminHeaderProps {
  settings: VenueSettings
  onLogout: () => void
  onDataReset: () => void
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ settings, onLogout, onDataReset }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleConfirmReset = () => {
    resetToDefaultDemoData()
    setShowResetConfirm(false)
    onDataReset()
  }

  return (
    <>
      <header className="bg-[#4A0814] text-[#FAF3E1] border-b-2 border-[#C5A059] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Venue Brand & Demo Badge */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#800020] border border-[#C5A059]/50 flex items-center justify-center text-[#DFBF77] font-royal font-bold text-lg">
                ॐ
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                    {settings.venueName}
                  </h1>
                  
                  {/* Highly visible DEMO MODE Badge */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-900 font-bold text-[10px] tracking-wider uppercase shadow-sm">
                    <Sparkles className="w-3 h-3 text-stone-900" />
                    DEMO MODE — Sample Data
                  </span>
                </div>
                <p className="text-xs text-[#DFBF77] hidden sm:block">
                  Manager & Owner Administration Console
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              
              {/* Reset Demo Data Button */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#DFBF77] bg-[#800020] hover:bg-[#5B0E1E] border border-[#C5A059]/40 transition-colors cursor-pointer"
                title="Reset all bookings, blocked dates and settings to original demo data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Demo Data</span>
                <span className="sm:hidden">Reset</span>
              </button>

              {/* View Public Website */}
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                title="Open public website in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#DFBF77]" />
                <span className="hidden sm:inline">View Public Website</span>
                <span className="sm:hidden">Site</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-200 bg-rose-900/60 hover:bg-rose-900 border border-rose-700/50 transition-colors cursor-pointer"
                title="Sign out of demo console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-300 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#27272A] mb-2">
              Reset Demo Records?
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] mb-6 leading-relaxed">
              This will restore all enquiries, confirmed bookings, blocked dates, and venue settings back to the initial sample presentation state. Any new test bookings you submitted will be cleared.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#52525B] hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs sm:text-sm font-semibold text-white shadow-md cursor-pointer"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
