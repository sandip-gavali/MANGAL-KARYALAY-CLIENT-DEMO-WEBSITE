import React from 'react'
import { MessageCircle } from 'lucide-react'

interface FloatingWhatsAppProps {
  phone: string
  venueName: string
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ phone, venueName }) => {
  const cleanPhone = phone.replace(/[^\d]/g, '')
  const intlPhone = cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone
  const message = encodeURIComponent(
    `Namaste! I would like to enquire about date availability and booking packages for ${venueName}.`
  )
  const whatsappUrl = `https://wa.me/${intlPhone}?text=${message}`

  return (
    <div className="fixed bottom-6 right-6 z-30 group flex items-center">
      {/* Tooltip on hover */}
      <div className="hidden sm:block mr-3 px-3 py-1.5 bg-[#27272A] text-white text-xs font-medium rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Chat with us on WhatsApp
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 relative"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 -z-10" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  )
}
