import React from 'react';
import Typography from '@material-ui/core/Typography';

class CheckoutHeader extends React.Component {
  render() {
    return (
      <>
        <Typography
        xs={12}
          style={{
            fontSize: 48,
            fontFamily: 'p22-underground, Helvetica, sans'
          }}
        >
          {' '}
          Truehealth
        </Typography>
      </>
    );
  }
}

export default CheckoutHeader;
