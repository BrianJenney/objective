import React, { useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import ProductContext from '../../contexts/ProductContext';

export default function Instruction() {
  const { content } = useContext(ProductContext);
  const box = {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: 2.25,
    fontFamily: 'p22-underground, sans-serif',
    textAlign: 'center',
    alignItems: 'center',
    pt: 10,
    pb: 5
  };

  if (!content) {
    return null;
  }

  const { when, how, how_much } = content.howToTake;

  return (
    <Container>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} sm={5}>
          <Box {...box}>HOW TO TAKE</Box>
        </Grid>
      </Grid>
      <div className="whhm-wrapper">
        <div className="step-slider">
          <div className="one-box whhm-slide" id="slide-1">
            <div className="one-label">WHEN</div>
            <div className="img-container">
              <img className="clock-icon" src={when.icon} alt="" />
            </div>
            <div className="one-bottom-color">
              <div className="one-title">{when.label}</div>
            </div>
          </div>
          <div className="two-box whhm-slide" id="slide-2">
            <div className="two-label">HOW</div>
            <div className="img-container">
              <img className="glass-icon" src={how.icon} alt="" />
            </div>
            <div className="two-bottom-color">
              <div className="two-title">{how.label}</div>
            </div>
          </div>
          <div className="three-box whhm-slide" id="slide-3">
            <div className="three-label">HOW MUCH</div>
            <div className="img-container">
              <img className="spoons-icon" src={how_much.icon} alt="" />
            </div>
            <div className="three-bottom-color">
              <div className="three-title">{how_much.label}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
