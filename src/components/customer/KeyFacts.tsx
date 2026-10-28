import React from 'react'
import { Users, Maximize2, Car, Award } from 'lucide-react'
import { VenueSettings } from '../../types/booking'

interface KeyFactsProps {
  settings: VenueSettings
}

export const KeyFacts: React.FC<KeyFactsProps> = ({ settings }) => {
  const stats = [
    {
      icon: Users,
      value: `Up to ${settings.capacity}`,
      label: 'Guest Seating Capacity',
      sub: 'Comfortable cushioned banquet seating',
    },
    {
      icon: Maximize2,
      value: settings.hallArea || '12,500 sq.ft.',
      label: 'Spacious Grand Hall',
      sub: 'Pillarless structure with high ceiling',
    },
    {
      icon: Car,
      value: '150+ Vehicles',
      label: 'Dedicated Parking Space',
      sub: 'Secure on-premises valet & guest parking',
    },
    {
      icon: Award,
      value: '800+ Events',
      label: 'Cherished Celebrations',
      sub: 'Over 15 years of trusted hospitality',
    },
  ]

  return (
    <section className="relative -mt-10 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-xl border border-[#C5A059]/25 hover:border-[#800020]/40 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center group-hover:bg-[#800020] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-[#27272A] tracking-tight group-hover:text-[#800020] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-[#800020] uppercase tracking-wider font-sans">
                    {stat.label}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#71717A] leading-relaxed">
                {stat.sub}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
