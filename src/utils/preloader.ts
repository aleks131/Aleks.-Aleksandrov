/**
 * Enhanced preloading utility for improved page loading performance
 * Optimized for faster perceived load times with better resource prioritization
 */

// Helper to check if code is running in browser
const isBrowser = typeof window !== 'undefined';

// Track preload progress for better loading UI
export interface PreloadProgress {
  total: number;
  loaded: number;
  percentage: number;
  errors: number;
}

// Preloader state for tracking progress
const preloaderState = {
  progress: {
    total: 0,
    loaded: 0,
    errors: 0,
    percentage: 0
  },
  listeners: new Set<(progress: PreloadProgress) => void>()
};

// Subscribe to loading progress events
export const onLoadingProgress = (callback: (progress: PreloadProgress) => void): (() => void) => {
  if (!isBrowser) return () => {};
  
  preloaderState.listeners.add(callback);
  // Immediately call with current progress
  callback({ ...preloaderState.progress });
  
  // Return unsubscribe function
  return () => {
    preloaderState.listeners.delete(callback);
  };
};

// Update loading progress and notify listeners
const updateProgress = (loaded = 0, errors = 0) => {
  if (!isBrowser) return;
  
  preloaderState.progress.loaded += loaded;
  preloaderState.progress.errors += errors;
  preloaderState.progress.percentage = Math.min(
    100,
    Math.round((preloaderState.progress.loaded / preloaderState.progress.total) * 100)
  );
  
  // Notify all listeners
  preloaderState.listeners.forEach(listener => {
    listener({ ...preloaderState.progress });
  });
};

// Preload a single image with improved error handling and priority
export const preloadImage = (src: string, priority: boolean = false): Promise<void> => {
  // Skip in SSR context
  if (!isBrowser) {
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      updateProgress(1, 0);
      resolve();
    };
    
    img.onerror = () => {
      // Don't reject - just log and resolve to prevent one failure from blocking everything
      console.warn(`Failed to preload image: ${src}`);
      updateProgress(0, 1);
      resolve();
    };
    
    // Set image loading priority
    if (priority) {
      img.fetchPriority = 'high';
    } else {
      img.fetchPriority = 'auto';
    }
    
    // Add decoding hint for browser optimization
    img.decoding = priority ? 'sync' : 'async';
    
    // Add loading attribute for better resource prioritization
    img.loading = priority ? 'eager' : 'lazy';
    
    img.src = src;
  });
};

// Preload multiple images with improved batching and network consideration
export const preloadImages = async (
  srcs: string[], 
  options: { 
    priority?: boolean, 
    concurrency?: number,
    progressCallback?: (progress: PreloadProgress) => void 
  } = {}
): Promise<void> => {
  // Skip in SSR context
  if (!isBrowser || !srcs.length) {
    return Promise.resolve();
  }
  
  const { priority = false, concurrency = 3, progressCallback } = options;
  
  // Update total count for progress tracking
  preloaderState.progress.total += srcs.length;
  
  // Register custom callback if provided
  if (progressCallback) {
    onLoadingProgress(progressCallback);
  }
  
  // Adjust concurrency based on network conditions if supported
  let actualConcurrency = concurrency;
  if (isBrowser && 'connection' in navigator && navigator.connection) {
    const connection = navigator.connection as any;
    if (connection.effectiveType === '4g' && !connection.saveData) {
      actualConcurrency = Math.max(concurrency, 5); // Increase for fast connections
    } else if (connection.saveData || ['slow-2g', '2g'].includes(connection.effectiveType)) {
      actualConcurrency = Math.min(concurrency, 2); // Reduce for slow or data-saving
    }
  }
  
  // Process in optimized batches
  for (let i = 0; i < srcs.length; i += actualConcurrency) {
    const batch = srcs.slice(i, i + actualConcurrency);
    await Promise.all(batch.map(src => preloadImage(src, priority)));
  }
};

// Preload a font with improved reliability
export const preloadFont = (fontFamily: string, options: { weight?: string, style?: string, text?: string } = {}): Promise<void> => {
  // Skip in SSR context
  if (!isBrowser) {
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    const { weight = '400', style = 'normal', text = 'ABCXYZabcxyz0123456789' } = options;
    
    // Use the Font Loading API for browsers that support it
    if (isBrowser && 'fonts' in document) {
      // Using both the API and CSS fallback for maximum reliability
      document.fonts.load(`${weight} ${style} 12px "${fontFamily}"`, text)
        .then(() => {
          updateProgress(1, 0);
          resolve();
        })
        .catch(() => {
          console.warn(`Font ${fontFamily} (${weight} ${style}) could not be preloaded with Font API`);
          updateProgress(0, 1);
          resolve(); // Still resolve to continue
        });
    } else {
      // Fallback for browsers without Font Loading API
      const fontLoader = document.createElement('div');
      fontLoader.innerHTML = text;
      fontLoader.style.position = 'absolute';
      fontLoader.style.fontFamily = fontFamily;
      fontLoader.style.fontSize = '12px';
      fontLoader.style.fontWeight = weight;
      fontLoader.style.fontStyle = style;
      fontLoader.style.visibility = 'hidden';
      fontLoader.style.pointerEvents = 'none';
      
      document.body.appendChild(fontLoader);
      setTimeout(() => {
        document.body.removeChild(fontLoader);
        updateProgress(1, 0);
        resolve();
      }, 300);
    }
  });
};

