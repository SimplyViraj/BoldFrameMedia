import React, { createContext, useContext, useState, useCallback } from 'react';

const PageTransitionContext = createContext();

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
};

export const PageTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);

  const startTransition = useCallback((route) => {
    setPendingRoute(route);
    setIsTransitioning(true);
  }, []);

  const completeTransition = useCallback(() => {
    setIsTransitioning(false);
    setPendingRoute(null);
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        pendingRoute,
        startTransition,
        completeTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};
