'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let animFrame: number;

    const move = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const loop = () => {
      ringX += (dotX - ringX) * 0.10;
      ringY += (dotY - ringY) * 0.10;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      animFrame = requestAnimationFrame(loop);
    };

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.tagName === 'LABEL' ||
        el.closest('a') !== null ||
        el.closest('button') !== null ||
        el.classList.contains('cursor-pointer') ||
        !!el.closest('[data-cursor="hover"]');
      setIsHover(interactive);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);
    const onDown  = () => setIsClick(true);
    const onUp    = () => setIsClick(false);

    window.addEventListener('mousemove',   move,       { passive: true });
    window.addEventListener('mousemove',   checkHover, { passive: true });
    window.addEventListener('mouseenter',  onEnter);
    window.addEventListener('mouseleave',  onLeave);
    window.addEventListener('mousedown',   onDown);
    window.addEventListener('mouseup',     onUp);
    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove',   move);
      window.removeEventListener('mousemove',   checkHover);
      window.removeEventListener('mouseenter',  onEnter);
      window.removeEventListener('mouseleave',  onLeave);
      window.removeEventListener('mousedown',   onDown);
      window.removeEventListener('mouseup',     onUp);
      cancelAnimationFrame(animFrame);
    };
  }, [isVisible]);

  /* Cursor colours:
     - Default: small rustic-warm amber dot + subtle ring
     - Hover:   expanded ring + golden glow — very visible on dark AND light bg
     - Click:   dot shrinks = satisfying press feedback              */

  const dotSize   = isClick ? 6 : isHover ? 12 : 8;
  const ringSize  = isHover ? 56 : 38;
  const dotColor  = isHover ? '#d97706' : '#c2410c';           // amber / ember-red
  const ringColor = isHover ? 'rgba(217,119,6,0.7)'            // amber ring on hover
                            : 'rgba(194,65,12,0.45)';          // ember ring default

  return (
    <>
      {/* Inner dot — exact cursor position */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width:  `${dotSize}px`,
          height: `${dotSize}px`,
          background: dotColor,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.15s ease, height 0.15s ease, background 0.2s ease, opacity 0.3s ease',
          willChange: 'transform',
          /* box-shadow gives visibility on any background */
          boxShadow: isHover
            ? '0 0 0 3px rgba(217,119,6,0.25), 0 0 16px rgba(217,119,6,0.4)'
            : '0 0 0 2px rgba(255,255,255,0.4)',
        }}
      />

      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width:  `${ringSize}px`,
          height: `${ringSize}px`,
          border: `1.5px solid ${ringColor}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
          /* backdrop-filter inverts slightly for visibility on white sections */
          backdropFilter: 'invert(5%)',
        }}
      />
    </>
  );
}
