<!-- # Implementation Tasks: Card Styling & Slide-in Panels

## Task List
- [x] 1. Practice Areas Page - Add card styling with slide-in panel
- [x] 2. Blog Page - Add card styling with slide-in panel
- [x] 3. Team Page - Add card styling with slide-in panel

## Implementation Details

### Practice Areas Page (app/(public)/practice-areas/page.tsx) ✅
- Converted to client component with useState
- Added card grid with icon, title, truncated description
- Added "Read More" button that opens slide-in panel with full details
- Added hover effects on cards (translateY + shadow)

### Blog Page (app/(public)/blog/page.tsx) ✅
- Converted to client component with useState
- Added card grid with image, date, title, excerpt
- Added "Read More" button that opens slide-in panel with full content
- Added hover effects on cards (translateY + shadow + image scale)

### Team Page (app/(public)/team/page.tsx) ✅
- Converted to client component with useState
- Added card grid with photo, name, title, truncated bio
- Added "Read More" button that opens slide-in panel with full bio
- Added hover effects on cards (translateY + shadow + image scale)

## Shared Styling Pattern Applied:
- Grid: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- Card: white background, 12px border-radius, shadow, hover translateY(-8px)
- Image: 150-220px height, object-fit cover, scale(1.05) on hover
- Description: -webkit-line-clamp: 3 for truncation
- Slide-in Panel: Fixed right, 450-500px width, overlay backdrop, slideInFromRight animation -->
