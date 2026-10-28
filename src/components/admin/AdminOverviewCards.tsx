import React from 'react'
import { 
  Inbox, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  IndianRupee, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react'
import { BookingEnquiry, BlockedDate, VenueSettings } from '../../types/booking'
import { formatIndianCurrency } from '../../utils/formatters'
import { getTodayDateString } from '../../utils/dateUtils'

interface AdminOverviewCardsProps {
  bookings: BookingEnquiry[]
  blockedDates: BlockedDate[]
  settings: VenueSettings
  onNavigateToTab?: (tab: string) => void
}

export const AdminOverviewCards: React.FC<AdminOverviewCardsProps> = ({
  bookings,
  blockedDates,
  settings,
  onNavigateToTab,
}) => {
  const today = getTodayDateString()

  const totalEnquiries = bookings.length
  const pendingCount = bookings.filter(b => b.status === 'pending').length
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length
  const rejectedCount = bookings.filter(b => b.status === 'rejected').length
  
  // Upcoming confirmed events (dates >= today)
  const upcomingConfirmed = bookings.filter(b => b.status === 'confirmed' && b.eventDate >= today).length
  
  // Projected Hall Revenue from confirmed bookings
  const projectedRevenue = confirmedCount * settings.startingPrice

  const cards = [
    {
      title: 'Pending Enquiries',
      value: pendingCount,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      sub: pendingCount > 0 ? `${pendingCount} awaiting approval` : 'No pending actions',
      highlight: pendingCount > 0,
      tab: 'bookings',
    },
    {
      title: 'Confirmed Bookings',
      value: confirmedCount,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      sub: `${upcomingConfirmed} upcoming events`,
      tab: 'calendar',
    },
    {
      title: 'Total Enquiries',
      value: totalEnquiries,
      icon: Inbox,
      color: 'text-[#800020]',
      bgColor: 'bg-[#800020]/10',
      borderColor: 'border-[#800020]/20',
      sub: 'All-time demo submissions',
      tab: 'bookings',
    },
    {
      title: 'Blocked Dates',
      value: blockedDates.length,
      icon: ShieldAlert,
      color: 'text-stone-700',
      bgColor: 'bg-stone-100',
      borderColor: 'border-stone-200',
      sub: 'Maintenance & reserved',
      tab: 'blocked',
    },
    {
      title: 'Projected Hall Revenue',
      value: formatIndianCurrency(projectedRevenue),
      icon: IndianRupee,
      color: 'text-[#C5A059]',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-[#C5A059]/30',
      sub: `Based on ₹${(settings.startingPrice / 1000).toFixed(0)}k/event base`,
      tab: 'settings',
    },
    {
      title: 'Rejected / Cancelled',
      value: rejectedCount,
      icon: XCircle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      sub: 'Declined or cancelled dates',
      tab: 'bookings',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            onClick={() => onNavigateToTab && onNavigateToTab(card.tab)}
            className={`p-5 rounded-2xl bg-white border ${card.borderColor} shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
              card.highlight ? 'ring-2 ring-amber-400 bg-amber-50/20' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`w-8 h-8 rounded-lg ${card.bgColor} ${card.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-serif font-bold text-[#27272A] tracking-tight group-hover:text-[#800020] transition-colors">
                {card.value}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#71717A]">
              <span>{card.sub}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#800020]" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
