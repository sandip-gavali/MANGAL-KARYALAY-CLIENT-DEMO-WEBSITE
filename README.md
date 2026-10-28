# Shree Mangalmurti Mangal Karyalay — Client Demo Website

> **A Beautiful Space for Your Special Moments**  
> *Solapur, Maharashtra, India*

A complete, responsive client presentation demo website for an authentic Indian Mangal Karyalay (wedding hall / banquet hall / celebration venue). Built with React, Vite, TypeScript, and Tailwind CSS with local browser persistence (`localStorage`) and ready for immediate deployment on Vercel.

---

## 🌟 Key Features

### 🏛️ Customer-Facing Experience
- **Royal Indian Wedding Aesthetics**: Curated color palette with warm ivory/cream backgrounds (`#FDFBF7`), deep maroon accents (`#800020`), muted gold borders (`#C5A059`), and Cormorant Garamond serif headings.
- **Hero & Key Venue Facts**: Showcases grand hall capacity (up to 500 guests), 12,500 sq.ft. area, 150+ vehicle parking, starting price from ₹50,000/day, and authentic Devnagari headers.
- **Facilities & Amenities**: Detailed breakdown of the main banquet hall, decorated wedding stage, guest seating, catering & dining hall, private AC bridal & groom dressing suites, and power backup.
- **Interactive Photo Gallery with Lightbox**:
  - Filter by category: All, Main Banquet Hall, Stage & Mandap, Guest Seating, Dining, and Bridal Suite.
  - Fullscreen click-to-expand lightbox with navigation arrows, captions, and keyboard shortcuts (`←`, `→`, `ESC`).
- **Live Date Availability Checker & Booking Enquiry Form**:
  - Real-time date availability badge (✓ Available, ✗ Unavailable / Already Booked, ✗ Reserved for Maintenance).
  - Past dates disabled automatically.
  - Indian 10-digit mobile number validation.
  - Guest attendance slider (50 to 500 guests).
  - Duplicate booking and enquiry prevention.
- **Booking Confirmation Modal**:
  - Confetti celebration upon enquiry submission.
  - Unique Reference ID generator (e.g., `SMK-2026-XXXX`) with 1-click clipboard copy.
  - Clear notice explaining that enquiries require owner approval before confirmation.
  - Direct WhatsApp button prefilled with enquiry details.
- **Floating WhatsApp Quick Action**: Pulsing button for instant manager communication.

---

### 🛡️ Owner Admin Dashboard (`/admin`)
- **Presentation-Safe Demo Login Gate**:
  - **Username:** `demo@shreemangalmurti.in`
  - **Password:** `Demo@123`
  - Includes a 1-click **"Auto-fill Credentials"** helper for smooth client demonstrations.
- **Executive Overview KPIs**:
  - Total Enquiries, Pending Enquiries, Confirmed Bookings, Rejected Enquiries, Blocked Dates, and Projected Hall Revenue.
- **Booking Management**:
  - Comprehensive desktop table and mobile-friendly card list.
  - Search by customer name, mobile number, or enquiry ID.
  - Filter by status (All, Pending, Confirmed, Rejected) and Event Type.
  - Sort by earliest event date, submission date, or guest count.
  - Actions: **View Details Modal**, **Confirm Booking** (with automatic conflict check), **Reject Enquiry**, and **Cancel Confirmed Booking** (with confirmation dialog).
  - Private owner internal notes editor (e.g. record advance payments, caterer contacts).
- **Interactive Monthly Calendar**:
  - Visual monthly matrix with previous/next month controls and "Today" quick jump.
  - Multi-indicator badges: Confirmed (Maroon), Pending (Amber), Blocked (Dark), and Open (Green).
  - Selected-date details panel with instant status inspection and 1-click date blocking/unblocking.
- **Date Management & Blackout Dates**:
  - Block dates for hall maintenance, deep cleaning, or private family events.
  - Prevents blocking dates that already have a confirmed booking.
  - View and unblock reserved dates at any time.
- **Venue Settings Manager**:
  - Edit venue name, Marathi title, tagline, phone, email, street address, city, capacity, starting price, and floor area.
  - Interactive facility tag editor (add/remove amenities).
  - Changes persist in `localStorage` and immediately reflect across the public website.
- **Demo Data Reset**:
  - 1-click **"Reset Demo Data"** action with confirmation modal to restore original sample records at any point during presentation.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component hierarchy & hooks |
| **Vite 8** | High-speed frontend build tool and dev server |
| **TypeScript** | Type-safe data models, interfaces, and validation |
| **Tailwind CSS v4** | Custom design system, typography, and responsive utilities |
| **React Router v7** | Client-side routing (`/` and `/admin`) |
| **Lucide React** | Clean, accessible iconography |
| **Canvas Confetti** | Celebratory booking confirmation effects |
| **Browser localStorage** | Zero-dependency client-side data persistence |
| **Vercel** | Static hosting with SPA rewrite configuration |

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended, tested on Node v24)
- npm (v9.0.0 or higher)

