import React, { useState, useEffect } from 'react'
import { 
  CalendarCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Phone, 
  Send, 
  HelpCircle,
  Calendar as CalendarIcon,
  Users
} from 'lucide-react'
import { BookingEnquiry, EventType, VenueSettings } from '../../types/booking'
import { 
  getTodayDateString, 
  isPastDate, 
  formatIndianDate 
} from '../../utils/dateUtils'
import { 
  generateEnquiryId, 
  isValidIndianPhone, 
  formatIndianCurrency 
} from '../../utils/formatters'
import { 
  checkDateAvailability, 
  addBookingEnquiry 
} from '../../services/storageService'
import { BookingSuccessModal } from './BookingSuccessModal'

interface BookingEnquirySectionProps {
  settings: VenueSettings
}

export const BookingEnquirySection: React.FC<BookingEnquirySectionProps> = ({ settings }) => {
  const today = getTodayDateString()

  // Form State
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [eventType, setEventType] = useState<EventType>('Wedding')
  const [eventDate, setEventDate] = useState('')
  const [guestCount, setGuestCount] = useState<number>(350)
  const [message, setMessage] = useState('')

  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedEnquiry, setSubmittedEnquiry] = useState<BookingEnquiry | null>(null)
  const [storageUpdateTrigger, setStorageUpdateTrigger] = useState(0)

  // Listen to storage updates (e.g. if admin confirms or blocks a date)
  useEffect(() => {
    const handleStorageChange = () => setStorageUpdateTrigger(prev => prev + 1)
    window.addEventListener('smk_storage_updated', handleStorageChange)
    return () => window.removeEventListener('smk_storage_updated', handleStorageChange)
  }, [])

  // Real-time Date Availability check
  const availability = eventDate ? checkDateAvailability(eventDate) : null

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (at least 3 characters).'
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.'
    } else if (!isValidIndianPhone(mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).'
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!eventDate) {
      newErrors.eventDate = 'Please select your preferred event date.'
    } else if (isPastDate(eventDate)) {
      newErrors.eventDate = 'Event date cannot be in the past.'
    } else if (availability && !availability.isAvailable) {
      newErrors.eventDate = availability.reason || 'This date is currently unavailable.'
    }

    if (!guestCount || guestCount < 20 || guestCount > settings.capacity) {
      newErrors.guestCount = `Guest count must be between 20 and ${settings.capacity}.`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const newEnquiry: BookingEnquiry = {
      id: generateEnquiryId(),
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim() || undefined,
      eventType,
      eventDate,
      guestCount,
      message: message.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
      isDemoRecord: false,
    }

    const result = addBookingEnquiry(newEnquiry)

    setIsSubmitting(false)

    if (result.success) {
      setSubmittedEnquiry(newEnquiry)
      // Reset form
      setFullName('')
      setMobile('')
      setEmail('')
      setEventDate('')
      setMessage('')
      setErrors({})
    } else {
      setErrors({ form: result.message })
    }
  }

  return (
    <section id="booking" className="py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative floral subtle watermarks */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#800020]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#800020]/20">
            <CalendarCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            Direct Booking Enquiry
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#27272A] tracking-tight">
            Check Date Availability & <span className="text-[#800020] italic font-serif">Plan Your Event</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#71717A] max-w-2xl mx-auto">
            Select your auspicious celebration date to check live availability. Submit an enquiry to lock your slot and receive a personalized quote.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020] mx-auto mt-4 rounded-full" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#C5A059]/30">
            
            <div className="mb-6 pb-4 border-b border-[#F5EFEB] flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#27272A]">
                  Reserve Your Date
                </h3>
                <p className="text-xs text-[#71717A]">
                  Starting at {formatIndianCurrency(settings.startingPrice)} per day
                </p>
              </div>

              <span className="text-[11px] font-medium bg-[#800020]/8 text-[#800020] px-3 py-1 rounded-full border border-[#800020]/20">
                ⚡ Instant Live Availability
              </span>
            </div>

            {/* Error Banner if duplicate or unavailable */}
            {errors.form && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#27272A] mb-1">
                    Customer Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }))
                    }}
                    placeholder="e.g. Ramesh Kulkarni"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FDFBF7] focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName 
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                        : 'border-[#E5E7EB] focus:border-[#800020] focus:ring-[#800020]/15'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-xs font-semibold text-[#27272A] mb-1">
                    Mobile Number <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#71717A]">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="mobile"
                      value={mobile}
                      maxLength={10}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '')
                        setMobile(val)
                        if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }))
                      }}
                      placeholder="9876543210"
                      className={`w-full pl-12 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FDFBF7] focus:outline-none focus:ring-2 transition-all ${
                        errors.mobile 
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                          : 'border-[#E5E7EB] focus:border-[#800020] focus:ring-[#800020]/15'
                      }`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.mobile}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#27272A] mb-1">
                    Email Address <span className="text-[#71717A] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                    }}
                    placeholder="ramesh@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none transition-all"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-xs font-semibold text-[#27272A] mb-1">
                    Occasion / Event Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as EventType)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none transition-all"
                  >
                    <option value="Wedding">Wedding (लग्न समारंभ)</option>
                    <option value="Reception">Reception (स्वागत समारंभ)</option>
                    <option value="Engagement">Engagement / Sakharpuda (साखरपुडा)</option>
                    <option value="Munj / Thread Ceremony">Munj / Thread Ceremony (मुंज)</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other Family / Cultural Event</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Event Date (With Live Availability Feedback) */}
              <div>
                <label htmlFor="eventDate" className="block text-xs font-semibold text-[#27272A] mb-1">
                  Preferred Event Date <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="eventDate"
                    min={today}
                    value={eventDate}
                    onChange={(e) => {
                      setEventDate(e.target.value)
                      if (errors.eventDate) setErrors(prev => ({ ...prev, eventDate: '' }))
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FDFBF7] focus:outline-none focus:ring-2 transition-all ${
                      errors.eventDate 
                        ? 'border-rose-400 focus:ring-rose-200' 
                        : availability && availability.isAvailable
                        ? 'border-emerald-400 focus:ring-emerald-100'
                        : availability && !availability.isAvailable
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-[#E5E7EB] focus:border-[#800020] focus:ring-[#800020]/15'
                    }`}
                  />
                </div>

                {/* Live Availability Badge Display */}
                {eventDate && availability && (
                  <div className={`mt-2 p-3 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                    availability.isAvailable 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      {availability.isAvailable ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      )}
                      <span className="font-medium">
                        {availability.reason}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      availability.isAvailable ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                    }`}>
                      {availability.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                )}

                {errors.eventDate && !availability && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.eventDate}</p>
                )}
              </div>

              {/* Row 4: Guest Count (Range slider & number) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="guestCount" className="text-xs font-semibold text-[#27272A]">
                    Estimated Guest Attendance <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-xs font-bold text-[#800020] bg-[#800020]/10 px-2 py-0.5 rounded">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  id="guestCount"
                  min={50}
                  max={settings.capacity}
                  step={25}
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                  className="w-full accent-[#800020] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#71717A] mt-1 font-medium">
                  <span>50 Guests</span>
                  <span>250 Guests</span>
                  <span>Max {settings.capacity} Guests</span>
                </div>
              </div>

              {/* Row 5: Additional Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#27272A] mb-1">
                  Special Requirements / Message <span className="text-[#71717A] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need catering Maharaj recommendation, decor theme preference, sound timings, etc."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Booking terms reminder */}
              <div className="text-[11px] text-[#71717A] bg-[#FAF7F2] p-3 rounded-xl border border-[#F5EFEB] flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Note:</strong> Enquiry submission logs your preferred date in our review system. Booking is finalized once advance token is verified with the owner.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || (availability !== null && !availability.isAvailable)}
                className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  availability && !availability.isAvailable
                    ? 'bg-stone-300 cursor-not-allowed opacity-60 text-stone-600'
                    : 'bg-gradient-to-r from-[#800020] via-[#9B1B30] to-[#800020] hover:from-[#5B0E1E] hover:to-[#800020] hover:shadow-xl hover:scale-[1.01]'
                }`}
              >
                {isSubmitting ? (
                  <span>Checking Availability & Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#DFBF77]" />
                    <span>
                      {availability && !availability.isAvailable 
                        ? 'Select Another Date to Enquire' 
                        : 'Submit Booking Enquiry'}
                    </span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Information & Direct Help */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Assurance Card */}
            <div className="bg-[#4A0814] text-[#FAF3E1] rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#C5A059]/40 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#DFBF77]">
                  Venue Manager Helpline
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                  Prefer Booking Over Phone or WhatsApp?
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF3E1]/80 leading-relaxed">
                  Call our manager directly to discuss muhurta timings, stage floral themes, catering Maharaja recommendations, and custom hall packages.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#800020] text-xs font-bold hover:bg-[#FAF3E1] transition-all shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {settings.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Why Book With Us Checklist */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-[#C5A059]/25">
              <h4 className="font-serif text-lg font-bold text-[#27272A] mb-4 pb-2 border-b border-[#F5EFEB]">
                Booking Journey & What to Expect
              </h4>
              <ul className="space-y-3.5 text-xs text-[#52525B]">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-[#27272A] block">Instant Availability Check</strong>
                    Select your date online. Unavailable dates are highlighted automatically.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-[#27272A] block">Owner Review & Hall Visit</strong>
                    The venue manager reviews your request and invites your family for an auspicious hall walkthrough.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-[#27272A] block">Formal Confirmation & Receipt</strong>
                    Upon advance payment, the owner locks the calendar and issues your signed booking confirmation receipt.
                  </div>
                </li>
              </ul>
            </div>

            {/* Pricing Transparency Badge */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
              <div>
                <span className="block font-bold text-amber-950">Starting Price: {formatIndianCurrency(settings.startingPrice)}</span>
                <span className="text-[11px] text-amber-800">Includes main hall, sound, lighting & bridal rooms</span>
              </div>
              <span className="text-xl">🪔</span>
            </div>

          </div>

        </div>

      </div>

      {/* Success Modal */}
      {submittedEnquiry && (
        <BookingSuccessModal
          enquiry={submittedEnquiry}
          settings={settings}
          onClose={() => setSubmittedEnquiry(null)}
        />
      )}
    </section>
  )
}
