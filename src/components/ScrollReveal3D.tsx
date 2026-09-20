import React, { useRef, useState, useEffect } from 'react';

interface ScrollReveal3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  enableMouseTilt?: boolean;
  intensity?: number;
}

export const ScrollReveal3D: React.FC<ScrollReveal3DProps> = ({
  children,
  className = '',
  enableMouseTilt = true,
  intensity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTransform, setScrollTransform] = useState({
    rotateX: 0,
    translateY: 0,
    scale: 1,
    opacity: 1,
  });
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let rafId: number;

    const updateOnScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Distance of card center from viewport center
      const elemCenter = rect.top + rect.height / 2;
      const viewCenter = windowHeight / 2;
      const distFromCenter = elemCenter - viewCenter;

      // Normalized ratio: -1 (above viewport), 0 (dead center), 1 (below viewport)
      const ratio = distFromCenter / (windowHeight / 1.6);
      const clamped = Math.max(-1.1, Math.min(1.1, ratio));

      // Continuous 3D perspective tilt linked directly to scroll position
      // Bottom entering: tilts forward (+rotateX), translates down, scales slightly down
      // Center: rotateX = 0, scale = 1, full opacity
      // Top exiting: tilts backward (-rotateX)
      const rotateX = clamped * 6.5 * intensity;
      const translateY = clamped * 18 * intensity;
      const scale = 1 - Math.abs(clamped) * 0.035 * intensity;
      const opacity = Math.min(1, Math.max(0.5, 1 - Math.abs(clamped) * 0.3));

      setScrollTransform({
        rotateX,
        translateY,
        scale,
        opacity,
      });
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateOnScroll);
    };

    updateOnScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Also connect to Lenis scroll emitter if present
    const checkLenis = () => {
      if (window.__lenis) {
        window.__lenis.on('scroll', updateOnScroll);
      }
    };
    checkLenis();
    const timer = setTimeout(checkLenis, 300);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', updateOnScroll);
      }
    };
  }, [intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMouseTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Interactive mouse tilt (subtle ±4 degrees)
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setMouseTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => {
    if (enableMouseTilt) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!enableMouseTilt) return;
    setIsHovered(false);
    setMouseTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  // Combine scroll-driven 3D transform with cursor hover tilt
  const finalRotateX = isHovered && enableMouseTilt ? mouseTilt.x : scrollTransform.rotateX;
  const finalRotateY = isHovered && enableMouseTilt ? mouseTilt.y : 0;
  const finalTranslateY = isHovered && enableMouseTilt ? scrollTransform.translateY - 4 : scrollTransform.translateY;
  const finalScale = isHovered && enableMouseTilt ? scrollTransform.scale * 1.015 : scrollTransform.scale;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-3d relative ${className}`}
    >
      <div
        className="w-full h-full relative will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1200px) rotateX(${finalRotateX.toFixed(2)}deg) rotateY(${finalRotateY.toFixed(2)}deg) translateY(${finalTranslateY.toFixed(1)}px) scale(${finalScale.toFixed(3)})`,
          opacity: isHovered ? 1 : scrollTransform.opacity,
          transition: isHovered
            ? 'transform 0.12s ease-out, opacity 0.2s ease-out'
            : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out',
        }}
      >
        {children}

        {/* Razorpay glass surface glare reflection on hover */}
        {isHovered && enableMouseTilt && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[2px] opacity-25 mix-blend-screen transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 350px at ${mouseTilt.glareX}% ${mouseTilt.glareY}%, rgba(15, 107, 245, 0.35), transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
