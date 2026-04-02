# 🚀 Developer Quick Reference - Mobile-First Components

## Quick Start

```bash
npm run dev  # Start development server
npm run build  # Build for production
npm run lint  # Check code quality
```

---

## Component Command Reference

### 1. **ResponsiveNav** (Dashboard/ResponsiveNav.jsx)
Mobile bottom nav + desktop sidebar

```jsx
<ResponsiveNav mode="mobile" />  // Bottom navigation
<ResponsiveNav mode="desktop" /> // Sidebar navigation
```

**Features:**
- Auto switches based on screen size
- Shows 5 icons on mobile
- Full labels on desktop
- User info & logout on desktop
- Lucide React icons

**Responsive Rules:**
- Mobile navbar: `md:hidden fixed bottom-0`
- Desktop sidebar: `hidden md:block fixed left-0`

---

### 2. **BookingPage** (Dashboard/BookingPage.jsx)
Full ride booking flow with location inputs & ride options

```jsx
<BookingPage />
```

**Key States:**
- Initial view: Location inputs
- Ride selected: Shows estimated fare
- Confirmation: BookingConfirmation component
- Success: Booking ID displayed

**Mobile Optimizations:**
- Sticky "Book Ride Now" button at bottom
- Full-width card layout
- Large touch targets (py-3)
- Vertical scrolling layout

---

### 3. **RideOptions** (Dashboard/RideOptions.jsx)
4 selectable ride types with pricing

```jsx
<RideOptions 
  selectedRide={selectedRide} 
  onRideSelect={handleRideSelect} 
/>
```

**Ride Types:**
- 🚗 Car (₱50, 4 passengers)
- 🛺 Trike (₱30, 3 passengers)
- 🏍️ Motorcycle (₱20, 1 passenger)
- 🚐 Van (₱80, 8 passengers)

**Responsive Grid:**
- Mobile: `flex flex-col space-y-3` (vertical stack)
- Desktop auto-adjusts with flex

---

### 4. **BookingConfirmation** (Dashboard/BookingConfirmation.jsx)
Booking summary and confirmation

```jsx
<BookingConfirmation
  pickupLocation={string}
  dropoffLocation={string}
  selectedRide={rideObject}
  estimatedFare={number}
  onBack={function}
/>
```

**Displays:**
- Ride banner with emoji + gradient
- Location visualization
- Fare breakdown
- Driver assignment waiting state
- Booking success screen

---

## Tailwind CSS Responsive Classes

### Essential Patterns

```jsx
// Responsive Stack/Row
<div className="flex flex-col md:flex-row">
  Stack on mobile, row on desktop
</div>

// Responsive Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  1 column mobile, 2 md, 3 lg
</div>

// Responsive Text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// Responsive Spacing
<div className="px-4 md:px-6 lg:px-8 py-3 md:py-4">

// Hide/Show by Screen
<div className="hidden md:block"> {/* Desktop only */}
<div className="md:hidden"> {/* Mobile only */}

// Responsive Width
<div className="w-full md:w-1/2 lg:w-2/3">
```

### Breakpoints
- `sm:` = 640px
- `md:` = 768px (MAIN breakpoint)
- `lg:` = 1024px
- `xl:` = 1280px

---

## Color Palette

```jsx
// Primary Teal
className="bg-teal-500"      // Button, active states
className="text-teal-600"    // Primary text
className="bg-teal-50"       // Light backgrounds
className="border-teal-200"  // Light borders

// Secondary Cyan
className="from-cyan-500"    // Gradients
className="to-cyan-600"

// Status Colors
className="bg-green-100 text-green-700"    // Success
className="bg-red-100 text-red-700"        // Error
className="bg-yellow-100 text-yellow-700"  // Warning
className="bg-blue-100 text-blue-700"      // Info
```

---

## Common Component Patterns

### Button
```jsx
// Primary (Mobile-first)
<button className="w-full md:w-auto px-6 py-3 bg-teal-500 text-white rounded-lg font-bold hover:bg-teal-600 active:scale-95 transition-all">
  Click Me
</button>

// Secondary
<button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50">
  Secondary
</button>

// Disabled
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</button>
```

### Card
```jsx
<div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
  {/* Mobile: p-4, Desktop: p-6 */}
  Card content
</div>
```

### Input Field
```jsx
<input
  type="text"
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
             focus:outline-none focus:border-teal-500 transition-colors"
  placeholder="Enter text..."
/>
```

### Status Badge
```jsx
<span className={`px-3 py-1 rounded-full text-sm font-semibold ${
  status === 'completed'
    ? 'bg-green-100 text-green-700'
    : status === 'cancelled'
    ? 'bg-red-100 text-red-700'
    : 'bg-yellow-100 text-yellow-700'
}`}>
  {status}
</span>
```

---

## Icon Usage (Lucide React)

```jsx
import { Home, MessageSquare, Heart, User, Settings } from 'lucide-react'

// Basic usage
<Home size={24} />
<Home size={20} className="text-teal-600" />
<Home size={20} className="text-teal-600 fill-current" />

// Common icon sizes
size={16}  // Labels, small text
size={20}  // Navigation
size={24}  // Card headers
size={32}  // Large displays
size={48}  // Feature icons
```

---

## Layout Templates