// Determine if the device is on a slow connection to adjust loading strategy
export const isSlowConnection = (): boolean => {
  if (!isBrowser) return false;
  
  if ('connection' in navigator && navigator.connection) {
    const connection = navigator.connection as any;
    return (
      connection.saveData || 
      ['slow-2g', '2g'].includes(connection.effectiveType) ||
      (connection.downlink && connection.downlink < 1.5)
    );
  }
  
  return false; // Default to assuming fast connection
};

// Preload project assets with prioritization based on visibility and importance
export const preloadProjectAssets = async (
  options: { 
    progressCallback?: (progress: PreloadProgress) => void 
  } = {}
): Promise<void> => {
  // Skip in SSR context
  if (!isBrowser) {
    return Promise.resolve();
  }
  
  try {
    const isLowBandwidth = isSlowConnection();
    
    // Reset preloader state
    preloaderState.progress = {
      total: 0,
      loaded: 0,
      errors: 0,
      percentage: 0
    };
    
    // Register progress callback if provided
    if (options.progressCallback) {
      onLoadingProgress(options.progressCallback);
    }
    
    // First batch: Top priority assets (hero images, visible UI elements)
    const criticalAssets = [
      '/images/common/grid-pattern.svg',
      '/images/common/dots-pattern.svg',
    ];
    
    // Second batch: Project images for above-the-fold content
    const projectCardImages = [
      '/images/projects/carbon.png',
      '/images/projects/data.png',
      '/images/projects/gallery.png',
    ];
    
    // Third batch: Images likely needed soon (lazy loaded)
    const secondaryProjectImages = [
      '/images/projects/handmade.png',
      '/images/projects/ims.png',
      '/images/projects/solar.png',
      '/images/projects/sustain.png',
      '/images/projects/Trash.png',
    ];
    
    // Preload critical assets immediately with high priority
    await preloadImages(criticalAssets, { 
      priority: true, 
      concurrency: isLowBandwidth ? 2 : 5 
    });
    
    // Preload essential fonts
    const fontPromise = Promise.all([
      preloadFont('Geist', { weight: '400' }),
      preloadFont('Geist', { weight: '600' }),
    ]);
    
    // Preload above-the-fold project images with medium priority
    const firstBatchPromise = preloadImages(projectCardImages, { 
      priority: false,
      concurrency: isLowBandwidth ? 1 : 3 
    });
    
    // Wait for fonts and first batch of projects
    await Promise.all([fontPromise, firstBatchPromise]);
    
    // On fast connections, we can preload secondary images too
    if (!isLowBandwidth) {
      // Use requestIdleCallback to load when browser is idle
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          preloadImages(secondaryProjectImages, { 
            priority: false,
            concurrency: 2 
          });
        });
      } else {
        // Fallback to setTimeout for browsers without requestIdleCallback
        setTimeout(() => {
          preloadImages(secondaryProjectImages, { 
            priority: false, 
            concurrency: 2 
          });
        }, 1000);
      }
    }
    
    console.log('Critical assets preloaded successfully');
  } catch (error) {
    console.warn('Error preloading assets:', error);
  }
};

// Optimize rendering performance
export const optimizeRendering = (): void => {
  // Skip in SSR context
  if (!isBrowser) {
    return;
  }
  
  // Add ready class to allow animations to begin
  document.documentElement.classList.add('ready-for-animations');
  
  // Honor user preferences for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Set up progressive image loading
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
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
};

// Main function to initialize a page with optimized loading
export const initializeProjectPage = async (
  options: { 
    progressCallback?: (progress: PreloadProgress) => void 
  } = {}
): Promise<void> => {
  // Skip in SSR context
  if (!isBrowser) {
    return Promise.resolve();
  }
  
  // Start optimizing rendering immediately
  optimizeRendering();
  
  // Start preloading assets with progress tracking
  await preloadProjectAssets({
    progressCallback: options.progressCallback
  });
  
  // Mark loading as complete
  document.documentElement.classList.add('fully-loaded');
  
  // Add interaction readiness after a small delay to ensure smooth transitions
  setTimeout(() => {
    document.documentElement.classList.add('interactive');
  }, 100);
}; 