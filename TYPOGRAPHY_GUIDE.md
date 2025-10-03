# Typography Standardization Guide

## Overview
This project now uses a standardized typography system with consistent fonts and text sizes across all pages.

## Font Family
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Applied globally**: All text elements use Inter font family

## Typography Classes

### Headings
- `.text-banner-title`: Banner/Hero titles (6xl → 7xl → 8xl → 9xl responsive) - **matches home page**
- `.text-heading-1`: Large page titles (3xl → 4xl → 5xl responsive)
- `.text-heading-2`: Section headings (2xl → 3xl → 4xl responsive) 
- `.text-heading-3`: Subsection headings (xl → 2xl → 3xl responsive)

### Body Text
- `.text-body-large`: Large body text for intros/highlights (lg → xl responsive)
- `.text-body`: Standard body text (base → lg responsive)
- `.text-body-small`: Small body text (sm → base responsive)

### Utility
- `.text-caption`: Small labels/captions (xs → sm responsive, uppercase, tracked)

## Color Standards
- **Headings**: `text-gray-900` (dark)
- **Body text**: `text-gray-700` (medium)
- **Small text**: `text-gray-600` (lighter)
- **Captions**: `text-gray-500` (lightest)

## Usage Examples

```tsx
// Banner/Hero title (matches home page)
<h1 className="text-banner-title text-[#f1e6e6]">Banner Title</h1>

// Page title
<h1 className="text-heading-1">Page Title</h1>

// Section heading
<h2 className="text-heading-2">Section Title</h2>

// Body paragraph
<p className="text-body">This is standard body text with proper sizing and spacing.</p>

// Small caption
<span className="text-caption">Small Label</span>
```

## Implementation Status
- ✅ Banner component updated
- ✅ Contact-us page updated
- ✅ Global CSS typography classes added
- ⏳ Other pages to be updated as needed

## Benefits
- Consistent visual hierarchy
- Responsive text sizing
- Improved readability
- Easier maintenance
- Better accessibility
