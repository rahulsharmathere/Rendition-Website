import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Events, Footer, Productions, Home, Navbar, Teachings, Team, Form } from './components';
import RenditionLogo from './assets/Logo.png'; // Import your logo

// Custom Loading Component with Circular Loader
const LoadingScreen = ({ onLoadComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        const newPercentage = prevPercentage < 100 ? prevPercentage + 1 : 100;
        if (newPercentage === 100) {
          clearInterval(interval);

          // Delay before transitioning to allow user to see 100%
          setTimeout(() => {
            setIsLoading(false);
            onLoadComplete();
          }, 1000);
        }

        return newPercentage;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (

    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div className="relative w-full max-w-2xl px-8 flex flex-col items-center justify-center space-y-8">
        {/* Logo */}
        <div className="w-48 h-48 opacity-90">
          <img
            src={RenditionLogo}
            alt="Rendition Logo"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Percentage Text */}
        <div className="text-white text-xl font-light tracking-wider ">
          Loading...
        </div>

        {/* Elegant Single Line Loader */}
        <div className="w-full h-[2px] relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-white transition-all duration-300 ease-linear"
            style={{
              width: `${percentage}%`,
              background: 'linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.3))',
              boxShadow: '0 0 15px rgba(255,255,255,0.3)'
            }}
          />
        </div>

      </div>
    </div>
  );
};

const useComponentLoader = (componentCount) => {
  const [loadedComponents, setLoadedComponents] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  const incrementLoaded = () => {
    setLoadedComponents((prev) => {
      const newLoadedCount = prev + 1;
      if (newLoadedCount === componentCount) {
        setIsFullyLoaded(true);
      }
      return newLoadedCount;
    });
  };

  return { loadedComponents, isFullyLoaded, incrementLoaded };
};

function App() {
  const { loadedComponents, isFullyLoaded, incrementLoaded } = useComponentLoader(7); // 7 components
  const [showWebsite, setShowWebsite] = useState(false);

  const handleLoadComplete = () => {
    // Smoothly transition to website after loader completes
    setTimeout(() => {
      setShowWebsite(true);
    }, 500);
  };

  return (
    <div className="flex flex-col overflow-x-hidden bg-black">
      {!showWebsite && (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      )}

      <div className={`transition-opacity scroll-container duration-1000 ${showWebsite ? 'opacity-100' : 'opacity-0'
        }`}>
        <BrowserRouter>
          <Navbar onLoad={incrementLoaded} />
          <Home onLoad={incrementLoaded} className='section' />
          <Teachings onLoad={incrementLoaded} className='section' />
          <Events onLoad={incrementLoaded} className='section' />
          <Team onLoad={incrementLoaded} className='section' />
          <Productions onLoad={incrementLoaded} className='section' />
          <Form onLoad={incrementLoaded} className='section' />
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;