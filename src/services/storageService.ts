import { BookingEnquiry, BlockedDate, VenueSettings } from '../types/booking'
import { 
  DEFAULT_VENUE_SETTINGS, 
  INITIAL_DEMO_BOOKINGS, 
  INITIAL_BLOCKED_DATES 
} from '../data/seedData'
import { isPastDate } from '../utils/dateUtils'

const STORAGE_KEYS = {
  BOOKINGS: 'smk_bookings_v1',
  BLOCKED_DATES: 'smk_blocked_dates_v1',
  SETTINGS: 'smk_venue_settings_v1',
  INITIALIZED: 'smk_demo_initialized_v1',
  ADMIN_AUTH: 'smk_admin_authenticated_v1',
}

/**
 * Initializes localStorage with seed data on first load only.
 * Will not overwrite modifications made by the user across browser refreshes.
 */
export function initializeStorage(): void {
  try {
    const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED)
    if (!isInitialized) {
      resetToDefaultDemoData()
    }
  } catch (err) {
    console.error('Error initializing storage:', err)
  }
}

/**
 * Force resets all records to the original clean demo state.
 */
export function resetToDefaultDemoData(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DEMO_BOOKINGS))
    localStorage.setItem(STORAGE_KEYS.BLOCKED_DATES, JSON.stringify(INITIAL_BLOCKED_DATES))
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_VENUE_SETTINGS))
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true')
    window.dispatchEvent(new Event('smk_storage_updated'))
  } catch (err) {
    console.error('Failed to reset demo data:', err)
  }
}

// ----------------------------------------------------
// BOOKINGS SERVICE
// ----------------------------------------------------

export function getBookings(): BookingEnquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS)
    if (!raw) return INITIAL_DEMO_BOOKINGS
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_BOOKINGS
  } catch {
    return INITIAL_DEMO_BOOKINGS
  }
}

export function saveBookings(bookings: BookingEnquiry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings))
    window.dispatchEvent(new Event('smk_storage_updated'))
  } catch (err) {
    console.error('Failed to save bookings:', err)
  }
}

export function addBookingEnquiry(enquiry: BookingEnquiry): { success: boolean; message: string } {
  // Check availability first
  const availability = checkDateAvailability(enquiry.eventDate)
  if (!availability.isAvailable) {
    return { success: false, message: availability.reason || 'This date is currently unavailable for booking.' }
  }

  // Prevent duplicate submissions with exact same phone & date
  const existing = getBookings()
  const duplicate = existing.find(
    b => b.eventDate === enquiry.eventDate && 
         b.mobile === enquiry.mobile && 
         b.status !== 'rejected'
  )

  if (duplicate) {
    return {
      success: false,
      message: `An active enquiry (ID: ${duplicate.id}) already exists for this mobile number on ${enquiry.eventDate}.`,
    }
  }

  const updated = [enquiry, ...existing]
  saveBookings(updated)
  return { success: true, message: 'Enquiry submitted successfully.' }
}

export function updateBookingStatus(
  bookingId: string, 
  newStatus: 'pending' | 'confirmed' | 'rejected',
  notes?: string
): { success: boolean; message: string } {
  const bookings = getBookings()
  const target = bookings.find(b => b.id === bookingId)

  if (!target) {
    return { success: false, message: 'Booking enquiry not found.' }
  }

  // If attempting to confirm, verify date is not already confirmed or blocked
  if (newStatus === 'confirmed') {
    // Check if another confirmed booking already exists on this date
    const conflicting = bookings.find(
      b => b.id !== bookingId && b.eventDate === target.eventDate && b.status === 'confirmed'
    )
    if (conflicting) {
      return { 
        success: false, 
        message: `Cannot confirm! Date ${target.eventDate} is already booked for ${conflicting.fullName} (ID: ${conflicting.id}).` 
      }
    }

    // Check if date is blocked
    const blockedDates = getBlockedDates()
    const isBlocked = blockedDates.some(b => b.date === target.eventDate)
    if (isBlocked) {
      return {
        success: false,
        message: `Cannot confirm! Date ${target.eventDate} is marked as blocked by venue administration.`,
      }
    }
  }

  const updated = bookings.map(b => {
    if (b.id === bookingId) {
      return {
        ...b,
        status: newStatus,
        notes: notes !== undefined ? notes : b.notes,
      }
    }
    return b
  })

  saveBookings(updated)
  return { success: true, message: `Booking status successfully changed to ${newStatus}.` }
}

export function cancelConfirmedBooking(bookingId: string, reason?: string): { success: boolean; message: string } {
  const bookings = getBookings()
  const target = bookings.find(b => b.id === bookingId)
  if (!target) return { success: false, message: 'Booking not found.' }

  const updated = bookings.map(b => {
    if (b.id === bookingId) {
      return {
        ...b,
        status: 'rejected' as const,
        notes: reason ? `Cancelled by admin: ${reason}. (Previously Confirmed)` : 'Cancelled by venue administration.',
      }
    }
    return b
  })

  saveBookings(updated)
  return { success: true, message: 'Confirmed booking has been cancelled and the date is now open.' }
}

