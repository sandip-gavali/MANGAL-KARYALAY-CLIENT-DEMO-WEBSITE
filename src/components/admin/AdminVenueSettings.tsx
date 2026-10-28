import React, { useState } from 'react'
import { 
  Building2, 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  IndianRupee, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  RotateCcw
} from 'lucide-react'
import { VenueSettings } from '../../types/booking'
import { DEFAULT_VENUE_SETTINGS } from '../../data/seedData'
import { formatIndianCurrency } from '../../utils/formatters'

interface AdminVenueSettingsProps {
  settings: VenueSettings
  onSave: (updated: VenueSettings) => void
}

export const AdminVenueSettings: React.FC<AdminVenueSettingsProps> = ({
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<VenueSettings>(settings)
  const [newFacility, setNewFacility] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'startingPrice' ? parseInt(value, 10) || 0 : value,
    }))
  }

  const handleAddFacility = () => {
    if (!newFacility.trim()) return
    if (!formData.facilities.includes(newFacility.trim())) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, newFacility.trim()],
      }))
      setNewFacility('')
    }
  }

  const handleRemoveFacility = (facilityToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter(f => f !== facilityToRemove),
    }))
  }

  const handleResetToDefaults = () => {
    setFormData(DEFAULT_VENUE_SETTINGS)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setSuccessMessage('Venue settings saved successfully! Public website updated.')
    setTimeout(() => setSuccessMessage(''), 4000)
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#C5A059]/25 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
            Live Venue Information
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#27272A]">
            Venue Details & Public Pricing
          </h3>
          <p className="text-xs text-[#71717A] mt-1">
            Modifications saved here persist in browser storage and immediately reflect on the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetToDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Venue Defaults</span>
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Row 1: Venue English & Marathi Names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Venue Name (English)
            </label>
            <input
              type="text"
              required
              name="venueName"
              value={formData.venueName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Venue Marathi Title (देवनागरी)
            </label>
            <input
              type="text"
              required
              name="marathiName"
              value={formData.marathiName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none font-sans"
            />
          </div>
        </div>

        {/* Row 2: Tagline */}
        <div>
          <label className="block text-xs font-semibold text-[#27272A] mb-1">
            Marketing Tagline
          </label>
          <input
            type="text"
            required
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
          />
        </div>

        {/* Row 3: Capacity & Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Guest Capacity (Max Guests)
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                required
                min={50}
                max={2000}
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Starting Price (₹ per day)
            </label>
            <div className="relative">
              <span className="text-xs font-bold text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2">
                ₹
              </span>
              <input
                type="number"
                required
                step={5000}
                min={10000}
                name="startingPrice"
                value={formData.startingPrice}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
              />
            </div>
            <span className="text-[10px] text-stone-500 mt-1 block">
              Formatted: {formatIndianCurrency(formData.startingPrice)}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Hall Floor Area
            </label>
            <input
              type="text"
              name="hallArea"
              value={formData.hallArea}
              onChange={handleChange}
              placeholder="e.g. 12,500 sq.ft."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
            />
          </div>
        </div>

        {/* Row 4: Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Contact Phone (Calls & WhatsApp)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Row 5: Address, City, State, Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Street / Highway Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              City
            </label>
            <input
              type="text"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-[#27272A] mb-1">
              Pincode
            </label>
            <input
              type="text"
              required
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Facilities Tag Editor */}
        <div className="pt-4 border-t border-stone-200">
          <label className="block text-xs font-semibold text-[#27272A] mb-2">
            Venue Facilities List ({formData.facilities.length})
          </label>
          
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              placeholder="e.g. CCTV Surveillance, 24/7 Power Backup, etc."
              className="flex-1 px-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-[#FDFBF7] focus:border-[#800020] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#800020] hover:bg-[#5B0E1E] flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Facility</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.facilities.map((fac, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-800 font-medium"
              >
                <span>{fac}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFacility(fac)}
                  className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Remove facility"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="pt-6 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#800020] to-[#9B1B30] hover:from-[#5B0E1E] hover:to-[#800020] shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#DFBF77]" />
            <span>Save & Apply Venue Settings</span>
          </button>
        </div>

      </form>
    </div>
  )
}
