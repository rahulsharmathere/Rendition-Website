import React, { useEffect, useRef, useState } from 'react';
import { withLoadTracking } from './withLoadTracking'

const ReverseScrollComponent = withLoadTracking(({ children, className, onLoad }) => {
  const componentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!componentRef.current) return;
      
      // Get the component's position relative to viewport
      const rect = componentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the component is visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(rect.bottom, windowHeight);
      const visibleHeight = visibleBottom - visibleTop;
      
      // Calculate scroll progress (0 when component enters viewport, 1 when it leaves)
      let progress = 0;
      
      // Component is fully above the viewport
      if (rect.bottom <= 0) {
        progress = 1;
      } 
      // Component is fully below the viewport
      else if (rect.top >= windowHeight) {
        progress = 0;
      } 
      // Component is partially visible
      else {
        // Calculate progress based on how much of the component has passed the top of the viewport
        progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        progress = Math.max(0, Math.min(1, progress));
      }
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the transform and opacity based on scroll progress
  const translateY = Math.round((1 - scrollProgress) * 100);
  const opacity = scrollProgress;

  return (
    <div 
      className={`min-h-screen w-full relative overflow-hidden ${className || ''}`} 
      ref={componentRef}
    >
      <div 
        className="w-full h-full flex justify-center items-center"
        style={{
          transform: `translateY(${translateY}%)`,
          opacity: opacity
        }}
      >
        {children}
      </div>
    </div>
  );
});

export default ReverseScrollComponent;