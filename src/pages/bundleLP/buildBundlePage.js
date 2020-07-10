import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { Button, NavLink } from '../../components/common';
import { HomeVariantCard } from '../home/';
import LPButton from './LPButton';
import LPParagraph from './LPParagraph';
import LPNavigation from './LPNavigation';
import { Title, transformMobileStyle, transformDesktopStyle } from '../static/transformComponents';

export const buildComponents = (page, xs, products) => {
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
            style={
              xs ? { padding: comp.mobileStyle.margin } : { padding: comp.desktopStyle.margin }
            }
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
          <Grid
            container
            spacing={3}
            style={xs ? mobileStyle : { ...desktopStyle, justifyContent: 'center' }}
          >
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
      case 'navigation':
        components.push(<LPNavigation data={comp} xs={xs} />);
        break;
      case 'button':
        components.push(
          <div style={xs ? mobileStyle : desktopStyle}>
            <LPButton data={comp} />
          </div>
        );
        break;
      case 'paragraph':
        const borderStyle = {};
        if (desktopStyle.border) {
          const borderType = comp.desktopStyle.borderPlacement;
          borderStyle[borderType] = desktopStyle[borderType];
        }
        components.push(
          <>
            <LPParagraph
              data={comp}
              value={comp.value}
              xs={xs}
              noBorder
              hideText={comp.desktopStyle.wordWrap}
            />
            {desktopStyle.border ? (
              <div style={{ padding: xs ? '30px 0 20px' : '50px 0 20px' }}>
                <hr style={{ ...borderStyle, width: '193px' }}></hr>
              </div>
            ) : null}
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
                  margin: comp.mobileStyle.margin || '0 3vh'
                }
                : {
                  ...desktopStyle,
                  border: desktopStyle.borderColor,
                  top: 'calc(14%)',
                  margin: '0 0 0 100px'
                }
            }
          >
            {buildComponents(comp.value, xs)}
          </Box>
        );
        break;
      case 'oneColSection':
        components.push(
          <div
            style={xs ? { ...mobileStyle } : { ...desktopStyle, margin: comp.desktopStyle.margin }}
          >
            {buildComponents(comp.value, xs)}
          </div>
        );
        break;
      default:
        break;
    }
  });

  return components;
};
