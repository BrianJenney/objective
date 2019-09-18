import React, { useState, useEffect } from 'react';

const ScrollToTop = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return children || null;
};

export default ScrollToTop;