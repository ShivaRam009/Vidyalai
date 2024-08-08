import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context
const WindowWidthContext = createContext();

// Create a Provider component
export const WindowWidthProvider = ({ children }) => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallerDevice(width < 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

// Custom hook to use the context
export const useWindowWidth = () => {
  const context = useContext(WindowWidthContext);
  if (!context) {
    throw new Error('useWindowWidth must be used within a WindowWidthProvider');
  }
  return context;
};
