# Post Internship Platform - Academios Design System

This directory contains the complete implementation of the "Post Internship" platform following the sophisticated Academios-inspired design system.

## Overview

The Post Internship platform consists of two main sections:
1. **Create New Internship** - A comprehensive form for posting new internship listings
2. **My Internships** - A dashboard for managing existing internship listings

## Design System Colors

- **Background Main**: `#F8F9FA`
- **Surface Primary**: `#FFFFFF`
- **Accent Primary**: `#7F56D9`
- **Accent Success**: `#12B76A`
- **Accent Warning**: `#F79009`
- **Accent Primary Subtle**: `#E9E7FD`
- **Text Primary**: `#1D2939`
- **Text Secondary**: `#667085`
- **Border Standard**: `#D0D5DD`

## Components

### Main Components

#### `page.tsx`
- Main page component with tabbed navigation
- Handles switching between Create and Manage sections
- Shows notification pill with active internships count

#### `create-internship-form.tsx`
- Comprehensive form with 6 main sections:
  - Basic Details (title, category, type, location, duration, dates)
  - Internship Description (responsibilities, skills, qualifications, benefits)
  - Eligibility & Criteria (education level, premium access, max applications)
  - Stipend & Availability (compensation, hours, timings)
  - Application Requirements (resume, portfolio, assignments, screening)
- Features sticky footer with form controls
- Includes AI suggestion buttons (sparkle icons)
- Form validation and state management
- Success toast notification on publish

#### `my-internships-dashboard.tsx`
- Dashboard with filtering and search capabilities
- Toggle between grid and table views
- Filter by status, category, and sort options
- Real-time search functionality

### UI Components

#### `internship-card.tsx`
- Card view for individual internships
- Status badges with color coding
- Application count and deadline display
- Action buttons (Edit, Clone, Close, See Applicants)

#### `internship-table.tsx`
- Table view for internship listings
- Sortable columns
- Dropdown menu for additional actions
- Responsive design

#### `tags-input.tsx`
- Custom tags input component for skills
- Add/remove tags functionality
- Keyboard navigation support
- Pill-style tag display

#### `warning-banner.tsx`
- Warning notification for unverified companies
- Prevents publishing until verification complete

#### `success-toast.tsx`
- Success notification after publishing
- Auto-dismiss after 5 seconds
- Slide-in animation

## Features

### Form Features
- **Conditional Fields**: Location field appears only for on-site/hybrid positions
- **Date Pickers**: Calendar popover for start date and deadline selection
- **Toggle Switches**: For premium access and application requirements
- **Radio Groups**: For internship type selection
- **Tags Input**: For required skills with add/remove functionality
- **AI Suggestions**: Sparkle icons for AI-powered content generation
- **Form Validation**: Required field validation and error states
- **Draft Saving**: Save form as draft functionality
- **Form Reset**: Clear all form data

### Dashboard Features
- **Dual View Modes**: Grid cards and table view
- **Advanced Filtering**: By status, category, and custom sorting
- **Search**: Real-time search by internship title
- **Status Management**: Visual status indicators (Active, Draft, Closed)
- **Bulk Actions**: Edit, clone, close, and view applicants
- **Responsive Design**: Works on all screen sizes

### Access Control
- **Verification Check**: Unverified companies see warning banner
- **Disabled Publishing**: Publish button disabled for unverified companies
- **Premium Access Toggle**: Restrict to Kaizen-certified students only

## Usage

```tsx
import PostInternshipPage from "@/app/dashboard/post-internship/page"

// The page is automatically available at /dashboard/post-internship
// when using Next.js app router
```

## Dependencies

- React 19+
- Next.js 15+
- Radix UI components
- Lucide React icons
- date-fns for date formatting
- Tailwind CSS for styling

## File Structure

```
components/post-internship/
├── README.md
├── create-internship-form.tsx
├── my-internships-dashboard.tsx
├── internship-card.tsx
├── internship-table.tsx
├── tags-input.tsx
├── warning-banner.tsx
└── success-toast.tsx

app/dashboard/post-internship/
└── page.tsx
```

## Styling

All components follow the Academios design system with:
- Consistent spacing (24px gaps between cards)
- Rounded corners (12px for cards, 8px for inputs)
- Proper color hierarchy
- Inter font family
- Subtle shadows and borders
- Smooth transitions and animations

## Future Enhancements

The design accommodates future features:
- **Clone Internship**: Copy icon in action groups
- **AI Suggestions**: Sparkle icons for AI-generated content
- **Templates**: "Start from Template" functionality
- **Advanced Analytics**: Integration with analytics dashboard
- **Bulk Operations**: Multi-select and bulk actions
- **Export Features**: PDF/CSV export of internship data

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance
- Semantic HTML structure