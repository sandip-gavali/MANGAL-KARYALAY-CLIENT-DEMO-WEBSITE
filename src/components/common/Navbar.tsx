import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Phone, CalendarCheck, ShieldCheck } from 'lucide-react'
import { VenueSettings } from '../../types/booking'

interface NavbarProps {
  settings: VenueSettings
}

export const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + id)
      return
    }
    const element = document.querySelector(id)
    if (element) {
      const navHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-md border-b border-[#C5A059]/30 py-3' 
          : 'bg-[#FDFBF7] border-b border-[#F5EFEB] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group text-left"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Elegant Emblem */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#800020] to-[#5B0E1E] flex items-center justify-center text-[#DFBF77] shadow-sm border border-[#C5A059]/40 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="font-royal text-xl font-bold tracking-tighter">ॐ</span>
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-[#800020] uppercase tracking-widest font-sans">
                {settings.marathiName}
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-[#27272A] tracking-tight font-serif leading-tight">
                {settings.venueName}
              </h1>
              <span className="block text-[11px] text-[#71717A] tracking-normal font-sans">
                {settings.city}, {settings.state} • Up to {settings.capacity} Guests
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => scrollToSection('#hero')}
              className="text-sm font-medium text-[#27272A] hover:text-[#800020] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('#about')}
              className="text-sm font-medium text-[#27272A] hover:text-[#800020] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('#facilities')}
              className="text-sm font-medium text-[#27272A] hover:text-[#800020] transition-colors cursor-pointer"
            >
              Facilities
            </button>
            <button
              onClick={() => scrollToSection('#gallery')}
              className="text-sm font-medium text-[#27272A] hover:text-[#800020] transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('#booking')}
              className="text-sm font-medium text-[#27272A] hover:text-[#800020] transition-colors cursor-pointer"
            >
              Book a Date
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="text-sm font-medium text-[#27272A] hover:text-[#800020] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#800020] bg-[#800020]/8 hover:bg-[#800020]/15 transition-all border border-[#800020]/20"
              title="Call Mangal Karyalay Manager"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>

            <button
              onClick={() => scrollToSection('#booking')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#800020] to-[#9B1B30] hover:from-[#5B0E1E] hover:to-[#800020] transition-all shadow-sm hover:shadow hover:scale-[1.02] cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#DFBF77]" />
              <span>Check Availability</span>
            </button>

            <Link
              to="/admin"
              className="p-2 rounded-lg text-[#71717A] hover:text-[#800020] hover:bg-[#F5EFEB] transition-colors"
              title="Demo Admin Login"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => scrollToSection('#booking')}
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#800020]"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#DFBF77]" />
              <span>Book</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#27272A] hover:text-[#800020] hover:bg-[#F5EFEB] focus:outline-none focus:ring-2 focus:ring-[#800020]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#C5A059]/30 bg-[#FDFBF7] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 font-medium">
            <button
              onClick={() => scrollToSection('#hero')}
              className="text-left px-3 py-2 rounded-md text-[#27272A] hover:bg-[#F5EFEB] hover:text-[#800020] text-sm"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('#about')}
              className="text-left px-3 py-2 rounded-md text-[#27272A] hover:bg-[#F5EFEB] hover:text-[#800020] text-sm"
            >
              About Venue
            </button>
            <button
              onClick={() => scrollToSection('#facilities')}
              className="text-left px-3 py-2 rounded-md text-[#27272A] hover:bg-[#F5EFEB] hover:text-[#800020] text-sm"
            >
              Facilities & Amenities
            </button>
            <button
              onClick={() => scrollToSection('#gallery')}
              className="text-left px-3 py-2 rounded-md text-[#27272A] hover:bg-[#F5EFEB] hover:text-[#800020] text-sm"
            >
              Photo Gallery
            </button>
            <button
              onClick={() => scrollToSection('#booking')}
              className="text-left px-3 py-2 rounded-md text-[#800020] font-semibold bg-[#800020]/10 text-sm"
            >
              Check Date & Book Enquiry
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="text-left px-3 py-2 rounded-md text-[#27272A] hover:bg-[#F5EFEB] hover:text-[#800020] text-sm"
            >
              Contact & Location
            </button>
            
            <div className="pt-3 border-t border-[#F5EFEB] flex flex-col gap-2">
              <a 
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-[#800020] bg-[#800020]/10"
              >
                <Phone className="w-4 h-4" />
                <span>Call {settings.phone}</span>
              </a>

              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-[#71717A] hover:text-[#800020] bg-stone-100"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Demo Admin Login (Owner Portal)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
