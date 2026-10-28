import React, { useState } from 'react'
import { 
  X, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText,
  Save,
  Tag
} from 'lucide-react'
import { BookingEnquiry, VenueSettings } from '../../types/booking'
import { formatIndianDate, formatIndianDateTime } from '../../utils/dateUtils'
import { createWhatsAppBookingUrl } from '../../utils/formatters'

interface AdminBookingDetailsModalProps {
  booking: BookingEnquiry
  settings: VenueSettings
  onClose: () => void
  onConfirm: (id: string) => void
  onReject: (id: string) => void
  onCancelConfirmed: (id: string, reason: string) => void
  onUpdateNotes: (id: string, notes: string) => void
}

export const AdminBookingDetailsModal: React.FC<AdminBookingDetailsModalProps> = ({
  booking,
  settings,
  onClose,
  onConfirm,
  onReject,
  onCancelConfirmed,
  onUpdateNotes,
}) => {
  const [internalNotes, setInternalNotes] = useState(booking.notes || '')
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [showCancelPrompt, setShowCancelPrompt] = useState(false)

  const handleSaveNotes = () => {
    onUpdateNotes(booking.id, internalNotes)
    setIsEditingNotes(false)
  }

  const handleConfirmCancellation = () => {
    onCancelConfirmed(booking.id, cancelReason)
    setShowCancelPrompt(false)
  }

  const whatsappUrl = createWhatsAppBookingUrl(
    booking.mobile,
    booking.id,
    formatIndianDate(booking.eventDate),
    booking.eventType,
    booking.fullName
  )

  const getStatusBadge = () => {
    switch (booking.status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Confirmed Booking
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Rejected / Cancelled
          </span>
        )
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Pending Owner Approval
          </span>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#800020] bg-[#800020]/10 px-2 py-0.5 rounded">
                {booking.id}
              </span>
              {getStatusBadge()}
              {booking.isDemoRecord && (
                <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                  Sample Demo
                </span>
              )}
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#27272A]">
              {booking.fullName}
            </h3>
            <span className="text-xs text-[#71717A]">
              Enquiry submitted on {formatIndianDateTime(booking.createdAt)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider block mb-1">
              Event Details
            </span>
            <div className="text-sm font-semibold text-[#27272A] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#800020]" />
              <span>{formatIndianDate(booking.eventDate)} ({booking.eventType})</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider block mb-1">
              Guest Capacity
            </span>
            <div className="text-sm font-semibold text-[#27272A] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#800020]" />
              <span>{booking.guestCount} Guests</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider block mb-1">
              Contact Number
            </span>
            <div className="text-sm font-semibold text-[#27272A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#800020]" />
                <span>+91 {booking.mobile}</span>
              </div>
              <a
                href={`tel:${booking.mobile}`}
                className="text-[11px] font-bold text-[#800020] hover:underline"
              >
                Call
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider block mb-1">
              Email Address
            </span>
            <div className="text-sm font-semibold text-[#27272A] flex items-center gap-2 truncate">
              <Mail className="w-4 h-4 text-[#800020]" />
              <span className="truncate">{booking.email || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Customer Message / Requirements */}
        {booking.message && (
          <div className="mb-6 p-4 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/30 text-xs">
            <strong className="block text-[#800020] mb-1 font-semibold uppercase tracking-wider text-[10px]">
              Customer Request / Notes:
            </strong>
            <p className="text-[#27272A] italic leading-relaxed">
              "{booking.message}"
            </p>
          </div>
        )}

        {/* Owner Internal Notes */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase text-[10px] tracking-wider">
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>Owner Internal Notes</span>
            </div>
            {!isEditingNotes && (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-[11px] font-semibold text-[#800020] hover:underline cursor-pointer"
              >
                Edit Notes
              </button>
            )}
          </div>

          {isEditingNotes ? (
            <div className="space-y-2">
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={2}
                placeholder="Add private owner notes (e.g. advance received, Maharaj contact, special requirements)"
                className="w-full p-2.5 rounded-lg border border-amber-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingNotes(false)}
                  className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1 text-xs font-semibold bg-[#800020] text-white rounded flex items-center gap-1 shadow-sm"
                >
                  <Save className="w-3 h-3" />
                  Save Note
                </button>
              </div>
            </div>
          ) : (
            <p className="text-stone-700">
              {booking.notes || 'No internal notes added yet. Click Edit Notes to record payments or requirements.'}
            </p>
          )}
        </div>

        {/* WhatsApp & Call Direct Action Banner */}
        <div className="mb-6 flex flex-wrap gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat With Customer on WhatsApp</span>
          </a>

          <a
            href={`tel:${booking.mobile}`}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-[#27272A] border border-stone-300 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Mobile</span>
          </a>
        </div>

        {/* Cancellation Confirmation Sub-prompt */}
        {showCancelPrompt && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-xs animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-rose-900 mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Are you sure you want to cancel this confirmed booking?</span>
            </div>
            <p className="text-rose-800 mb-3">
              This will free up {formatIndianDate(booking.eventDate)} on the calendar and allow other customers to enquire.
            </p>
            <input
              type="text"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation (optional)"
              className="w-full p-2 rounded-lg border border-rose-300 mb-3 bg-white text-xs"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCancelPrompt(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 bg-stone-200 hover:bg-stone-300"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancellation}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        )}

        {/* Bottom Actions based on status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 border border-stone-200 cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {booking.status === 'pending' && (
              <>
                <button
                  onClick={() => onReject(booking.id)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject Enquiry</span>
                </button>

                <button
                  onClick={() => onConfirm(booking.id)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Booking</span>
                </button>
              </>
            )}

            {booking.status === 'confirmed' && !showCancelPrompt && (
              <button
                onClick={() => setShowCancelPrompt(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Cancel Confirmed Booking</span>
              </button>
            )}

            {booking.status === 'rejected' && (
              <button
                onClick={() => onConfirm(booking.id)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Re-open & Confirm Booking</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
