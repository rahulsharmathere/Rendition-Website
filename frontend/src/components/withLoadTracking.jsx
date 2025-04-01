import React, { useEffect } from 'react';

// Higher-Order Component to track component loading
export const withLoadTracking = (WrappedComponent) => {
  return ({ onLoad, ...props }) => {
    useEffect(() => {
      // Simulate loading with a small delay to ensure all assets are loaded
      const timer = setTimeout(() => {
        onLoad && onLoad();
      }, 1000);

      return () => clearTimeout(timer);
    }, [onLoad]);

    return <WrappedComponent {...props} />;
  };
};