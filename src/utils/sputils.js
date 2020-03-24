import React from 'react';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
import { Hero, Image, Paragraph, Title, Subtitle, Header } from '../pages/static/components';
import { makeStyles } from '@material-ui/core/styles';

export const buildPage = page => {
  let tmpComps = GeneratePageComponents(page.components, page.template);
  return <GenerateTemplate data={tmpComps} header={page.components.filter(c => c.type === 'navigation')[0]} />;
};

export const GenerateTemplate = ({ data, header }) => {
  return (
    <div>
      <Header data={header} />
      <Container>
        <RenderComponents components={data} />
      </Container>
    </div>
  );
};

export const GeneratePageComponents = (comps, template) => {
  const useStyles = makeStyles(theme => ({
    title: {
      margin: '55px 0 15px',
      [theme.breakpoints.down('sm')]: {
        margin: '15px 0 5px'
      }
    },
    subtitle: {
      margin: '0 0 45px;',
      [theme.breakpoints.down('sm')]: {
        margin: '0 0 10px'
      }
    },
    margin: {
      margin: '0 auto'
    },
    image: {
      marginBottom: 45,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 25
      }
    }
  }));
  const classes = useStyles();
  let components = [];

  comps.map(obj => {
    switch (obj.type) {
      case 'pageTitle':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin}>
              <Grid className={classes.title}>
                <Title data={obj} />
              </Grid>
            </Grid>
          </>
        );
        break;
      case 'pageSubTitle':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin}>
              <Grid className={classes.subtitle}>
                <Subtitle data={obj} />
              </Grid>
            </Grid>
          </>
        );
        break;
      case 'hero':
        components.push(
          <>
            <Grid item md={10} className={`${classes.margin} ${classes.image}`}>
              <Hero data={obj} />
            </Grid>
          </>
        );
        break;
      case 'oneColumnBox':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin}>
              <RenderComponents components={GenerateOneColumn(obj.value.components)} />
            </Grid>
          </>
        );
        break;
      default:
        break;
    }
  });

  return components;
};

export const GenerateOneColumn = comps => {
  let components = [];

  comps.map(obj => {
    switch (obj.type) {
      case 'sectionTitle':
        components.push(
          <>
            <Title data={obj} />
          </>
        );
        break;
      case 'image':
        components.push(
          <>
            <Image data={obj} />
          </>
        );
        break;
      case 'paragraph':
        components.push(
          <>
            <Paragraph data={obj} />
          </>
        );
        break;
      default:
        break;
    }
  });

  return components;
};

export const RenderComponents = ({ components }) => components.map((component, i) => <>{component}</>);
