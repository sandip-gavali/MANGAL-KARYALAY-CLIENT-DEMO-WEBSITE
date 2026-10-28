/**
 * Formatting and helper functions for Indian currency, phone numbers,
 * unique booking IDs, and WhatsApp communication links.
 */

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function isValidIndianPhone(phone: string): boolean {
  // Cleans out spaces, dashes, +91 prefix
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '')
  const tenDigit = cleaned.startsWith('91') && cleaned.length === 12 
    ? cleaned.substring(2) 
    : cleaned
  return /^[6-9]\d{9}$/.test(tenDigit)
}

export function generateEnquiryId(): string {
  const currentYear = new Date().getFullYear()
  const randomFourDigit = Math.floor(1000 + Math.random() * 9000)
  return `SMK-${currentYear}-${randomFourDigit}`
}

export function createWhatsAppBookingUrl(
  phone: string, 
  enquiryId: string, 
  eventDate: string, 
  eventType: string, 
  fullName: string
): string {
  const cleanPhone = phone.replace(/[^\d]/g, '')
  const text = encodeURIComponent(
    `Namaste Shree Mangalmurti Mangal Karyalay 🙏\n` +
    `I have submitted a booking enquiry on your website.\n\n` +
    `📋 Enquiry ID: ${enquiryId}\n` +
    `👤 Name: ${fullName}\n` +
    `🎉 Event: ${eventType}\n` +
    `📅 Date: ${eventDate}\n\n` +
    `Please let me know about venue confirmation and catering packages. Thank you!`
  )
  return `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${text}`
}
