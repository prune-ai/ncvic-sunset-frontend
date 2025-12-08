import { useState, useEffect } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  videoSrcWebM?: string; // Optional WebM version (smaller, better compression)
  videoSrcMP4?: string; // Optional MP4 version (better compatibility)
  posterSrc?: string;
  className?: string;
}

export function VideoBackground({
  videoSrc,
  videoSrcWebM,
  videoSrcMP4,
  posterSrc,
  className = "",
}: VideoBackgroundProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy load video after initial page load or on user interaction
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Skip video for users who prefer reduced motion
      return;
    }

    // Load video after a short delay to not block initial render
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 500);

    // Also load on any user interaction
    const handleInteraction = () => {
      setShouldLoad(true);
      clearTimeout(timer);
    };

    window.addEventListener("mousedown", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  // If video fails to load, fall back to poster image
  const handleVideoError = () => {
    setHasError(true);
  };

  const handleVideoLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Show poster image while video loads or if video fails */}
      {(!isLoaded || hasError) && posterSrc && (
        <img
          src={posterSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="eager"
        />
      )}
      {/* Video element - only render when we should load it */}
      {shouldLoad && !hasError && (
        <video
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          aria-hidden="true"
        >
          {/* Prefer WebM (smaller) if available, then MP4 (better compatibility), fallback to original */}
          {videoSrcWebM && (
            <source src={videoSrcWebM} type="video/webm" />
          )}
          {videoSrcMP4 && (
            <source src={videoSrcMP4} type="video/mp4" />
          )}
          <source src={videoSrc} type="video/quicktime" />
        </video>
      )}
    </div>
  );
}

