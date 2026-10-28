import React from 'react'
import { Sparkles, Heart, Users, Cake, GlassWater, Landmark } from 'lucide-react'

export const EventTypesSection: React.FC = () => {
  const events = [
    {
      title: 'Weddings (विवाह समारंभ)',
      tagline: 'Vedic rituals, grand baraat & mandap ceremony',
      icon: Heart,
      desc: 'Complete arrangements for haldi, sangeet, wedding muhurta, and traditional feast for up to 500 guests.',
      badge: 'Most Popular',
    },
    {
      title: 'Receptions (स्वागत समारंभ)',
      tagline: 'Grand evening celebratory gathering',
      icon: Sparkles,
      desc: 'Dazzling stage lighting, VIP guest greetings, photo-booths, and grand buffet dinner catering setup.',
      badge: 'Evening Galas',
    },
    {
      title: 'Engagements (साखरपुडा)',
      tagline: 'Intimate rings & family blessings',
      icon: Users,
      desc: 'Warm family seating, floral ring ceremony backdrop, sweet distribution counters, and hi-tea arrangements.',
      badge: 'Family Milestone',
    },
    {
      title: 'Thread Ceremony (उपनयन / मुंज)',
      tagline: 'Sacred rite of passage Vedic rituals',
      icon: Landmark,
      desc: 'Purification rituals, matrubhojan arrangements, priest coordination, and traditional Maharashtrian cuisine.',
      badge: 'Sacred Ritual',
    },
    {
      title: 'Birthdays & Anniversaries',
      tagline: 'Milestone 50th, 60th Shashtipoorthi',
      icon: Cake,
      desc: 'Spacious dance and games area, cake cutting podium, themed balloon/floral decor, and delightful dining.',
      badge: 'Celebrations',
    },
    {
      title: 'Corporate & Cultural Gatherings',
      tagline: 'Annual meetings, seminars & festivals',
      icon: GlassWater,
      desc: 'Audio-visual stage presentation setup, podium, comfortable theater-style seating, and tea-snack breaks.',
      badge: 'Community Events',
    },
  ]

  return (
    <section className="py-20 bg-[#FAF7F2] border-y border-[#C5A059]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#800020]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Events We Host
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#27272A] tracking-tight">
            Every Occasion Deserves a <span className="text-[#800020] italic font-serif">Royal Setting</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#71717A] max-w-2xl mx-auto">
            From auspicious Vedic wedding rituals to joyful family anniversaries, our hall seamlessly transforms to accommodate your celebrations.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020] mx-auto mt-4 rounded-full" />
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => {
            const Icon = event.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-[#F5EFEB] hover:border-[#C5A059]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#800020]/10 text-[#800020] group-hover:bg-[#800020] group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#F5EFEB] text-[#800020]">
                      {event.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#27272A] group-hover:text-[#800020] transition-colors mb-1">
                    {event.title}
                  </h3>
                  <div className="text-xs font-medium text-[#C5A059] mb-3">
                    {event.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
