import React, { useState, useEffect } from 'react';

const ScrollToTop = ({ children }) => {
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  });

  return children || null;
};

export default ScrollToTop;
