import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { CheckCircle2, MessageCircle, Copy, Check, Calendar, Users, Sparkles, X } from 'lucide-react'
import { BookingEnquiry, VenueSettings } from '../../types/booking'
import { formatIndianDate } from '../../utils/dateUtils'
import { createWhatsAppBookingUrl } from '../../utils/formatters'

interface BookingSuccessModalProps {
  enquiry: BookingEnquiry
  settings: VenueSettings
  onClose: () => void
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  enquiry,
  settings,
  onClose,
}) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Launch celebratory golden/maroon confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#800020', '#C5A059', '#D4AF37', '#E5C365', '#5B0E1E'],
      })
    } catch (e) {
      console.log('Confetti error', e)
    }
  }, [])

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(enquiry.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const whatsappUrl = createWhatsAppBookingUrl(
    settings.phone,
    enquiry.id,
    formatIndianDate(enquiry.eventDate),
    enquiry.eventType,
    enquiry.fullName
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative bg-[#FDFBF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#C5A059]/40 text-center my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#71717A] hover:text-[#27272A] hover:bg-stone-200 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-4 shadow-md animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Heading */}
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          Enquiry Received Successfully
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#27272A] mb-2">
          Thank You, {enquiry.fullName.split(' ')[0]}!
        </h3>
        <p className="text-xs sm:text-sm text-[#71717A] mb-6">
          Your booking enquiry for <span className="font-semibold text-[#800020]">{settings.venueName}</span> has been logged into our system.
        </p>

        {/* Generated ID Box */}
        <div className="bg-white rounded-2xl p-4 border border-[#C5A059]/30 shadow-sm mb-6 flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] uppercase font-semibold text-[#71717A] tracking-wider block">
              Your Unique Enquiry Reference ID
            </span>
            <span className="font-mono text-lg sm:text-xl font-bold text-[#800020]">
              {enquiry.id}
            </span>
          </div>

          <button
            onClick={copyIdToClipboard}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#FAF7F2] hover:bg-[#800020] hover:text-white border border-[#C5A059]/40 text-[#27272A] transition-all cursor-pointer"
            title="Copy ID"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Booking Summary Recap */}
        <div className="bg-[#FAF7F2] rounded-xl p-4 text-xs text-left space-y-2 mb-6 border border-[#F5EFEB]">
          <div className="flex items-center justify-between border-b border-[#EADBCE]/60 pb-2">
            <span className="text-[#71717A] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#800020]" />
              Event Date:
            </span>
            <span className="font-semibold text-[#27272A]">
              {formatIndianDate(enquiry.eventDate)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-[#EADBCE]/60 pb-2">
            <span className="text-[#71717A]">Event Type:</span>
            <span className="font-semibold text-[#27272A]">{enquiry.eventType}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#EADBCE]/60 pb-2">
            <span className="text-[#71717A] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#800020]" />
              Estimated Guests:
            </span>
            <span className="font-semibold text-[#27272A]">{enquiry.guestCount} guests</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#71717A]">Mobile Contact:</span>
            <span className="font-semibold text-[#27272A]">{enquiry.mobile}</span>
          </div>
        </div>

        {/* Important Confirmation Disclaimer */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-left mb-6 text-xs text-amber-900 leading-relaxed">
          <strong className="font-semibold block mb-1 text-amber-950">
            📌 Important Booking Notice:
          </strong>
          This enquiry does not constitute a confirmed hall reservation. The venue manager will review date schedule, discuss catering options, and confirm booking upon token advance payment.
        </div>

        {/* Actions: WhatsApp & Dismiss */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp Now</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-[#27272A] bg-white hover:bg-stone-100 border border-[#C5A059]/40 transition-colors cursor-pointer"
          >
            Close & Submit Another
          </button>
        </div>

      </div>
    </div>
  )
}
