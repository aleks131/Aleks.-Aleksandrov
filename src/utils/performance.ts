/**
 * Performance utilities for optimizing page load and rendering
 * These utilities help improve loading speed, minimize layout shifts, and defer non-critical resources
 */

// Check if code is running in browser or server 
const isBrowser = typeof window !== 'undefined';

/**
 * Initialize performance monitoring and optimizations
 * Call this function in layout or at app startup
 */
export function initPerformanceOptimizations(): void {
  if (!isBrowser) return;

  // Execute optimizations only after browser is idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      optimizeImageLoading();
      prefetchCriticalAssets();
      monitorPerformance();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      optimizeImageLoading();
      prefetchCriticalAssets();
      monitorPerformance();
    }, 1000);
  }

  // Add ready-for-animations class when DOM is complete
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('ready-for-animations');
  });

  // Apply reduced motion settings if user prefers it
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }

  // Add event listener to prevent layout shifts from font loading
  document.fonts.addEventListener('loadingdone', () => {
    document.documentElement.classList.add('fonts-loaded');
  });
}

/**
 * Optimize image loading with adaptive quality and lazy loading
 */
function optimizeImageLoading(): void {
  if (!isBrowser) return;

  // Use connection-aware image quality
  const connection = (navigator as any).connection;
  const isSlow = connection && 
    (connection.effectiveType === '2g' || 
     connection.effectiveType === 'slow-2g' ||
     connection.saveData);

  // Set data attribute for connection speed for use in CSS or JS
  if (isSlow) {
    document.documentElement.setAttribute('data-connection', 'slow');
  } else {
    document.documentElement.setAttribute('data-connection', 'fast');
  }

  // Set up intersection observer for lazy loading images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Prefetch critical assets based on user's navigation path
 */
function prefetchCriticalAssets(): void {
  if (!isBrowser) return;

  // Don't prefetch on slow connections or when data saver is enabled
  const connection = (navigator as any).connection;
  if (connection && connection.saveData) {
    return;
  }

  // Critical paths based on current page
  const currentPath = window.location.pathname;
  let assetsToPrefetch: string[] = [];

  // Determine assets to prefetch based on current page
  if (currentPath === '/') {
    // On homepage, prefetch project images as they're likely to be viewed
    assetsToPrefetch = [
      '/images/projects/carbon.png',
      '/images/projects/data.png',
      '/images/projects/gallery.png',
    ];
  } else if (currentPath.includes('/projects/')) {
    // On project pages, prefetch next and previous project assets
    assetsToPrefetch = [
      '/images/projects/placeholder.svg' // Fallback image
    ];
  }

  // Prefetch with low priority
  assetsToPrefetch.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    link.as = path.endsWith('.js') ? 'script' : 'image';
    link.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(link);
  });
}

/**
 * Monitor performance metrics for feedback
 */
function monitorPerformance(): void {
  if (!isBrowser || !('PerformanceObserver' in window)) return;
  
  // Observe layout shifts
  try {
    const layoutShiftObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Only log significant shifts
        if ((entry as any).value > 0.1) {
          console.warn('Layout shift detected:', entry);
        }
      }
    });
    layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('Layout shift monitoring not supported');
  }

  // Observe long tasks
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry);
        }
      }
    });
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  } catch (e) {
    console.warn('Long task monitoring not supported');
  }
}

/**
 * Get estimated connection speed category for adaptive loading
 * @returns Connection speed category
 */
export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
  if (!isBrowser) return 'medium';
  
  const connection = (navigator as any).connection;

  if (!connection) return 'medium';
  
  if (connection.saveData || 
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g') {
    return 'slow';
  }
  
  if (connection.effectiveType === '3g') {
    return 'medium';
  }
  
  return 'fast';
}

export default {
  initPerformanceOptimizations,
  getConnectionSpeed
}; 