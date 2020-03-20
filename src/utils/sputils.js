import React from 'react';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
import { Hero, Image, Paragraph, Title, Subtitle, Header } from '../pages/static/components';
import { makeStyles } from '@material-ui/core/styles';

export const buildPage = page => {
  if (page.template === 'Template-1') {
    let tmpComps = GenerateComponents(page.components, page.template);

    return <GenerateTemplate data={tmpComps} header={page.components.filter(c => c.type === 'navigation')[0]} />;
  }
};

export const GenerateComponents = (comps, template) => {
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
      case 'title':
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
      case 'subtitle':
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
      case 'oneColumn':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin}>
              <RenderPage components={GenerateOneColumn(obj.value.components)} />
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

export const GenerateTemplate = ({ data, header }) => {
  return (
    <div>
      <Header data={header} />
      <Container>
        <RenderPage components={data} />
      </Container>
    </div>
  );
};

export const GenerateOneColumn = comps => {
  let components = [];

  comps.map(obj => {
    switch (obj.type) {
      case 'title':
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

export const RenderPage = ({ components }) => components.map((component, i) => <>{component}</>);

export const Template1 = () => {
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

  return classes;
};
