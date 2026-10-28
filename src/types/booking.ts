export type BookingStatus = 'pending' | 'confirmed' | 'rejected'

export type EventType = 
  | 'Wedding'
  | 'Reception'
  | 'Engagement'
  | 'Birthday'
  | 'Anniversary'
  | 'Munj / Thread Ceremony'
  | 'Other'

export interface BookingEnquiry {
  id: string
  fullName: string
  mobile: string
  email?: string
  eventType: EventType
  eventDate: string // YYYY-MM-DD
  guestCount: number
  message?: string
  status: BookingStatus
  createdAt: string // ISO timestamp
  isDemoRecord?: boolean
  notes?: string
}

export interface BlockedDate {
  id: string
  date: string // YYYY-MM-DD
  reason: string
  blockedAt: string // ISO timestamp
  isDemoRecord?: boolean
}

export interface VenueSettings {
  venueName: string
  marathiName: string
  tagline: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
  capacity: number
  startingPrice: number
  hallArea: string
  facilities: string[]
  updatedAt: string
}

export interface GalleryItem {
  id: string
  title: string
  category: 'hall' | 'stage' | 'seating' | 'dining' | 'bridal'
  imageUrl: string
  fallbackUrl: string
  description: string
  alt: string
}
