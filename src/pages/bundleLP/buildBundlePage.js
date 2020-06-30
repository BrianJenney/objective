import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button, NavLink } from '../../components/common';
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
    const desktopStyle = transformDesktopStyle(comp);
    const mobileStyle = transformMobileStyle(comp);
    switch (comp.type) {
      case 'hero':
        components.push(
          <div style={{ margin: '0 auto' }}>
            <Grid item xs={12} md={10}>
              <img
                src={xs ? comp.mobileImg : comp.desktopImg}
                style={xs ? mobileStyle : desktopStyle}
              />
            </Grid>
          </div>
        );
        break;
      case 'pageTitle':
        components.push(<Title data={comp} value={comp.value} xs={xs} />);
        break;
      case 'button':
        components.push(
          <div style={xs ? mobileStyle : desktopStyle}>
            <Button to={comp.URL} component={NavLink}>
              {comp.value}
            </Button>
          </div>
        );
        break;
      case 'paragraph':
        components.push(
          <>
            <Paragraph data={comp} value={comp.value} xs={xs} />
          </>
        );
        break;
      case 'box':
        components.push(
          <Box
            style={
              xs
                ? {
                  ...mobileStyle,
                  border: mobileStyle.borderColor,
                  top: '80%',
                  margin: '0 11%'
                }
                : {
                  ...desktopStyle,
                  border: desktopStyle.borderColor,
                  top: 'calc(100% / 3.5)',
                  margin: '0 0 0 120px'
                }
            }
          >
            {generateComponents(comp.value, xs)}
          </Box>
        );
        break;
      case 'oneColSection':
        components.push(
          <div
            style={{ ...desktopStyle, margin: xs ? comp.desktopStyle.margin || '0 0 250px' : '0' }}
          >
            {generateComponents(comp.value, xs)}
          </div>
        );
        break;
    }
  });
  return components;
};
