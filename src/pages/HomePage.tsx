import React, { useState, useEffect } from 'react'
import { DemoNoticeBanner } from '../components/common/DemoNoticeBanner'
import { Navbar } from '../components/common/Navbar'
import { Footer } from '../components/common/Footer'
import { FloatingWhatsApp } from '../components/common/FloatingWhatsApp'
import { HeroSection } from '../components/customer/HeroSection'
import { KeyFacts } from '../components/customer/KeyFacts'
import { AboutSection } from '../components/customer/AboutSection'
import { FacilitiesSection } from '../components/customer/FacilitiesSection'
import { EventTypesSection } from '../components/customer/EventTypesSection'
import { GallerySection } from '../components/customer/GallerySection'
import { BookingEnquirySection } from '../components/customer/BookingEnquirySection'
import { ContactSection } from '../components/customer/ContactSection'
import { getVenueSettings } from '../services/storageService'
import { VenueSettings } from '../types/booking'

export const HomePage: React.FC = () => {
  const [settings, setSettings] = useState<VenueSettings>(getVenueSettings)

  useEffect(() => {
    const handleStorageUpdate = () => {
      setSettings(getVenueSettings())
    }
    window.addEventListener('smk_storage_updated', handleStorageUpdate)
    return () => window.removeEventListener('smk_storage_updated', handleStorageUpdate)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <DemoNoticeBanner />
      <Navbar settings={settings} />
      <main className="flex-1">
        <HeroSection settings={settings} />
        <KeyFacts settings={settings} />
        <AboutSection settings={settings} />
        <FacilitiesSection settings={settings} />
        <EventTypesSection />
        <GallerySection />
        <BookingEnquirySection settings={settings} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp phone={settings.phone} venueName={settings.venueName} />
    </div>
  )
}