// ----------------------------------------------------
// BLOCKED DATES SERVICE
// ----------------------------------------------------

export function getBlockedDates(): BlockedDate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOCKED_DATES)
    if (!raw) return INITIAL_BLOCKED_DATES
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : INITIAL_BLOCKED_DATES
  } catch {
    return INITIAL_BLOCKED_DATES
  }
}

export function saveBlockedDates(dates: BlockedDate[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BLOCKED_DATES, JSON.stringify(dates))
    window.dispatchEvent(new Event('smk_storage_updated'))
  } catch (err) {
    console.error('Failed to save blocked dates:', err)
  }
}

export function blockDate(date: string, reason: string): { success: boolean; message: string } {
  if (isPastDate(date)) {
    return { success: false, message: 'Cannot block dates in the past.' }
  }

  // Check if date has a confirmed booking
  const bookings = getBookings()
  const confirmedBooking = bookings.find(b => b.eventDate === date && b.status === 'confirmed')
  if (confirmedBooking) {
    return {
      success: false,
      message: `Cannot block ${date}! It already has a confirmed booking for "${confirmedBooking.fullName}" (ID: ${confirmedBooking.id}). Cancel or reschedule that booking first.`,
    }
  }

  const existingBlocked = getBlockedDates()
  if (existingBlocked.some(b => b.date === date)) {
    return { success: false, message: `Date ${date} is already blocked.` }
  }

  const newBlock: BlockedDate = {
    id: `BLK-${Date.now().toString().slice(-4)}`,
    date,
    reason: reason.trim() || 'Blocked by venue administration',
    blockedAt: new Date().toISOString(),
    isDemoRecord: false,
  }

  saveBlockedDates([...existingBlocked, newBlock])
  return { success: true, message: `Date ${date} successfully blocked.` }
}

export function unblockDate(date: string): { success: boolean; message: string } {
  const existingBlocked = getBlockedDates()
  const updated = existingBlocked.filter(b => b.date !== date)
  saveBlockedDates(updated)
  return { success: true, message: `Date ${date} is now unblocked.` }
}

// ----------------------------------------------------
// AVAILABILITY LOGIC
// ----------------------------------------------------

export interface DateAvailabilityResult {
  isAvailable: boolean
  status: 'available' | 'confirmed' | 'blocked' | 'past'
  reason?: string
  enquiryCount?: number
}

export function checkDateAvailability(dateStr: string): DateAvailabilityResult {
  if (!dateStr) {
    return { isAvailable: false, status: 'past', reason: 'Please select a date.' }
  }

  if (isPastDate(dateStr)) {
    return { isAvailable: false, status: 'past', reason: 'The selected date has already passed. Please select an upcoming date.' }
  }

  const blocked = getBlockedDates().find(b => b.date === dateStr)
  if (blocked) {
    return {
      isAvailable: false,
      status: 'blocked',
      reason: `Unavailable: This date is reserved for "${blocked.reason}".`,
    }
  }

  const bookings = getBookings()
  const confirmed = bookings.find(b => b.eventDate === dateStr && b.status === 'confirmed')
  if (confirmed) {
    return {
      isAvailable: false,
      status: 'confirmed',
      reason: `Unavailable: This date is already booked for an event (${confirmed.eventType}).`,
    }
  }

  const pendingCount = bookings.filter(b => b.eventDate === dateStr && b.status === 'pending').length

  return {
    isAvailable: true,
    status: 'available',
    enquiryCount: pendingCount,
    reason: pendingCount > 0 
      ? `Date is currently open! (${pendingCount} pending enquiry under review)` 
      : 'Date is completely open and available for booking!',
  }
}

// ----------------------------------------------------
// VENUE SETTINGS SERVICE
// ----------------------------------------------------

export function getVenueSettings(): VenueSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    if (!raw) return DEFAULT_VENUE_SETTINGS
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_VENUE_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_VENUE_SETTINGS
  }
}

export function saveVenueSettings(settings: VenueSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      ...settings,
      updatedAt: new Date().toISOString(),
    }))
    window.dispatchEvent(new Event('smk_storage_updated'))
  } catch (err) {
    console.error('Failed to save venue settings:', err)
  }
}

// ----------------------------------------------------
// DEMO AUTHENTICATION SERVICE
// ----------------------------------------------------

export function isDemoAdminAuthenticated(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true'
  } catch {
    return false
  }
}

export function setDemoAdminAuthenticated(status: boolean): void {
  try {
    if (status) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true')
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH)
    }
  } catch (err) {
    console.error('Failed to set auth state:', err)
  }
}
