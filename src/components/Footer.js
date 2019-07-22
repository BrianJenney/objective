import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <Link to="/about">About Us</Link>
      <Link to="/terms">Terms & Conditions</Link>
    </div>
  );
};

export default Footer;