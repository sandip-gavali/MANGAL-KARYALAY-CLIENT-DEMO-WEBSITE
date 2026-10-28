import React, { useState } from 'react'
import { 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  HelpCircle 
} from 'lucide-react'
import { BlockedDate, BookingEnquiry } from '../../types/booking'
import { 
  formatIndianDate, 
  formatIndianDateTime, 
  getTodayDateString, 
  isPastDate 
} from '../../utils/dateUtils'

interface AdminDateBlockingProps {
  blockedDates: BlockedDate[]
  bookings: BookingEnquiry[]
  onBlockDate: (date: string, reason: string) => { success: boolean; message: string }
  onUnblockDate: (date: string) => { success: boolean; message: string }
}

export const AdminDateBlocking: React.FC<AdminDateBlockingProps> = ({
  blockedDates,
  bookings,
  onBlockDate,
  onUnblockDate,
}) => {
  const today = getTodayDateString()
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Check date conflict live before blocking
  const confirmedConflict = date 
    ? bookings.find(b => b.eventDate === date && b.status === 'confirmed') 
    : null

  const handleBlockSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!date) {
      setError('Please select a date to block.')
      return
    }

    if (isPastDate(date)) {
      setError('Cannot block past dates.')
      return
    }

    if (!reason.trim()) {
      setError('Please enter a reason for blocking this date.')
      return
    }

    if (confirmedConflict) {
      setError(`Cannot block ${formatIndianDate(date)}! It already has a confirmed booking for "${confirmedConflict.fullName}". Cancel that booking first.`)
      return
    }

    const res = onBlockDate(date, reason)
    if (res.success) {
      setSuccess(res.message)
      setDate('')
      setReason('')
      setTimeout(() => setSuccess(''), 4000)
    } else {
      setError(res.message)
    }
  }

  const handleUnblock = (dateToUnblock: string) => {
    setError('')
    setSuccess('')
    const res = onUnblockDate(dateToUnblock)
    if (res.success) {
      setSuccess(res.message)
      setTimeout(() => setSuccess(''), 4000)
    } else {
      setError(res.message)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Block New Date Form (Col 1 to 5) */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#C5A059]/25">
        <div className="flex items-center gap-2.5 pb-4 border-b border-stone-200 mb-6">
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#27272A]">
              Block a Specific Date
            </h3>
            <p className="text-xs text-[#71717A]">
              Reserve dates for deep cleaning, renovations, or private family events.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleBlockSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Select Date to Block <span className="text-rose-600">*</span>
            </label>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setError('')
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
            />
          </div>

          {confirmedConflict && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <strong className="block font-bold mb-0.5">⚠️ Conflicting Confirmed Booking:</strong>
              This date already has a confirmed event for {confirmedConflict.fullName} ({confirmedConflict.eventType}). You cannot block it unless that booking is cancelled.
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Reason for Blocking <span className="text-rose-600">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                setError('')
              }}
              placeholder="e.g. Annual AC Servicing & Hall Deep Cleaning, Hall Owner Family Wedding, etc."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
            <span>
              Blocked dates become completely unavailable for customers checking availability on the public website.
            </span>
          </div>

          <button
            type="submit"
            disabled={!date || !reason.trim() || !!confirmedConflict}
            className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
              !date || !reason.trim() || !!confirmedConflict
                ? 'bg-stone-300 cursor-not-allowed opacity-60'
                : 'bg-stone-800 hover:bg-stone-900'
            }`}
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Save & Block Date</span>
          </button>
        </form>
      </div>

      {/* Blocked Dates List (Col 6 to 12) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#C5A059]/25">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#27272A]">
              Currently Blocked Dates ({blockedDates.length})
            </h3>
            <p className="text-xs text-[#71717A]">
              Dates actively marked unavailable on the public calendar.
            </p>
          </div>
        </div>

        {blockedDates.length === 0 ? (
          <div className="text-center py-12 text-stone-400 space-y-2">
            <ShieldAlert className="w-8 h-8 mx-auto text-stone-300" />
            <p className="text-sm font-medium text-stone-600">No dates are currently blocked.</p>
            <p className="text-xs text-stone-400">All upcoming dates without confirmed bookings are open for enquiry.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blockedDates.map((block) => (
              <div
                key={block.id}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#800020]" />
                      {formatIndianDate(block.date)}
                    </span>
                    <span className="font-mono text-[10px] text-stone-500 bg-stone-200 px-1.5 py-0.5 rounded">
                      {block.id}
                    </span>
                    {block.isDemoRecord && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">
                        Demo Record
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    "{block.reason}"
                  </p>
                  <span className="text-[10px] text-stone-400 block">
                    Blocked on {formatIndianDateTime(block.blockedAt)}
                  </span>
                </div>

                <button
                  onClick={() => handleUnblock(block.date)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-end sm:self-center"
                  title="Unblock this date and make it available again"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Unblock Date</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  )
}
