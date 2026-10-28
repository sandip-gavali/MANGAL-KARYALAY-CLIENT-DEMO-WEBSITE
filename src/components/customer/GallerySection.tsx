import React, { useState } from 'react'
import { Sparkles, Maximize2, Camera } from 'lucide-react'
import { GALLERY_ITEMS } from '../../data/seedData'
import { GalleryLightbox } from './GalleryLightbox'
import { GalleryItem } from '../../types/booking'

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'hall', label: 'Main Banquet Hall' },
    { id: 'stage', label: 'Stage & Mandap' },
    { id: 'seating', label: 'Guest Seating' },
    { id: 'dining', label: 'Dining & Catering' },
    { id: 'bridal', label: 'Bridal Suite' },
  ]

  const filteredItems: GalleryItem[] = activeFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter)

  const openLightbox = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex(g => g.id === item.id)
    setLightboxIndex(idx !== -1 ? idx : 0)
  }

  return (
    <section id="gallery" className="py-24 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#800020]/20">
            <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
            Visual Tour
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#27272A] tracking-tight">
            Our Splendid <span className="text-[#800020] italic font-serif">Photo Gallery</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#71717A] max-w-2xl mx-auto">
            Take a look inside Shree Mangalmurti Mangal Karyalay — crafted with royal architectural details, vibrant stage setups, and welcoming family banquet spaces.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[#800020] text-white shadow-md border border-[#800020]'
                  : 'bg-white text-[#52525B] hover:text-[#800020] hover:bg-[#FAF7F2] border border-[#E5E7EB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-stone-100 shadow-md hover:shadow-2xl border border-[#C5A059]/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer aspect-[16/10]"
            >
              <img
                src={item.imageUrl}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = item.fallbackUrl
                }}
              />
              
              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Expand Icon Badge */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/30 flex items-center justify-center group-hover:bg-[#800020] group-hover:border-[#DFBF77] transition-all transform group-hover:scale-110">
                <Maximize2 className="w-4 h-4 text-[#DFBF77]" />
              </div>

              {/* Title & Category Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#DFBF77] bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 inline-block mb-1">
                  {item.category.toUpperCase()}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-[#DFBF77] transition-colors leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={GALLERY_ITEMS}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  )
}
