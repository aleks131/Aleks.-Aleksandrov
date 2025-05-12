import "./globals.css";
import { Metadata, Viewport } from "next";
import { initPerformanceOptimizations } from "@/utils/performance";
import Script from "next/script";

// Properly configure metadata for SEO and appearance
export const metadata: Metadata = {
  title: "Aleks Aleksandrov | Global Business Engineering Portfolio",
  description: "Portfolio showcasing skills in data analysis, software development, and project management with a focus on actionable insights and business process improvement",
  keywords: ["data analysis", "project management", "software development", "global business engineering"],
  authors: [{ name: "Aleks Aleksandrov" }],
  creator: "Aleks Aleksandrov",
};

// Configure proper viewport settings with color scheme
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

// Client-side performance initialization component
function PerformanceInitializer() {
  // Initialize performance optimizations only on client
  if (typeof window !== 'undefined') {
    initPerformanceOptimizations();
  }
  
  return null;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to important domains to speed up loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Add base styling for smoother loading experience */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Prevent layout shifts during font loading */
          html.fonts-loading body {
            opacity: 0.8;
          }
          
          /* Ensure smooth transitions */
          body {
            transition: opacity 0.3s ease-in-out;
          }
          
          /* Hide elements that would cause layout shifts during loading */
          .js-loading [data-animate-on-load] {
            opacity: 0;
          }
        `}} />
        
        {/* Add lightweight inline script for early user experience optimization */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Add loading class to enable CSS optimizations
          document.documentElement.classList.add('js-loading');
          
          // Remove loading class when DOM is ready
          document.addEventListener('DOMContentLoaded', function() {
            document.documentElement.classList.remove('js-loading');
          });
          
          // Apply user's preferred color scheme immediately to prevent flash
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          }
        `}} />
      </head>
      <body className="transition-colors duration-300">
        {/* Client-side performance initializer */}
        <PerformanceInitializer />
        
        {/* Main content */}
        <main>{children}</main>
        
        {/* Performance monitoring script - loads after main content */}
        <Script
          id="performance-monitoring"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Simple performance monitoring
              const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                  // Only log significant layout shifts
                  if (entry.entryType === 'layout-shift' && entry.value > 0.1) {
                    console.warn('Layout shift detected:', entry);
                  }
                });
              });
              
              // Start monitoring if the browser supports it
              if (PerformanceObserver.supportedEntryTypes?.includes('layout-shift')) {
                observer.observe({ type: 'layout-shift', buffered: true });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
