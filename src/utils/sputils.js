import React from 'react';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

function generateComponents(comps) {
  let components = [];
  let renderedComponents = comps.map(obj => {
    switch (obj.type) {
      case 'navigation':
        break;
      case 'title':
        components.push(
          <>
            <Grid item xs={12} md={8}>
              <h1>{obj.value}</h1>
            </Grid>
          </>
        );
        break;
      case 'subtitle':
        components.push(
          <>
            <Grid item xs={12} md={8}>
              <h3>{obj.value}</h3>
            </Grid>
          </>
        );
        break;
      case 'hero':
        components.push(
          <>
            <Grid container className="heroHere">
              <Grid item xs={12} md={8}>
                <img src={obj.desktopImg} />
              </Grid>
            </Grid>
          </>
        );
        break;
      case 'oneColumn':
        //generateComponents(obj.value.components));
        break;
      case 'paragraph':
        const paragraph = obj.value.map(p => {
          return (
            <>
              <p> {p}</p>
            </>
          );
        });
        components.push(paragraph);
        break;
      default:
        break;
    }
  });

  return components;
}

export const buildPage = page => {
  return generateComponents(page.components);
};
