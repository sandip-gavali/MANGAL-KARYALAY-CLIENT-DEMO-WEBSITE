import React from 'react'
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, Calendar } from 'lucide-react'
import { VenueSettings } from '../../types/booking'

interface ContactSectionProps {
  settings: VenueSettings
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  return (
    <section id="contact" className="py-24 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#800020]/20">
            <Navigation className="w-3.5 h-3.5 text-[#C5A059]" />
            Find & Visit Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#27272A] tracking-tight">
            Plan a Visit to <span className="text-[#800020] italic font-serif">Our Venue</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#71717A] max-w-2xl mx-auto">
            We welcome families to tour our hall, view the decorated stage, examine kitchen amenities, and discuss arrangements with our manager in person.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020] mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Address & Location */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-[#F5EFEB] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#27272A] mb-2">
                Venue Location
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
              </p>
              <p className="text-xs text-[#71717A] mt-2">
                Prime access via Pune-Solapur Highway. Near Old Naka & Bus Depot.
              </p>
            </div>
            
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${settings.venueName}, ${settings.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#800020] hover:text-[#5B0E1E]"
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Phone & Helpline */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-[#F5EFEB] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#27272A] mb-2">
                Manager Helpline
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Direct mobile line for muhurta booking enquiries and vendor coordination.
              </p>
              <div className="mt-3">
                <a 
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="font-serif text-xl font-bold text-[#800020] hover:underline"
                >
                  {settings.phone}
                </a>
              </div>
              <p className="text-xs text-[#71717A] mt-1">
                WhatsApp available 24/7 on this number.
              </p>
            </div>

            <div className="mt-6 text-xs text-[#71717A]">
              Contact: Shri Vinayak Patil (Hall Manager)
            </div>
          </div>

          {/* Card 3: Timings & Email */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-[#F5EFEB] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#27272A] mb-2">
                Visiting Hours & Email
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Open for venue walkthroughs daily:
              </p>
              <div className="mt-2 text-xs font-semibold text-[#27272A] space-y-1">
                <p>Monday – Sunday: 9:00 AM – 8:30 PM</p>
                <p>Prior appointment recommended on auspicious days</p>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#52525B]">
                <Mail className="w-3.5 h-3.5 text-[#800020]" />
                <a href={`mailto:${settings.email}`} className="hover:underline">
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="mt-6 text-xs text-[#71717A]">
              Free spacious parking available for visitors
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
