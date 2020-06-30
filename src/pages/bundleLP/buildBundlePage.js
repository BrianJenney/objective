import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Hero } from '../static/components';
import { Button } from '../../components/common';
import {
  Paragraph,
  Title,
  transformMobileStyle,
  transformDesktopStyle
} from '../static/transformComponents';
export const generateComponents = (page, xs) => {
  console.log('testing', page);
  const components = [];
  const useStyles = makeStyles(() => ({
    margin: {
      margin: '0 auto'
    }
  }));

  page.components.forEach(comp => {
    const borderStyle = {
      border: comp.desktopStyle.borderColor ? comp.desktopStyle.borderColor : '1px solid grey'
    };
    const isBorder = comp.desktopStyle.border
      ? borderStyle
      : { paddingBottom: 20, marginBottom: 20, textAlign: 'center' };
    switch (comp.type) {
      case 'hero':
        components.push(
          <div style={{ margin: '0 auto' }}>
            <Grid item xs={12} md={10}>
              <Hero data={comp} />
            </Grid>
          </div>
        );
        break;
      case 'pageTitle':
        components.push(<Title data={comp} value={comp.value} xs={xs} />);
        break;
      case 'button':
        components.push(<Button>{comp.value}</Button>);
        break;
      case 'paragraph':
        components.push(
          <>
            <Paragraph data={comp} value={comp.value} xs={xs} />
          </>
        );
        break;
      case 'box':
        const desktopStyle = transformDesktopStyle(comp);
        desktopStyle.border = desktopStyle.borderColor;
        desktopStyle.top = 'calc(100% / 3.5)';
        desktopStyle.margin = '0 0 0 120px';
        const mobileStyle = transformMobileStyle(comp);
        console.log('testing-style', mobileStyle);
        mobileStyle.border = desktopStyle.borderColor;
        mobileStyle.top = '80%';
        mobileStyle.margin = '0 11%';
        components.push(
          <Box style={xs ? mobileStyle : desktopStyle}>{generateComponents(comp.value, xs)}</Box>
        );
        break;
      case 'oneColSection':
        components.push(
          <div style={transformDesktopStyle(comp)}>{generateComponents(comp.value, xs)}</div>
        );
        break;
    }
  });
  return components;
};
