import React, { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryItem } from '../../types/booking'

interface GalleryLightboxProps {
  items: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentItem = items[currentIndex]

  // Keyboard support: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length)
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    // Prevent background scrolling while lightbox is active
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [currentIndex, items.length, onClose, onNavigate])

  if (!currentItem) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Lightbox Container - stopPropagation so clicking image doesn't close */}
      <div 
        className="relative max-w-5xl w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Title & Close button */}
        <div className="w-full flex items-center justify-between pb-3 text-white border-b border-white/10 mb-3">
          <div className="text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#DFBF77]">
              {currentItem.title}
            </h4>
            <span className="text-xs text-white/70">
              Photo {currentIndex + 1} of {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Image with Navigation Buttons */}
        <div className="relative w-full flex items-center justify-center group">
          
          {/* Previous Button */}
          <button
            onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
            className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 hover:bg-[#800020] text-white border border-white/20 transition-all cursor-pointer"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Display */}
          <div className="max-h-[70vh] sm:max-h-[75vh] overflow-hidden rounded-xl shadow-2xl border border-white/20 bg-black flex items-center justify-center">
            <img
              src={currentItem.imageUrl}
              alt={currentItem.alt}
              className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = currentItem.fallbackUrl
              }}
            />
          </div>

          {/* Next Button */}
          <button
            onClick={() => onNavigate((currentIndex + 1) % items.length)}
            className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 hover:bg-[#800020] text-white border border-white/20 transition-all cursor-pointer"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
            {currentItem.description}
          </p>
          <p className="text-[11px] text-white/50 mt-1">
            Use keyboard ← / → arrows to navigate • Press ESC to close
          </p>
        </div>

      </div>
    </div>
  )
}
