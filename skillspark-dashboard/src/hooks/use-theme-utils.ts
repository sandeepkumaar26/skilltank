"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { THEME_COLORS, type ThemeVariant } from "@/lib/theme";

/**
 * Enhanced theme utilities hook with additional functionality
 */
export function useThemeUtils() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Get the current active theme
   */
  const currentTheme = (resolvedTheme || theme) as ThemeVariant;

  /**
   * Check if the current theme is dark
   */
  const isDark = currentTheme === 'dark';

  /**
   * Check if the current theme is light
   */
  const isLight = currentTheme === 'light';

  /**
   * Check if using system theme
   */
  const isSystem = theme === 'system';

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  /**
   * Set theme to a specific value
   */
  const setSpecificTheme = (newTheme: ThemeVariant) => {
    setTheme(newTheme);
  };

  /**
   * Get theme-aware color value
   */
  const getThemeColor = (colorKey: keyof typeof THEME_COLORS) => {
    const color = THEME_COLORS[colorKey];
    if (typeof color === 'string') {
      return color;
    }
    return color[isDark ? 'dark' : 'light'];
  };

  /**
   * Get CSS custom property for theme color
   */
  const getThemeColorVar = (colorKey: string) => {
    return `var(--color-${colorKey})`;
  };

  /**
   * Apply theme-specific classes
   */
  const getThemeClasses = (lightClass: string, darkClass: string) => {
    return isDark ? darkClass : lightClass;
  };

  /**
   * Get theme-aware styles object
   */
  const getThemeStyles = (lightStyles: React.CSSProperties, darkStyles: React.CSSProperties) => {
    return isDark ? darkStyles : lightStyles;
  };

  return {
    // Theme state
    theme: theme as ThemeVariant,
    resolvedTheme: currentTheme,
    systemTheme: systemTheme as ThemeVariant,
    mounted,
    
    // Theme checks
    isDark,
    isLight,
    isSystem,
    
    // Theme actions
    setTheme: setSpecificTheme,
    toggleTheme,
    
    // Theme utilities
    getThemeColor,
    getThemeColorVar,
    getThemeClasses,
    getThemeStyles,
  };
}

/**
 * Hook for theme-aware CSS variables
 */
export function useThemeVariables() {
  const { isDark, mounted } = useThemeUtils();

  if (!mounted) {
    return {};
  }

  return {
    '--theme-background': isDark ? THEME_COLORS.background.dark : THEME_COLORS.background.light,
    '--theme-surface': isDark ? THEME_COLORS.surface.dark : THEME_COLORS.surface.light,
    '--theme-text': isDark ? THEME_COLORS.text.dark : THEME_COLORS.text.light,
    '--theme-text-muted': isDark ? THEME_COLORS.textMuted.dark : THEME_COLORS.textMuted.light,
    '--theme-primary': THEME_COLORS.primary,
    '--theme-secondary': THEME_COLORS.secondary,
    '--theme-accent': THEME_COLORS.accent,
  } as React.CSSProperties;
}

/**
 * Hook for theme-aware animations
 */
export function useThemeTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 200);
    return () => clearTimeout(timer);
  }, [theme]);

  return {
    isTransitioning,
    transitionClasses: isTransitioning ? 'animate-theme-transition' : '',
  };
}