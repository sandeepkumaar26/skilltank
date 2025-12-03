"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ThemeVariant } from "@/lib/theme";

interface ThemeOption {
  value: ThemeVariant;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    icon: Sun,
    description: 'Light theme for bright environments',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: Moon,
    description: 'Dark theme for low-light environments',
  },
  {
    value: 'system',
    label: 'System',
    icon: Monitor,
    description: 'Follow system preference',
  },
];

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled aria-label="Loading theme toggle">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  const currentTheme = theme as ThemeVariant;
  const currentOption = THEME_OPTIONS.find(option => option.value === currentTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          aria-label={`Current theme: ${currentOption?.label || 'Unknown'}. Click to change theme`}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = currentTheme === option.value;
          
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`flex items-center gap-2 cursor-pointer ${
                isActive ? 'bg-accent text-accent-foreground' : ''
              }`}
              aria-label={`${option.label} theme - ${option.description}`}
            >
              <Icon className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              </div>
              {isActive && (
                <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeToggleSimple() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "light" ? "dark" : "light");
  }, [theme, resolvedTheme, setTheme]);

  if (!mounted) {
    return (
      <Button 
        variant="outline" 
        size="icon" 
        disabled 
        aria-label="Loading theme toggle"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle between light and dark theme</span>
    </Button>
  );
}

/**
 * Theme indicator component for showing current theme status
 */
export function ThemeIndicator() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;
  const option = THEME_OPTIONS.find(opt => opt.value === currentTheme);
  
  if (!option) return null;

  const Icon = option.icon;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span>{option.label} theme</span>
    </div>
  );
}