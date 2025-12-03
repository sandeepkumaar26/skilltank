"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

interface SkillTankThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ 
  children, 
  ...props 
}: SkillTankThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="skilltank-theme"
      themes={["light", "dark", "system"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

/**
 * Hook to access theme context with better TypeScript support
 */
export function useSkillTankTheme() {
  const context = React.useContext(React.createContext<{
    theme?: string;
    setTheme: (theme: string) => void;
    resolvedTheme?: string;
    systemTheme?: string;
  } | undefined>(undefined));

  if (context === undefined) {
    throw new Error('useSkillTankTheme must be used within a ThemeProvider');
  }

  return context;
}