import React from 'react';
import { useMediaQuery, Container, Grid, useTheme } from '@material-ui/core';
import {
  Hero,
  Image,
  Paragraph,
  Title,
  Subtitle,
  Header,
  HeaderMobile,
  SPButton,
  SPBox,
  Banner,
  List
} from '../pages/static/components';
import { makeStyles } from '@material-ui/core/styles';

export const buildPage = page => {
  let tmpComps = GeneratePageComponents(page.components, page.template, page.name);
  return (
    <GenerateTemplate
      data={tmpComps}
      template={page.template}
      header={page.components.filter(c => c.type === 'navigation')[0]}
    />
  );
};

export const GenerateTemplate = ({ data, header, template }) => {
  return (
    <div>
      <Header data={header} template={template} type={header.type} />
      <Container>
        <RenderComponents components={data} />
      </Container>
    </div>
  );
};

export const GeneratePageComponents = (comps, template, pageName) => {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: '0 auto'
    }
  }));
  const classes = useStyles();
  let components = [];

  comps.map(obj => {
    switch (obj.type) {
      case 'pageTitle':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin} id={`${obj.name}`}>
              <Title data={obj} template={template} type={obj.type} pageName={pageName} />
            </Grid>
          </>
        );
        break;
      case 'pageSubTitle':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin} id={`${obj.name}`}>
              <Subtitle data={obj} template={template} type={obj.type} />
            </Grid>
          </>
        );
        break;
      case 'hero':
        const nav = comps.filter(obj => obj.type === 'navigation');
        components.push(
          <>
            <Grid item xs={12} md={10} className={classes.margin}>
              <Hero data={obj} template={template} type={obj.type} />
            </Grid>
            <Grid item xs={12} md={10} className={classes.margin}>
              <HeaderMobile data={nav} template={template} />
            </Grid>
          </>
        );
        break;
      case 'banner':
        components.push(
          <>
            <Grid item xs={12} md={10} className={classes.margin}>
              <Banner
                data={obj}
                template={template}
                type={obj.type}
                borderPlacement={obj.desktopStyle.borderPlacement}
                id={`${obj.name}`}
              />
            </Grid>
          </>
        );
        break;
      case 'oneColSection':
        components.push(
          <>
            <Grid
              item
              xs={12}
              md={8}
              style={{ clear: 'both' }}
              className={`${classes.margin} ${obj.id}`}
              id={`${obj.name}`}
            >
              <RenderComponents components={GenerateOneColumn(obj.value.components, template, pageName)} />
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

export const GenerateOneColumn = (comps, template, pageName) => {
  let components = [];

  comps.map(obj => {
    switch (obj.type) {
      case 'sectionTitle':
        components.push(
          <>
            <Title data={obj} template={template} type={obj.type} pageName={pageName} id={`${obj.name}`} />
          </>
        );
        break;
      case 'image':
        components.push(
          <>
            <Image data={obj} template={template} type={obj.type} caption={obj.caption} id={`${obj.name}`} />
          </>
        );
        break;
      case 'paragraph':
        components.push(
          <>
            <Paragraph data={obj} template={template} type={obj.type} id={`${obj.name}`} />
          </>
        );
        break;
      case 'button':
        components.push(
          <>
            <SPButton
              data={obj}
              template={template}
              type={obj.type}
              align={obj.desktopStyle.align}
              id={`${obj.name}`}
            />
          </>
        );
        break;
      case 'box':
        components.push(
          <>
            <SPBox data={obj} template={template} type={obj.type} comps={obj.value.components} id={`${obj.name}`} />
          </>
        );
        break;
      case 'sectionSubTitle':
        components.push(
          <>
            <Title data={obj} template={template} type={obj.type} pageName={pageName} id={`${obj.name}`} />
          </>
        );
        break;
      case 'list':
        components.push(
          <>
            <List
              data={obj}
              template={template}
              type={obj.type}
              symbol={obj.desktopStyle.bulletSymbol}
              id={`${obj.name}`}
            />
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

export const ResizeImage = (template, data) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('xs'));
  let defaultParams;

  switch (template) {
    case 'LP-Template-1':
      if (data.desktopImg) {
        defaultParams = '?w=315';
      }
      break;
    default:
      defaultParams = '?w=315';
  }

  const desktopWidth = data.desktopStyle.width;
  const desktopHeight = data.desktopStyle.height;

  const mobileWidth = data.mobileStyle.width;
  const mobileHeight = data.mobileStyle.height;

  let params;

  if (!sm) {
    if (!desktopWidth && !desktopHeight) {
      params = defaultParams;
    } else if (desktopWidth && !desktopHeight) {
      params = `?w=${desktopWidth}`;
    } else if (desktopHeight && !desktopWidth) {
      params = defaultParams;
    } else {
      params = defaultParams;
    }
  } else {
    if (!mobileWidth && !mobileHeight) {
      params = '?w=164';
    } else if (mobileWidth && !mobileHeight) {
      params = `?w=${mobileWidth}`;
    } else if (mobileHeight && !mobileWidth) {
      params = '?w=164';
    } else {
      params = '?w=164';
    }
  }

  return params;
};
