import React from 'react'
import { Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react'
import { VenueSettings } from '../../types/booking'

interface AboutSectionProps {
  settings: VenueSettings
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  const highlights = [
    {
      title: 'Auspicious Sacred Ambience',
      desc: 'Designed with Vastu-compliant architecture, traditional wooden carved mandaps, and serene spiritual aura.',
    },
    {
      title: 'Hygienic Catering & Dining Facilities',
      desc: 'Spacious 250-seat dining area with dedicated clean water, modern serving counters, and Maharaj cooking stations.',
    },
    {
      title: 'Comfortable VIP & Bridal Suites',
      desc: 'Fully air-cooled dressing rooms with mirrors, attached washrooms, and secure storage for family jewelry.',
    },
    {
      title: 'Convenient Solapur Highway Access',
      desc: 'Easy to locate on the Pune-Solapur Highway with ample parking space and seamless public transport connectivity.',
    },
  ]

  return (
    <section id="about" className="py-24 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#800020]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#800020]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            About Our Mangal Karyalay
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#27272A] tracking-tight leading-tight">
            Where Traditions Blossom into <span className="text-[#800020] italic font-serif">Timeless Memories</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020] mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage with Royal Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/mandap-ceremony.jpg"
                  alt="Traditional Maharashtrian Wedding Mandap at Shree Mangalmurti Mangal Karyalay"
                  className="w-full h-[400px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://cdn.pixabay.com/photo/2016/02/27/20/30/wedding-1226230_1280.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#DFBF77]">
                    Traditional Vedic Weddings
                  </span>
                  <p className="text-sm font-serif font-medium">
                    Auspicious Mandap setup with samai and sacred havan kund
                  </p>
                </div>
              </div>

              {/* Inset Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#C5A059]/40 max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#800020] text-[#DFBF77] flex items-center justify-center font-serif text-lg font-bold">
                    15+
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#27272A]">Years of Trust</div>
                    <div className="text-[11px] text-[#71717A]">Solapur's Family Favorite</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-[#52525B] leading-relaxed">
              <p>
                <strong className="text-[#27272A] font-semibold">{settings.venueName}</strong> was founded with a singular noble vision: to provide Solapur families with an expansive, culturally respectful, and stress-free venue for their most precious milestones.
              </p>
              <p>
                Whether you are planning a traditional Maharashtrian Vedic wedding, a joyous Sakharpuda engagement, a vibrant Sangeet evening, or a thread ceremony, our air-cooled halls and thoughtful hospitality ensure that your guests feel honoured and comfortable.
              </p>
            </div>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-4 rounded-xl border border-[#F5EFEB] shadow-sm hover:border-[#C5A059]/50 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#800020] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#27272A] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#71717A] leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Location callout */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/30 text-xs text-[#27272A]">
              <MapPin className="w-5 h-5 text-[#800020] flex-shrink-0" />
              <span>
                <strong>Convenient Location:</strong> {settings.address}, {settings.city}. Nearby landmarks: Solapur Old Naka & Bus Depot.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
