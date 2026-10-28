import React from 'react'
import { CalendarCheck, Eye, MapPin, Users, Sparkles, CheckCircle2 } from 'lucide-react'
import { VenueSettings } from '../../types/booking'
import { formatIndianCurrency } from '../../utils/formatters'

interface HeroSectionProps {
  settings: VenueSettings
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) {
      const navHeight = 80
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight
      window.scrollTo({ top: pos, behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/venue-exterior.jpg"
          alt="Shree Mangalmurti Mangal Karyalay Entrance Facade"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in zoom-in-95 duration-1000"
          onError={(e) => {
            // Fallback if local image fails
            e.currentTarget.src = 'https://cdn.pixabay.com/photo/2016/02/27/20/30/wedding-1226230_1280.jpg'
          }}
        />
        {/* Multilayered Regal Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#26050C] via-[#4A0814]/85 to-[#26050C]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Decorative Gold Border Frame */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-[#C5A059]/30 rounded-2xl pointer-events-none z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 py-20 text-center text-white">
        
        {/* Top Auspicious Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800020]/80 backdrop-blur-md border border-[#C5A059]/50 text-[#FAF3E1] text-xs sm:text-sm font-medium mb-6 shadow-lg animate-in slide-in-from-bottom duration-700">
          <Sparkles className="w-4 h-4 text-[#DFBF77]" />
          <span>|| श्री गणेशाय नमः ||</span>
          <span className="text-[#C5A059]">•</span>
          <span className="text-[#DFBF77] font-semibold">{settings.marathiName}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif text-white tracking-tight leading-[1.15] mb-4">
          Celebrate Your <span className="text-[#E5C365] italic font-serif">Special Moments</span> With Us
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-base sm:text-xl text-[#FAF3E1]/90 max-w-3xl mx-auto font-sans font-light leading-relaxed mb-8">
          Solapur's most prestigious wedding hall & banquet destination for sacred marriages, joyful engagements, grand receptions, and cherished family gatherings.
        </p>

        {/* Highlight Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 text-xs sm:text-sm">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-[#C5A059]/30 text-[#FAF3E1]">
            <Users className="w-4 h-4 text-[#DFBF77]" />
            <span>Up to {settings.capacity} Guests</span>
          </div>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-[#C5A059]/30 text-[#FAF3E1]">
            <MapPin className="w-4 h-4 text-[#DFBF77]" />
            <span>{settings.city}, Maharashtra</span>
          </div>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-[#C5A059]/30 text-[#FAF3E1]">
            <CheckCircle2 className="w-4 h-4 text-[#DFBF77]" />
            <span>From {formatIndianCurrency(settings.startingPrice)} / day</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => scrollTo('#booking')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#800020] via-[#9B1B30] to-[#800020] hover:from-[#5B0E1E] hover:to-[#800020] border border-[#C5A059]/60 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <CalendarCheck className="w-5 h-5 text-[#DFBF77]" />
            <span>Check Date Availability</span>
          </button>

          <button
            onClick={() => scrollTo('#about')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-semibold text-[#FAF3E1] bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#C5A059] transition-all duration-300 cursor-pointer"
          >
            <Eye className="w-5 h-5 text-[#DFBF77]" />
            <span>Explore Our Venue</span>
          </button>
        </div>

      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none opacity-80">
        <span className="block text-[11px] text-[#DFBF77] font-medium tracking-widest uppercase mb-1">
          Scroll Down
        </span>
        <div className="w-4 h-7 mx-auto border-2 border-[#DFBF77]/60 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-[#DFBF77] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