### 1. Clone or Open Workspace
```bash
cd Function_Hall
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 4. Build for Production
```bash
npm run build
```
This runs TypeScript checking and bundles the production assets into `dist/`.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🌐 Vercel Deployment Instructions

This repository is pre-configured for static frontend hosting on Vercel.

### Option A: Deploy via Vercel Dashboard (Recommended)
1. Push this project to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will automatically detect **Vite**.
5. Build and Output Settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```
Follow the interactive prompts (use default options).

### ⚙️ Vercel Routing Configuration (`vercel.json`)
The included `vercel.json` provides the necessary Single Page Application (SPA) rewrite:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This ensures direct URLs (such as `/admin`) and page refreshes work smoothly without 404 errors.

---

## 🧪 Acceptance Testing Checklist

All tests below have been executed and verified in browser testing:

- [x] **Homepage Loads Successfully**: Title, fonts (Cormorant Garamond, Plus Jakarta Sans, Cinzel), and hero imagery render cleanly.
- [x] **Navigation & Smooth Scrolling**: All header links ("Home", "About", "Facilities", "Gallery", "Book a Date", "Contact") scroll directly to their respective sections.
- [x] **Photo Gallery & Lightbox**:
  - Image categorization filters work.
  - Clicking any image opens the high-resolution lightbox with caption and counter.
  - Left / Right arrows navigate between photographs; close button and ESC key dismiss modal.
- [x] **Booking Enquiry Form**:
  - Validates required fields and enforces 10-digit Indian mobile format.
  - Restricts selecting past dates.
  - Dynamically displays real-time date availability badge (Green for available, Red for booked/blocked).
  - Disables form submission when the chosen date is unavailable.
- [x] **Booking Submission Journey**:
  - Generates unique Enquiry Reference ID (`SMK-2026-XXXX`).
  - Launches celebratory confetti animation.
  - Displays confirmation modal with booking details, disclaimer, and direct WhatsApp contact link.
- [x] **Demo Admin Login**:
  - Screen opens at `/admin` with clear "DEMO MODE" notice.
  - Auto-fill credentials button populates `demo@shreemangalmurti.in` and `Demo@123`.
  - Authentication redirects into the dashboard.
- [x] **Enquiry Management & State Transitions**:
  - Newly submitted enquiry appears immediately in the table under `Pending` status.
  - Confirming an enquiry updates status to `Confirmed`, updates KPI counters, and reserves that date.
  - Conflict checking prevents confirming an enquiry if the date is already booked or blocked.
  - Cancelling a confirmed booking frees up the date for subsequent bookings.
- [x] **Monthly Calendar**:
  - Renders days for current and future months.
  - Displays distinct indicators for confirmed bookings, pending enquiries, blocked dates, and today.
  - Selecting any date displays a detailed schedule panel with quick action buttons.
- [x] **Date Blocking Management**:
  - Allows venue owner to block available dates with a reason.
  - Validates that a date with an existing confirmed booking cannot be blocked.
  - Unblock action restores date availability.
- [x] **Venue Settings Persistence**:
  - Venue name, capacity, contact details, and prices can be edited and saved.
  - Updates persist in `localStorage` and immediately reflect on the public website.
- [x] **Reset Demo Data**:
  - "Reset Demo Data" button prompts for confirmation and restores initial seed records.
- [x] **Mobile Responsiveness**:
  - Tested at 375px, 430px, 768px, and 1440px viewports.
  - Mobile hamburger navigation drawer opens and closes smoothly.
  - Tables collapse into clean, readable card views.
  - Zero horizontal overflow.
- [x] **Production Build**:
  - `npm run build` runs cleanly with exit code 0 and bundles all assets.

---

## 📌 Architecture & Demo Limitations

> [!NOTE]
> **Client Presentation Notice**: This deliverable is a self-contained demonstration prototype designed to show the venue owner and prospective clients the complete customer booking journey and administrative workflow without requiring server setup, external database credentials, or paid cloud APIs.

### Current Demo Architecture
- Data is stored locally in the user's browser via **`localStorage`**.
- Because data is local to each browser session:
  - Changes made in one browser/device do not automatically synchronize to another device.
  - Clearing browser data resets the state back to defaults.

### Production Roadmap & Next Steps
Before final commercial business launch:
1. **Backend Database**: Connect to a managed backend (such as Supabase PostgreSQL or a custom Node/PHP REST API) to ensure shared concurrent booking consistency across all devices.
2. **Secure Authentication**: Replace the demo frontend login gate with secure Supabase Auth or JWT-based session tokens with role-based access control.
3. **Payment Gateway**: Integrate Razorpay or Cashfree to collect advance token payments (e.g. ₹10,000 to ₹25,000) online.
4. **Automated SMS & WhatsApp Alerts**: Connect to WhatsApp Business API (Twilio or Wati) to send automated booking confirmations and muhurta reminders to customers.
5. **Client Photography**: Replace the demo venue photos with high-resolution photography from the venue owner's actual facility.
#   M A N G A L - K A R Y A L A Y - C L I E N T - D E M O - W E B S I T E  
 #   M A N G A L - K A R Y A L A Y - C L I E N T - D E M O - W E B S I T E  
 