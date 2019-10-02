import React, { useContext } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import ProductContext from '../../contexts/ProductContext';
import Typography from '@material-ui/core/Typography';

export default function Instruction() {
  const { content, product } = useContext(ProductContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const box = {
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    pt: 10,
    pb: 5
  };

  if (!content) {
    return null;
  }

  const { when, how, how_much } = content.howToTake;
  const When = () => (
    <div className="one-box whhm-slide" id="slide-1">
      <div className="one-label">WHEN</div>
      <div className="img-container">
        <img className="clock-icon" src={when.icon} alt="" />
      </div>
      <div
        className="one-bottom-color"
        style={{ backgroundColor: product.color }}
      >
        <div className="one-title">{when.label}</div>
      </div>
    </div>
  );
  const How = () => (
    <div className="two-box whhm-slide" id="slide-2">
      <div className="two-label">HOW</div>
      <div className="img-container">
        <img className="glass-icon" src={how.icon} alt="" />
      </div>
      <div
        className="two-bottom-color"
        style={{ backgroundColor: product.color }}
      >
        <div className="two-title">{how.label}</div>
      </div>
    </div>
  );
  const HowMuch = () => (
    <div className="three-box whhm-slide" id="slide-3">
      <div className="three-label">HOW MUCH</div>
      <div className="img-container">
        <img className="spoons-icon" src={how_much.icon} alt="" />
      </div>
      <div
        className="three-bottom-color"
        style={{ backgroundColor: product.color }}
      >
        <div className="three-title">{how_much.label}</div>
      </div>
    </div>
  );

  return (
    <Container>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} sm={5}>
          <Box {...box}>
            <Typography
              style={{
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: 2.25,
                fontFamily: 'p22-underground, sans-serif',
                textAlign: 'center',
                alignItems: 'center'
              }}
            >
              HOW TO TAKE
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <div className="whhm-wrapper">
        <div className="step-slider">
          <Grid container justify="center" xs={12} space={3}>
            <Grid item>
              <When />
            </Grid>
            <Grid item>
              <How />
            </Grid>
            <Grid item>
              <HowMuch />
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}
