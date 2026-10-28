import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react'
import { VenueSettings } from '../../types/booking'
import { formatIndianCurrency } from '../../utils/formatters'

interface FooterProps {
  settings: VenueSettings
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      const navHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#4A0814] text-[#FAF3E1] border-t-4 border-[#C5A059] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Venue Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#800020] border border-[#C5A059] flex items-center justify-center text-[#DFBF77] font-royal font-bold text-lg">
                ॐ
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                  {settings.venueName}
                </h3>
                <p className="text-xs text-[#DFBF77] font-medium">
                  {settings.marathiName}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#FAF3E1]/80 leading-relaxed">
              "{settings.tagline}" — Solapur's premier destination for sacred weddings, festive engagements, receptions, and family celebrations.
            </p>

            <div className="pt-2 text-xs text-[#DFBF77]">
              Starting from <span className="text-white font-semibold text-sm">{formatIndianCurrency(settings.startingPrice)}</span> / event day
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4 border-b border-[#C5A059]/30 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF3E1]/80">
              <li>
                <button 
                  onClick={() => scrollToSection('#hero')}
                  className="hover:text-[#DFBF77] transition-colors cursor-pointer"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#about')}
                  className="hover:text-[#DFBF77] transition-colors cursor-pointer"
                >
                  About the Karyalay
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#facilities')}
                  className="hover:text-[#DFBF77] transition-colors cursor-pointer"
                >
                  Facilities & Amenities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#gallery')}
                  className="hover:text-[#DFBF77] transition-colors cursor-pointer"
                >
                  Photo Gallery & Ambience
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#booking')}
                  className="hover:text-[#DFBF77] transition-colors font-semibold text-[#DFBF77] cursor-pointer"
                >
                  Check Availability & Book
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-[#DFBF77] transition-colors cursor-pointer"
                >
                  Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Timings */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4 border-b border-[#C5A059]/30 pb-2">
              Contact & Visit
            </h4>
            <div className="space-y-3 text-xs text-[#FAF3E1]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFBF77] flex-shrink-0 mt-0.5" />
                <span>
                  {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFBF77] flex-shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DFBF77] flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#DFBF77] flex-shrink-0" />
                <span>Venue Visits: 9:00 AM – 8:30 PM (Daily)</span>
              </div>
            </div>
          </div>

          {/* Col 4: Demo Portal & Client Notice */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-white mb-4 border-b border-[#C5A059]/30 pb-2">
              Client Demo Portal
            </h4>
            <p className="text-xs text-[#FAF3E1]/80 leading-relaxed">
              This is a working frontend prototype demonstration for client review. All enquiries and date management persist in local browser storage.
            </p>
            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#800020] hover:bg-[#5B0E1E] text-[#DFBF77] hover:text-white rounded text-xs font-semibold border border-[#C5A059]/40 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Venue Owner Admin Login</span>
              </Link>
            </div>
            <div className="text-[11px] text-[#FAF3E1]/60">
              Demo Credentials: <span className="text-[#DFBF77]">demo@shreemangalmurti.in</span> / <span className="text-[#DFBF77]">Demo@123</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#C5A059]/20 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF3E1]/60 gap-4">
          <p>© {currentYear} {settings.venueName}, Solapur. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#E5C365] fill-[#E5C365]" /> for auspicious Indian weddings & celebrations.
          </p>
        </div>
      </div>
    </footer>
  )
}
