/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#0078D4', // Microsoft blue heritage - blue-600
        'primary-50': '#EBF8FF', // Light blue tint - blue-50
        'primary-100': '#DBEAFE', // Lighter blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-600': '#2563EB', // Darker blue - blue-600
        'primary-700': '#1D4ED8', // Deep blue - blue-700
        
        // Secondary Colors
        'secondary': '#6B46C1', // Rich purple - purple-600
        'secondary-50': '#F5F3FF', // Light purple tint - purple-50
        'secondary-100': '#EDE9FE', // Lighter purple - purple-100
        'secondary-500': '#8B5CF6', // Medium purple - purple-500
        'secondary-600': '#7C3AED', // Darker purple - purple-600
        
        // Accent Colors
        'accent': '#F59E0B', // Warm amber - amber-500
        'accent-50': '#FFFBEB', // Light amber tint - amber-50
        'accent-100': '#FEF3C7', // Lighter amber - amber-100
        'accent-400': '#FBBF24', // Medium amber - amber-400
        'accent-600': '#D97706', // Darker amber - amber-600
        
        // Background Colors
        'background': '#FAFAFA', // Soft off-white - gray-50
        'surface': '#FFFFFF', // Pure white - white
        'surface-hover': '#F9FAFB', // Light gray hover - gray-50
        
        // Text Colors
        'text-primary': '#1F2937', // Deep charcoal - gray-800
        'text-secondary': '#6B7280', // Balanced gray - gray-500
        'text-tertiary': '#9CA3AF', // Light gray - gray-400
        'text-inverse': '#FFFFFF', // White text - white
        
        // Status Colors
        'success': '#10B981', // Fresh green - emerald-500
        'success-50': '#ECFDF5', // Light green tint - emerald-50
        'success-100': '#D1FAE5', // Lighter green - emerald-100
        'success-600': '#059669', // Darker green - emerald-600
        
        'warning': '#F59E0B', // Amber warning - amber-500
        'warning-50': '#FFFBEB', // Light amber tint - amber-50
        'warning-100': '#FEF3C7', // Lighter amber - amber-100
        
        'error': '#EF4444', // Clear red - red-500
        'error-50': '#FEF2F2', // Light red tint - red-50
        'error-100': '#FEE2E2', // Lighter red - red-100
        'error-600': '#DC2626', // Darker red - red-600
        
        // Border Colors
        'border': '#E5E7EB', // Light gray border - gray-200
        'border-light': '#F3F4F6', // Very light border - gray-100
        'border-dark': '#D1D5DB', // Medium gray border - gray-300
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'lg': '8px',
        'md': '6px',
        'sm': '4px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '999': '999',
        '1000': '1000',
        '1001': '1001',
        '1002': '1002',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}