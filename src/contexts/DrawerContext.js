import React, { useState } from 'react';

const initialDrawerContext = {
  isDrawerOpen: { open: false },
  setIsDrawerOpen: () => {}
};

export const useDrawerStatus = () => {
  const initialDrawerState = initialDrawerContext.isDrawerOpen;
  const [isDrawerOpen, setIsDrawerOpen] = useState(initialDrawerState);

  return {
    isDrawerOpen,
    setIsDrawerOpen
  };
};

export const DrawerStatusContext = React.createContext(initialDrawerContext);
