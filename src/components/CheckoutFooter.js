import React from 'react';
import { Link } from 'react-router-dom';
import './Footer-style.scss';

class CheckoutFooter extends React.Component {
  render() {
    return (
      <div
        className="checkout-footer-container"
        style={{
          padding: 50,
          background: 'rgba(252, 248, 244, 0.5)',
          borderTop: '1px solid',
          fontFamily: 'p22-underground, sans-serif',
          fontSize: 18,
          display: 'flex'
        }}
      >
        <span style={{ paddingRight: 5 }}>Need Help?</span>{' '}
        <Link
          to="/contact"
          style={{
            textTransform: 'uppercase',
            textDecoration: 'none'
          }}
        >
          Contact Us
        </Link>
      </div>
    );
  }
}

export default CheckoutFooter;
