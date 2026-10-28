import React, { useState, useEffect } from 'react'
import { 
  Inbox, 
  Calendar, 
  ShieldAlert, 
  Settings, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react'
import { 
  getBookings, 
  getBlockedDates, 
  getVenueSettings, 
  updateBookingStatus, 
  cancelConfirmedBooking, 
  blockDate, 
  unblockDate, 
  saveVenueSettings, 
  isDemoAdminAuthenticated, 
  setDemoAdminAuthenticated,
  initializeStorage
} from '../services/storageService'
import { BookingEnquiry, BlockedDate, VenueSettings } from '../types/booking'
import { AdminLoginModal } from '../components/admin/AdminLoginModal'
import { AdminHeader } from '../components/admin/AdminHeader'
import { AdminOverviewCards } from '../components/admin/AdminOverviewCards'
import { AdminBookingsTable } from '../components/admin/AdminBookingsTable'
import { AdminCalendarView } from '../components/admin/AdminCalendarView'
import { AdminDateBlocking } from '../components/admin/AdminDateBlocking'
import { AdminVenueSettings } from '../components/admin/AdminVenueSettings'

type AdminTab = 'bookings' | 'calendar' | 'blocked' | 'settings'

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isDemoAdminAuthenticated)
  const [activeTab, setActiveTab] = useState<AdminTab>('bookings')
  const [bookings, setBookings] = useState<BookingEnquiry[]>(getBookings)
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>(getBlockedDates)
  const [settings, setSettings] = useState<VenueSettings>(getVenueSettings)
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const reloadData = () => {
    setBookings(getBookings())
    setBlockedDates(getBlockedDates())
    setSettings(getVenueSettings())
  }

  useEffect(() => {
    initializeStorage()
    reloadData()

    const handleStorageUpdate = () => reloadData()
    window.addEventListener('smk_storage_updated', handleStorageUpdate)
    return () => window.removeEventListener('smk_storage_updated', handleStorageUpdate)
  }, [])

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleLogout = () => {
    setDemoAdminAuthenticated(false)
    setIsAuthenticated(false)
  }

  // Booking Actions
  const handleConfirm = (id: string) => {
    const res = updateBookingStatus(id, 'confirmed')
    if (res.success) {
      showToast(res.message, 'success')
      reloadData()
    } else {
      showToast(res.message, 'error')
    }
  }

  const handleReject = (id: string) => {
    const res = updateBookingStatus(id, 'rejected')
    if (res.success) {
      showToast(res.message, 'success')
      reloadData()
    } else {
      showToast(res.message, 'error')
    }
  }

  const handleCancelConfirmed = (id: string, reason: string) => {
    const res = cancelConfirmedBooking(id, reason)
    if (res.success) {
      showToast(res.message, 'success')
      reloadData()
    } else {
      showToast(res.message, 'error')
    }
  }

  const handleUpdateNotes = (id: string, notes: string) => {
    const target = bookings.find(b => b.id === id)
    if (target) {
      updateBookingStatus(id, target.status, notes)
      showToast('Internal note saved.', 'success')
      reloadData()
    }
  }

  // Date Blocking Actions
  const handleBlockDate = (date: string, reason: string) => {
    const res = blockDate(date, reason)
    if (res.success) {
      reloadData()
    }
    return res
  }

  const handleUnblockDate = (date: string) => {
    const res = unblockDate(date)
    if (res.success) {
      reloadData()
    }
    return res
  }

  // Settings Actions
  const handleSaveSettings = (updated: VenueSettings) => {
    saveVenueSettings(updated)
    setSettings(updated)
    showToast('Venue settings successfully updated.', 'success')
  }

  if (!isAuthenticated) {
    return <AdminLoginModal onSuccess={() => setIsAuthenticated(true)} />
  }

  const pendingCount = bookings.filter(b => b.status === 'pending').length

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col antialiased">
      <AdminHeader
        settings={settings}
        onLogout={handleLogout}
        onDataReset={() => {
          reloadData()
          showToast('Demo data restored to initial state.', 'success')
        }}
      />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top duration-300">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-semibold ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Summary Cards */}
        <AdminOverviewCards
          bookings={bookings}
          blockedDates={blockedDates}
          settings={settings}
          onNavigateToTab={(tab) => setActiveTab(tab as AdminTab)}
        />

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-[#800020] text-[#800020] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries & Bookings</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px]">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'border-[#800020] text-[#800020] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Monthly Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('blocked')}
            className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'blocked'
                ? 'border-[#800020] text-[#800020] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Blocked Dates</span>
            {blockedDates.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-bold text-[10px]">
                {blockedDates.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#800020] text-[#800020] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Venue Settings</span>
          </button>
        </div>

        {/* Tab Panes */}
        {activeTab === 'bookings' && (
          <AdminBookingsTable
            bookings={bookings}
            settings={settings}
            onConfirm={handleConfirm}
            onReject={handleReject}
            onCancelConfirmed={handleCancelConfirmed}
            onUpdateNotes={handleUpdateNotes}
          />
        )}

        {activeTab === 'calendar' && (
          <AdminCalendarView
            bookings={bookings}
            blockedDates={blockedDates}
            settings={settings}
            onBlockDate={handleBlockDate}
            onUnblockDate={handleUnblockDate}
            onConfirm={handleConfirm}
            onReject={handleReject}
            onCancelConfirmed={handleCancelConfirmed}
            onUpdateNotes={handleUpdateNotes}
          />
        )}

        {activeTab === 'blocked' && (
          <AdminDateBlocking
            blockedDates={blockedDates}
            bookings={bookings}
            onBlockDate={handleBlockDate}
            onUnblockDate={handleUnblockDate}
          />
        )}

        {activeTab === 'settings' && (
          <AdminVenueSettings
            settings={settings}
            onSave={handleSaveSettings}
          />
        )}

      </main>
    </div>
  )
}
