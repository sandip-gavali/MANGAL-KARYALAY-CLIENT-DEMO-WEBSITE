import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  Users,
  Phone,
  MessageCircle,
  FileSpreadsheet
} from 'lucide-react'
import { BookingEnquiry, BookingStatus, EventType, VenueSettings } from '../../types/booking'
import { formatIndianDate, formatIndianDateTime } from '../../utils/dateUtils'
import { AdminBookingDetailsModal } from './AdminBookingDetailsModal'

interface AdminBookingsTableProps {
  bookings: BookingEnquiry[]
  settings: VenueSettings
  onConfirm: (id: string) => void
  onReject: (id: string) => void
  onCancelConfirmed: (id: string, reason: string) => void
  onUpdateNotes: (id: string, notes: string) => void
}

type SortField = 'eventDateAsc' | 'eventDateDesc' | 'createdDesc' | 'guestCountDesc'

export const AdminBookingsTable: React.FC<AdminBookingsTableProps> = ({
  bookings,
  settings,
  onConfirm,
  onReject,
  onCancelConfirmed,
  onUpdateNotes,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all')
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all')
  const [sortOption, setSortOption] = useState<SortField>('eventDateAsc')
  const [selectedBooking, setSelectedBooking] = useState<BookingEnquiry | null>(null)
  
  // Inline cancellation confirm prompt state
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState('')

  // Filter & Search Logic
  const filteredBookings = bookings.filter(b => {
    // Search query matches Name, Phone, or ID
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch = !query || 
      b.fullName.toLowerCase().includes(query) ||
      b.mobile.includes(query) ||
      b.id.toLowerCase().includes(query)

    // Status filter
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter

    // Event type filter
    const matchesEvent = eventTypeFilter === 'all' || b.eventType === eventTypeFilter

    return matchesSearch && matchesStatus && matchesEvent
  })

  // Sort logic
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortOption) {
      case 'eventDateAsc':
        return a.eventDate.localeCompare(b.eventDate)
      case 'eventDateDesc':
        return b.eventDate.localeCompare(a.eventDate)
      case 'createdDesc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'guestCountDesc':
        return b.guestCount - a.guestCount
      default:
        return 0
    }
  })

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Confirmed
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-300">
            <XCircle className="w-3 h-3 text-rose-600" />
            Rejected
          </span>
        )
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            Pending
          </span>
        )
    }
  }

  const handleTriggerCancel = (id: string) => {
    onCancelConfirmed(id, cancelReason)
    setCancellingId(null)
    setCancelReason('')
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-[#C5A059]/25">
      
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, phone, or enquiry ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020]"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === 'all' ? 'bg-white shadow-xs text-[#800020] font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === 'pending' ? 'bg-amber-100 shadow-xs text-amber-900 font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Pending ({bookings.filter(b => b.status === 'pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('confirmed')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === 'confirmed' ? 'bg-emerald-100 shadow-xs text-emerald-900 font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setStatusFilter('rejected')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === 'rejected' ? 'bg-rose-100 shadow-xs text-rose-900 font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rejected ({bookings.filter(b => b.status === 'rejected').length})
            </button>
          </div>

          {/* Event Type Filter */}
          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#800020]/15"
          >
            <option value="all">All Events</option>
            <option value="Wedding">Wedding</option>
            <option value="Reception">Reception</option>
            <option value="Engagement">Engagement</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Munj / Thread Ceremony">Munj</option>
            <option value="Other">Other</option>
          </select>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 border border-stone-200 rounded-xl px-2.5 py-1.5 bg-white text-xs text-stone-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortField)}
              className="bg-transparent focus:outline-none text-xs"
            >
              <option value="eventDateAsc">Event Date (Earliest)</option>
              <option value="eventDateDesc">Event Date (Latest)</option>
              <option value="createdDesc">Submission (Newest)</option>
              <option value="guestCountDesc">Guests (Highest)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Cancellation prompt inline if triggered from table */}
      {cancellingId && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-rose-900 font-medium">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>Confirm cancellation of booking <strong>{cancellingId}</strong>? This frees up the event date.</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cancellation reason (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-rose-300 text-xs bg-white flex-1 sm:w-48"
            />
            <button
              onClick={() => handleTriggerCancel(cancellingId)}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs whitespace-nowrap cursor-pointer"
            >
              Cancel Booking
            </button>
            <button
              onClick={() => { setCancellingId(null); setCancelReason('') }}
              className="px-2 py-1.5 text-stone-600 hover:text-stone-900 text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-[#71717A] uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">ID & Customer</th>
              <th className="py-3 px-4">Event & Type</th>
              <th className="py-3 px-4">Event Date</th>
              <th className="py-3 px-4">Guests</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sortedBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-stone-500">
                  <div className="max-w-xs mx-auto space-y-2">
                    <FileSpreadsheet className="w-8 h-8 text-stone-300 mx-auto" />
                    <p className="font-medium text-stone-600">No booking enquiries found</p>
                    <p className="text-[11px] text-stone-400">
                      Try clearing your search query or status filter.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedBookings.map((b) => (
                <tr 
                  key={b.id} 
                  className={`hover:bg-stone-50/80 transition-colors ${
                    b.status === 'pending' ? 'bg-amber-50/20' : ''
                  }`}
                >
                  {/* ID & Customer */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-900 text-sm">
                      {b.fullName}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[11px] text-[#800020] font-bold">
                        {b.id}
                      </span>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-500 font-mono text-[11px]">
                        +91 {b.mobile}
                      </span>
                    </div>
                  </td>

                  {/* Event & Type */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-stone-800">
                      {b.eventType}
                    </span>
                    {b.message && (
                      <p className="text-[11px] text-stone-500 truncate max-w-[180px] mt-0.5 italic">
                        "{b.message}"
                      </p>
                    )}
                  </td>

                  {/* Event Date */}
                  <td className="py-3.5 px-4 font-semibold text-stone-900">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#800020]" />
                      <span>{formatIndianDate(b.eventDate)}</span>
                    </div>
                  </td>

                  {/* Guests */}
                  <td className="py-3.5 px-4 text-stone-700">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>{b.guestCount}</span>
                    </div>
                  </td>

                  {/* Submission Date */}
                  <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                    {formatIndianDateTime(b.createdAt)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {getStatusBadge(b.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* View Details */}
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-1.5 rounded-lg text-stone-600 hover:text-[#800020] hover:bg-stone-100 cursor-pointer"
                        title="View Full Booking Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Confirm (Pending only) */}
                      {b.status === 'pending' && (
                        <button
                          onClick={() => onConfirm(b.id)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-xs"
                          title="Confirm Booking"
                        >
                          Confirm
                        </button>
                      )}

                      {/* Reject (Pending only) */}
                      {b.status === 'pending' && (
                        <button
                          onClick={() => onReject(b.id)}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                          title="Reject Enquiry"
                        >
                          Reject
                        </button>
                      )}

                      {/* Cancel (Confirmed only) */}
                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => setCancellingId(b.id)}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 cursor-pointer"
                          title="Cancel Confirmed Booking"
                        >
                          Cancel
                        </button>
                      )}

                      {/* Re-open (Rejected only) */}
                      {b.status === 'rejected' && (
                        <button
                          onClick={() => onConfirm(b.id)}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
                          title="Re-open and confirm date"
                        >
                          Re-open
                        </button>
                      )}

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (Visible on mobile/tablet) */}
      <div className="lg:hidden space-y-4">
        {sortedBookings.length === 0 ? (
          <div className="text-center py-10 text-stone-500 space-y-2">
            <FileSpreadsheet className="w-8 h-8 text-stone-300 mx-auto" />
            <p className="font-medium text-stone-600">No booking enquiries found</p>
          </div>
        ) : (
          sortedBookings.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border transition-all ${
                b.status === 'pending' 
                  ? 'border-amber-300 bg-amber-50/20' 
                  : b.status === 'confirmed'
                  ? 'border-emerald-200 bg-white'
                  : 'border-stone-200 bg-stone-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="font-mono text-[10px] text-[#800020] font-bold bg-[#800020]/10 px-1.5 py-0.5 rounded">
                    {b.id}
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 mt-1">
                    {b.fullName}
                  </h4>
                </div>
                {getStatusBadge(b.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 my-3 py-2 border-y border-stone-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#800020]" />
                  <span className="font-semibold text-stone-900">{formatIndianDate(b.eventDate)}</span>
                </div>
                <div>
                  <span className="text-stone-500">Event:</span> <strong className="text-stone-800">{b.eventType}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  <span>{b.guestCount} Guests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>+91 {b.mobile}</span>
                </div>
              </div>

              {b.message && (
                <p className="text-xs text-stone-600 italic mb-3 line-clamp-2 bg-stone-50 p-2 rounded-lg">
                  "{b.message}"
                </p>
              )}

              {/* Mobile Actions */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => setSelectedBooking(b)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {b.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onReject(b.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => onConfirm(b.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600"
                      >
                        Confirm
                      </button>
                    </>
                  )}

                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => setCancellingId(b.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200"
                    >
                      Cancel Booking
                    </button>
                  )}

                  {b.status === 'rejected' && (
                    <button
                      onClick={() => onConfirm(b.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
                    >
                      Re-open
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <AdminBookingDetailsModal
          booking={selectedBooking}
          settings={settings}
          onClose={() => setSelectedBooking(null)}
          onConfirm={(id) => {
            onConfirm(id)
            setSelectedBooking(prev => prev ? { ...prev, status: 'confirmed' } : null)
          }}
          onReject={(id) => {
            onReject(id)
            setSelectedBooking(prev => prev ? { ...prev, status: 'rejected' } : null)
          }}
          onCancelConfirmed={(id, reason) => {
            onCancelConfirmed(id, reason)
            setSelectedBooking(prev => prev ? { ...prev, status: 'rejected' } : null)
          }}
          onUpdateNotes={(id, notes) => {
            onUpdateNotes(id, notes)
            setSelectedBooking(prev => prev ? { ...prev, notes } : null)
          }}
        />
      )}

    </div>
  )
}
