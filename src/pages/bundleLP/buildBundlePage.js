import React, { useCallback } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Button, NavLink } from '../../components/common';
import { HomeVariantCard } from '../home/';
import LPButton from './LPButton';
import {
  Paragraph,
  Title,
  transformMobileStyle,
  transformDesktopStyle
} from '../static/transformComponents';

export const generateComponents = (page, xs, products) => {
  const components = [];

  page.components.forEach(comp => {
    const desktopStyle = transformDesktopStyle(comp);
    const mobileStyle = transformMobileStyle(comp);
    switch (comp.type) {
      case 'hero':
        components.push(
          <div style={{ margin: '0 auto' }}>
            <img
              src={xs ? comp.mobileImg : comp.desktopImg}
              style={xs ? mobileStyle : desktopStyle}
            />
          </div>
        );
        break;
      case 'image':
        components.push(
          <div
            style={xs ? { margin: comp.mobileStyle.margin } : { margin: comp.desktopStyle.margin }}
          >
            <img
              src={xs ? comp.mobileImg : comp.desktopImg}
              style={xs ? mobileStyle : desktopStyle}
            />
          </div>
        );
        break;
      case 'product':
        const contentfulSKU = comp.value.map(prod => prod.sku);
        const contentfulProds = products
          .filter(product => contentfulSKU.includes(product.sku.split('-')[0]))
          .map(product => product);

        components.push(
          <Grid container spacing={3} style={xs ? mobileStyle : desktopStyle}>
            {contentfulProds.map(variant => (
              <HomeVariantCard variant={variant} key={variant.id} />
            ))}
          </Grid>
        );

        break;
      case 'pageTitle':
      case 'sectionTitle':
        components.push(<Title data={comp} value={comp.value} xs={xs} />);
        break;
      case 'button':
        const btnType = comp.value.toLowerCase() === 'add to cart';
        components.push(
          <div style={xs ? mobileStyle : desktopStyle}>
            {btnType ? (
              <LPButton data={comp} />
            ) : (
              <Button to={comp.URL} component={NavLink}>
                {comp.value}
              </Button>
            )}
          </div>
        );
        break;
      case 'paragraph':
        components.push(<Paragraph data={comp} value={comp.value} xs={xs} />);
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
            style={
              xs
                ? { ...mobileStyle, margin: comp.mobileStyle.margin }
                : { ...desktopStyle, margin: comp.desktopStyle.margin }
            }
          >
            {generateComponents(comp.value, xs)}
          </div>
        );
        break;
      default:
        break;
    }
  });

  return components;
};