### Page Container
```jsx
<div className="w-full max-w-4xl mx-auto">
  {/* Constrains width on large screens, full on mobile */}
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
      Page Title
    </h1>
    <p className="text-sm text-gray-500 mt-1">Subtitle</p>
  </div>
  
  {/* Content cards */}
  <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
    Content here
  </div>
</div>
```

### Two Column (Mobile Stack, Desktop Side-by-Side)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-white rounded-2xl p-6">Column 1</div>
  <div className="bg-white rounded-2xl p-6">Column 2</div>
</div>
```

### Sticky Bottom CTA (Mobile)
```jsx
<main className="pb-24 md:pb-8">
  {/* pb-24 creates space for sticky button on mobile */}
  Content
</main>

<div className="sticky bottom-0 bg-white pt-3 px-4 pb-safe">
  <button className="w-full py-3 bg-teal-500 text-white rounded-xl">
    Action
  </button>
</div>
```

---

## State Management Tips

### Controlled Input
```jsx
const [value, setValue] = useState('')

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter text..."
/>
```

### Loading State
```jsx
const [loading, setLoading] = useState(false)

<button disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</button>
```

### Conditional Rendering
```jsx
{isEditing ? (
  <EditForm />
) : (
  <ViewMode />
)}

// Or with &&
{pendingBookings.length > 0 && (
  <div>Found {pendingBookings.length} bookings</div>
)}
```

---

## Responsive Images

```jsx
// Responsive container
<div className="w-full h-auto">
  <img 
    src="image.jpg" 
    alt="Description"
    className="w-full h-auto object-cover rounded-xl"
  />
</div>

// Responsive sizing
<img
  src="image.jpg"
  alt="Description"
  className="w-full md:w-1/2 lg:w-1/3 h-auto rounded-xl"
/>
```

---

## Common Mistakes to Avoid

❌ **DON'T**: Use fixed widths/heights
```jsx
// ❌ BAD
<div style={{ width: '300px', height: '200px' }}>
<div className="w-80 h-96">

// ✅ GOOD
<div className="w-full max-w-sm h-auto">
```

❌ **DON'T**: Forget responsive breakpoints
```jsx
// ❌ BAD
<div className="flex gap-4">  // Always row, breaks on mobile

// ✅ GOOD
<div className="flex flex-col md:flex-row gap-4">
```

❌ **DON'T**: Small touch targets on mobile
```jsx
// ❌ BAD
<button className="px-2 py-1">Click</button>

// ✅ GOOD
<button className="px-4 py-2 md:px-2">Click</button>
```

❌ **DON'T**: Forget overflow prevention
```jsx
// ❌ BAD
<p>{longText}</p>

// ✅ GOOD
<p className="truncate">  {/* Single line with ellipsis */}
<p className="line-clamp-3">  {/* 3 lines with ellipsis */}
```

---

## Testing Responsive Design

### Using Browser DevTools
1. Press `F12` to open DevTools
2. Press `Ctrl+Shift+M` to toggle mobile view
3. Select device from dropdown (iPhone 12, iPad, etc.)
4. Test all interactions and layouts

### Recommended Device Sizes to Test
- **Mobile**: 375px (iPhone SE), 390px (iPhone 14)
- **Tablet**: 768px (iPad portrait), 1024px (iPad landscape)
- **Desktop**: 1366px (laptop), 1920px (desktop)

---

## Performance Tips

- Use `className` over inline `style`
- Avoid unnecessary re-renders with `React.memo`
- Lazy load images with `loading="lazy"`
- Use native CSS hover/focus instead of JS
- Test with mobile network throttling

---

## Debugging

```jsx
// Add mobile indicator (temporary)
<div className="fixed top-4 right-4 z-50 bg-black text-white px-2 py-1 text-xs rounded">
  <span className="md:hidden">Mobile</span>
  <span className="hidden md:inline lg:hidden">Tablet</span>
  <span className="hidden lg:inline">Desktop</span>
</div>
```

---

## Useful Tailwind Plugins

Consider adding in `tailwind.config.js`:

```javascript
plugins: [
  require('@tailwindcss/forms'),     // Better form styling
  require('@tailwindcss/typography'), // Prose styling
  require('@tailwindcss/aspect-ratio'), // Aspect ratio utility
]
```

---

## Keyboard Shortcuts

- `Tab` - Navigate through interactive elements
- `Enter` - Activate buttons/links
- `Space` - Toggle checkboxes
- `Escape` - Close modals

Make sure your components support these! Test with keyboard navigation on mobile (bluetooth keyboard) and desktop.

---

## 📞 Quick Help

**"How do I make something only show on mobile?"**
```jsx
<div className="md:hidden">Mobile only</div>
```

**"How do I prevent horizontal scroll on mobile?"**
```jsx
{/* Ensure all elements are w-full or less */}
<div className="w-full max-w-md mx-auto px-4">
```

**"How do I make a sticky button on mobile?"**
```jsx
<div className="sticky bottom-0 bg-white pt-3 px-4">
  <button>Action</button>
</div>
```

**"How do I make responsive images?"**
```jsx
<img className="w-full h-auto rounded-xl" src="..." />
```

---

**Last Updated:** April 2, 2026
**Version:** 1.0 - Mobile-First Refactor
