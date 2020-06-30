import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Hero } from '../static/components';
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
        components.push(
          <div style={xs ? transformMobileStyle(comp) : transformDesktopStyle(comp)}>
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
        const desktopStyle = transformDesktopStyle(comp);
        const mobileStyle = transformMobileStyle(comp);

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
          <div style={transformDesktopStyle(comp)}>{generateComponents(comp.value, xs)}</div>
        );
        break;
    }
  });
  return components;
};
