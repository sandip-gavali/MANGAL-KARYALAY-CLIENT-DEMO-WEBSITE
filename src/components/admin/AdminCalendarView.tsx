import React, { useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Users, 
  Phone, 
  Eye, 
  AlertCircle
} from 'lucide-react'
import { BookingEnquiry, BlockedDate, VenueSettings } from '../../types/booking'
import { 
  formatDateToYYYYMMDD, 
  parseYYYYMMDD, 
  getTodayDateString, 
  formatIndianDate, 
  getDaysInMonth, 
  getFirstDayOfMonth,
  isPastDate
} from '../../utils/dateUtils'
import { AdminBookingDetailsModal } from './AdminBookingDetailsModal'

interface AdminCalendarViewProps {
  bookings: BookingEnquiry[]
  blockedDates: BlockedDate[]
  settings: VenueSettings
  onBlockDate: (date: string, reason: string) => { success: boolean; message: string }
  onUnblockDate: (date: string) => { success: boolean; message: string }
  onConfirm: (id: string) => void
  onReject: (id: string) => void
  onCancelConfirmed: (id: string, reason: string) => void
  onUpdateNotes: (id: string, notes: string) => void
}

export const AdminCalendarView: React.FC<AdminCalendarViewProps> = ({
  bookings,
  blockedDates,
  settings,
  onBlockDate,
  onUnblockDate,
  onConfirm,
  onReject,
  onCancelConfirmed,
  onUpdateNotes,
}) => {
  const todayStr = getTodayDateString()
  const todayParsed = parseYYYYMMDD(todayStr)

  // Current calendar view month and year
  const [currentYear, setCurrentYear] = useState<number>(todayParsed.year)
  const [currentMonth, setCurrentMonth] = useState<number>(todayParsed.month)
  const [selectedDate, setSelectedDate] = useState<string>(todayStr)

  // Quick Block Date form state
  const [blockReason, setBlockReason] = useState('')
  const [blockError, setBlockError] = useState('')
  const [blockSuccess, setBlockSuccess] = useState('')

  // Modal details
  const [inspectBooking, setInspectBooking] = useState<BookingEnquiry | null>(null)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleGoToToday = () => {
    setCurrentYear(todayParsed.year)
    setCurrentMonth(todayParsed.month)
    setSelectedDate(todayStr)
  }

  // Days calculations
  const totalDays = getDaysInMonth(currentYear, currentMonth)
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth) // 0 is Sunday

  // Group bookings and blocked dates by dateStr
  const confirmedByDate: Record<string, BookingEnquiry> = {}
  const pendingByDate: Record<string, BookingEnquiry[]> = {}
  bookings.forEach(b => {
    if (b.status === 'confirmed') {
      confirmedByDate[b.eventDate] = b
    } else if (b.status === 'pending') {
      if (!pendingByDate[b.eventDate]) pendingByDate[b.eventDate] = []
      pendingByDate[b.eventDate].push(b)
    }
  })

  const blockedByDate: Record<string, BlockedDate> = {}
  blockedDates.forEach(b => {
    blockedByDate[b.date] = b
  })

  // Selected date status
  const selectedConfirmed = confirmedByDate[selectedDate]
  const selectedPending = pendingByDate[selectedDate] || []
  const selectedBlocked = blockedByDate[selectedDate]
  const isSelectedPast = isPastDate(selectedDate)

  const handleQuickBlock = (e: React.FormEvent) => {
    e.preventDefault()
    setBlockError('')
    setBlockSuccess('')
    if (!blockReason.trim()) {
      setBlockError('Please provide a reason for blocking this date.')
      return
    }

    const res = onBlockDate(selectedDate, blockReason)
    if (res.success) {
      setBlockSuccess(res.message)
      setBlockReason('')
      setTimeout(() => setBlockSuccess(''), 3000)
    } else {
      setBlockError(res.message)
    }
  }

  const handleQuickUnblock = () => {
    setBlockError('')
    setBlockSuccess('')
    const res = onUnblockDate(selectedDate)
    if (res.success) {
      setBlockSuccess(res.message)
      setTimeout(() => setBlockSuccess(''), 3000)
    } else {
      setBlockError(res.message)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Calendar Grid (Col 1 to 8) */}
      <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#C5A059]/25">
        
        {/* Calendar Navigation Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#27272A] tracking-tight">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <p className="text-xs text-[#71717A]">
              Click any date to inspect bookings, confirm requests, or manage date blocks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToToday}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#800020] bg-[#800020]/10 hover:bg-[#800020]/20 transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs mb-6 p-3 bg-stone-50 rounded-2xl border border-stone-200/60">
          <div className="flex items-center gap-1.5 font-medium text-stone-700">
            <span className="w-3 h-3 rounded-full bg-[#800020]" />
            <span>Confirmed Booking</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-stone-700">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Pending Enquiry</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-stone-700">
            <span className="w-3 h-3 rounded-full bg-stone-700" />
            <span>Blocked Date</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-stone-700">
            <span className="w-3 h-3 rounded-full border-2 border-emerald-500 bg-emerald-50" />
            <span>Open & Available</span>
          </div>
        </div>

        {/* Calendar Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-stone-500 mb-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Calendar Days Matrix */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Empty prefix cells */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[70px] sm:min-h-[85px] bg-stone-50/40 rounded-xl" />
          ))}

          {/* Month Day Cells */}
          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1
            const cellDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
            const isToday = cellDateStr === todayStr
            const isSelected = cellDateStr === selectedDate
            const hasConfirmed = confirmedByDate[cellDateStr]
            const hasBlocked = blockedByDate[cellDateStr]
            const pendingList = pendingByDate[cellDateStr] || []
            const isPast = isPastDate(cellDateStr)

            return (
              <div
                key={cellDateStr}
                onClick={() => setSelectedDate(cellDateStr)}
                className={`min-h-[70px] sm:min-h-[85px] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected 
                    ? 'ring-2 ring-[#800020] border-[#800020] shadow-md bg-[#FAF7F2]' 
                    : 'border-stone-200 hover:border-[#C5A059] hover:bg-stone-50/70 bg-white'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${
                    isToday 
                      ? 'w-5 h-5 rounded-full bg-[#800020] text-white flex items-center justify-center text-[10px]' 
                      : isPast
                      ? 'text-stone-400'
                      : 'text-stone-800'
                  }`}>
                    {dayNum}
                  </span>

                  {isToday && (
                    <span className="hidden sm:inline text-[9px] font-bold text-[#800020] uppercase">
                      Today
                    </span>
                  )}
                </div>

                {/* Day Content Badges */}
                <div className="space-y-1 mt-1">
                  {hasConfirmed && (
                    <div className="px-1.5 py-0.5 rounded bg-[#800020] text-white text-[9px] sm:text-[10px] font-semibold truncate flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DFBF77]" />
                      <span className="truncate">{hasConfirmed.fullName.split(' ')[0]} ({hasConfirmed.eventType})</span>
                    </div>
                  )}

                  {hasBlocked && (
                    <div className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 text-[9px] sm:text-[10px] font-semibold truncate flex items-center gap-1">
                      <ShieldAlert className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">Blocked</span>
                    </div>
                  )}

                  {pendingList.length > 0 && !hasConfirmed && (
                    <div className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[9px] sm:text-[10px] font-semibold truncate flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-amber-700 flex-shrink-0" />
                      <span className="truncate">{pendingList.length} Pending</span>
                    </div>
                  )}

                  {!hasConfirmed && !hasBlocked && pendingList.length === 0 && !isPast && (
                    <div className="hidden sm:block text-[9px] text-emerald-700 font-medium pl-0.5">
                      • Open
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* Selected Date Details Panel (Col 9 to 12) */}
      <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-md border border-[#C5A059]/30 sticky top-20">
        
        <div className="pb-4 border-b border-stone-200 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#800020] uppercase tracking-wider mb-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Selected Date Schedule</span>
          </div>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#27272A]">
            {formatIndianDate(selectedDate)}
          </h4>
          <span className="text-xs text-stone-500">
            {selectedDate === todayStr ? 'Today\'s Schedule' : isSelectedPast ? 'Past Date' : 'Upcoming Schedule'}
          </span>
        </div>

        {/* Feedback alerts */}
        {blockSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{blockSuccess}</span>
          </div>
        )}
        {blockError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{blockError}</span>
          </div>
        )}

        {/* 1. Confirmed Booking on Selected Date */}
        {selectedConfirmed && (
          <div className="mb-6 p-4 rounded-2xl bg-[#800020]/8 border border-[#800020]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#800020] text-white px-2 py-0.5 rounded">
                Confirmed Event
              </span>
              <span className="font-mono text-xs font-bold text-[#800020]">
                {selectedConfirmed.id}
              </span>
            </div>

            <div>
              <h5 className="font-bold text-base text-stone-900">
                {selectedConfirmed.fullName}
              </h5>
              <p className="text-xs text-stone-600">
                {selectedConfirmed.eventType} • {selectedConfirmed.guestCount} Guests
              </p>
              <p className="text-xs font-mono text-stone-600 mt-1">
                +91 {selectedConfirmed.mobile}
              </p>
            </div>

            <button
              onClick={() => setInspectBooking(selectedConfirmed)}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-[#800020] hover:bg-[#5B0E1E] text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Booking Details</span>
            </button>
          </div>
        )}

        {/* 2. Blocked Date on Selected Date */}
        {selectedBlocked && (
          <div className="mb-6 p-4 rounded-2xl bg-stone-100 border border-stone-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-800 text-white px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                Date Blocked
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase block">
                Reason for Block:
              </span>
              <p className="text-xs font-medium text-stone-900 mt-0.5">
                "{selectedBlocked.reason}"
              </p>
            </div>

            <button
              onClick={handleQuickUnblock}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-200 text-stone-800 border border-stone-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Unblock This Date</span>
            </button>
          </div>
        )}

        {/* 3. Pending Requests on Selected Date */}
        {selectedPending.length > 0 && (
          <div className="mb-6 space-y-3">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              Pending Requests ({selectedPending.length})
            </span>

            {selectedPending.map(p => (
              <div key={p.id} className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{p.fullName}</span>
                  <span className="font-mono text-[10px] text-[#800020]">{p.id}</span>
                </div>
                <div className="text-stone-600">
                  {p.eventType} • {p.guestCount} Guests • +91 {p.mobile}
                </div>
                
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onConfirm(p.id)}
                    className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-center"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => onReject(p.id)}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. If Available & Not Past: Allow Blocking Date */}
        {!selectedConfirmed && !selectedBlocked && !isSelectedPast && (
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>This date is currently open & available.</span>
            </div>

            <form onSubmit={handleQuickBlock} className="space-y-2 pt-2 border-t border-emerald-200/60">
              <label className="block text-[11px] font-bold text-stone-700 uppercase">
                Block this date for maintenance / private use:
              </label>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Reason (e.g. Hall painting, AC service)"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#800020]/20"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl text-xs font-semibold text-white bg-stone-800 hover:bg-stone-900 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Block {formatIndianDate(selectedDate)}</span>
              </button>
            </form>
          </div>
        )}

        {isSelectedPast && !selectedConfirmed && !selectedBlocked && (
          <div className="p-4 rounded-2xl bg-stone-100 text-stone-500 text-xs text-center">
            This date has already passed.
          </div>
        )}

      </div>

      {/* Modal Inspector */}
      {inspectBooking && (
        <AdminBookingDetailsModal
          booking={inspectBooking}
          settings={settings}
          onClose={() => setInspectBooking(null)}
          onConfirm={(id) => {
            onConfirm(id)
            setInspectBooking(prev => prev ? { ...prev, status: 'confirmed' } : null)
          }}
          onReject={(id) => {
            onReject(id)
            setInspectBooking(prev => prev ? { ...prev, status: 'rejected' } : null)
          }}
          onCancelConfirmed={(id, reason) => {
            onCancelConfirmed(id, reason)
            setInspectBooking(prev => prev ? { ...prev, status: 'rejected' } : null)
          }}
          onUpdateNotes={(id, notes) => {
            onUpdateNotes(id, notes)
            setInspectBooking(prev => prev ? { ...prev, notes } : null)
          }}
        />
      )}

    </div>
  )
}
