import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to="/" className="active item">Home</Link>
      <Link to="/gallery" className="item">Products</Link>
      <Link to="/cart" className="item"><i className="cart link icon"></i> Cart</Link>
      <Link to="/login" className="item">Login</Link>
    </div>
  );
};

export default Navbar;