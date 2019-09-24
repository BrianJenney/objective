import React from 'react';

class CheckoutFooter extends React.Component {
  render() {
    return (
      <div
        style={{
          padding: 50,
          background: 'rgba(252, 248, 244, 0.5)',
          borderTop: 'solid',
          fontFamily: 'p22-underground, sans-serif',
          fontSize: 18,
          display: 'flex'
        }}
      >
        <span style={{ paddingRight: 5 }}>Need Help?</span>
        <a href="" style={{ color: 'black' }}>
          CONTACT US
        </a>
      </div>
    );
  }
}

export default CheckoutFooter;
