import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { HeroUIClientProvider } from "@/components/heroui-provider";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SkillTank Dashboard",
  description:
    "A comprehensive career development platform for students and professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ErrorBoundary level="root">
          <HeroUIClientProvider>
            <ThemeProvider>
              <AuthProvider>
                {children}
                <Toaster />
              </AuthProvider>
            </ThemeProvider>
          </HeroUIClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
