import React from 'react'
import { 
  Building2, 
  Crown, 
  Users, 
  Car, 
  UtensilsCrossed, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Music,
  Check
} from 'lucide-react'
import { VenueSettings } from '../../types/booking'

interface FacilitiesSectionProps {
  settings: VenueSettings
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ settings }) => {
  const facilityCards = [
    {
      title: 'Spacious Event Hall',
      marathi: 'भव्य मुख्य सभागृह',
      icon: Building2,
      desc: '12,500 sq.ft. pillarless main event hall with high ceilings, grand chandeliers, and superior natural ventilation.',
      feature: 'Capacity up to 500 guests',
      image: '/images/banquet-hall.jpg',
    },
    {
      title: 'Grand Wedding Stage & Mandap',
      marathi: 'सुशोभित विवाह मंच',
      icon: Crown,
      desc: 'Raised royal stage with pre-fitted traditional backdrop, floral hanging brackets, and havan kund provisions.',
      feature: 'Ready for traditional & modern decor',
      image: '/images/wedding-stage.jpg',
    },
    {
      title: 'Comfortable Guest Seating',
      marathi: 'आरामदायी बैठक व्यवस्था',
      icon: Users,
      desc: 'Ergonomic banquet chairs with clean silk linen covers, wide carpeted aisles, and stage-facing layout.',
      feature: '500+ cushioned chairs with linens',
      image: '/images/hall-seating.jpg',
    },
    {
      title: 'Catering & Dining Hall',
      marathi: 'विशाल जेवण कक्ष व केटरिंग',
      icon: UtensilsCrossed,
      desc: 'Dedicated dining section with stainless steel buffet counters, Maharaj cooking area, and hygienic dishwashing.',
      feature: 'Simultaneous seating for 250 guests',
      image: '/images/catering-dining.jpg',
    },
    {
      title: 'Bridal & Groom Dressing Suites',
      marathi: 'वातानुकूलित वधू-वर कक्ष',
      icon: Sparkles,
      desc: 'Private air-conditioned suites with illuminated vanity mirrors, plush seating, and private attached washrooms.',
      feature: '2 separate private suites',
      image: '/images/bridal-room.jpg',
    },
    {
      title: 'Dedicated Parking Ground',
      marathi: 'विशाल वाहन पार्किंग',
      icon: Car,
      desc: 'Wide concreted on-premises parking ground with security attendants and easy ingress/egress from highway.',
      feature: '150+ cars & 300+ two-wheelers',
      image: '/images/venue-exterior.jpg',
    },
  ]

  const extraAmenities = [
    { icon: Zap, label: '24/7 Heavy Generator Backup' },
    { icon: Music, label: 'JBL Surround Sound & Mic System' },
    { icon: ShieldCheck, label: 'CCTV Security & Guard Support' },
    { icon: Check, label: 'RO Filtered Drinking Water' },
  ]

  return (
    <section id="facilities" className="py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#800020]/20">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            World-Class Facilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#27272A] tracking-tight">
            Designed for Flawless <span className="text-[#800020] italic font-serif">Celebrations</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#71717A] max-w-2xl mx-auto">
            From the grand ceremonial stage to peaceful bridal suites and hygienic dining halls, every corner of {settings.venueName} is curated for family comfort.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020] mx-auto mt-4 rounded-full" />
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilityCards.map((facility, index) => {
            const Icon = facility.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[#C5A059]/25 transition-all duration-300 transform hover:-translate-y-1 group flex flex-col"
              >
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = 'https://cdn.pixabay.com/photo/2016/02/27/20/30/wedding-1226230_1280.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Floating icon */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-[#800020] flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Marathi title badge */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-semibold text-[#DFBF77] block font-sans">
                      {facility.marathi}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white leading-tight">
                      {facility.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-4">
                    {facility.desc}
                  </p>

                  <div className="pt-3 border-t border-[#F5EFEB] flex items-center justify-between text-xs font-medium text-[#800020]">
                    <span className="inline-flex items-center gap-1.5 bg-[#800020]/10 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                      <Check className="w-3.5 h-3.5 text-[#800020]" />
                      {facility.feature}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Amenities Strip */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-md border border-[#C5A059]/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extraAmenities.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#F5EFEB]">
                  <div className="w-8 h-8 rounded-lg bg-[#800020] text-[#DFBF77] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#27272A]">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
