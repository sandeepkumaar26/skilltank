/**
 * Theme utilities and constants for SkillTank Dashboard
 */

export const THEME_COLORS = {
  primary: '#2563EB',
  secondary: '#10B981',
  accent: '#F59E0B',
  background: {
    light: '#F3F4F6',
    dark: '#111827',
  },
  surface: {
    light: '#FFFFFF',
    dark: '#1F2937',
  },
  text: {
    light: '#111827',
    dark: '#F9FAFB',
  },
  textMuted: {
    light: '#6B7280',
    dark: '#9CA3AF',
  },
} as const;

export const THEME_VARIANTS = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export type ThemeVariant = keyof typeof THEME_VARIANTS;

export const TYPOGRAPHY_SCALE = {
  display: {
    fontSize: '3rem',
    fontWeight: '700',
    lineHeight: '1.2',
    letterSpacing: '-0.025em',
  },
  'heading-1': {
    fontSize: '2.25rem',
    fontWeight: '700',
    lineHeight: '1.3',
    letterSpacing: '-0.025em',
  },
  'heading-2': {
    fontSize: '1.875rem',
    fontWeight: '600',
    lineHeight: '1.4',
    letterSpacing: '-0.025em',
  },
  'heading-3': {
    fontSize: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.4',
    letterSpacing: '-0.025em',
  },
  'heading-4': {
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '1.5',
  },
  'body-large': {
    fontSize: '1.125rem',
    fontWeight: '400',
    lineHeight: '1.6',
  },
  body: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.6',
  },
  'body-small': {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '1.4',
    letterSpacing: '0.025em',
    textTransform: 'uppercase' as const,
  },
} as const;

export const SPACING_SCALE = [
  0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16,
] as const;

export const ELEVATION_LEVELS = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

/**
 * Get CSS custom property value for a theme color
 */
export function getThemeColor(colorKey: string): string {
  return `var(--color-${colorKey})`;
}

/**
 * Generate CSS custom properties for theme colors
 */
export function generateThemeProperties(theme: 'light' | 'dark') {
  const properties: Record<string, string> = {};
  
  Object.entries(THEME_COLORS).forEach(([key, value]) => {
    if (typeof value === 'string') {
      properties[`--color-${key}`] = value;
    } else if (typeof value === 'object' && value[theme]) {
      properties[`--color-${key}`] = value[theme];
    }
  });
  
  return properties;
}