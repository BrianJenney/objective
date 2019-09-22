import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { fonts } from '../../components/Theme/fonts';
import { StyledCheckoutButton } from './StyledComponents';

const { $brandSans } = fonts;

class ContShoppingButton extends Component {
  render() {
    const { onClick, children } = this.props;
    return (
      <>
        <Link
          to="/gallery"
          style={{
            color: 'white',
            'text-decoration': 'none',
            'font-family': $brandSans,
            'font-weight': 'bold'
          }}
        >
          <Grid container xs={12}>
            <Grid item xs={12} style={{ display: 'flex', padding: '0 16px 30px' }}>
              <StyledCheckoutButton
                style={{ margin: '0 auto' }}
                onClick={onClick}
                children={children}
                color="primary"
                variant="contained"
              >
                Continue Shopping
      </StyledCheckoutButton>
            </Grid>
          </Grid>
        </Link>
      </>
    )
  }


}

export default ContShoppingButton
