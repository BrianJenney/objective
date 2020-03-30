import React from 'react';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Hero, Image, Paragraph, Title, Subtitle, Header, SPButton, SPBox, Banner } from '../pages/static/components';

export const buildPage = page => {
  const tmpComps = GeneratePageComponents(page.components, page.template, page.name);
  return <GenerateTemplate data={tmpComps} header={page.components.filter(c => c.type === 'navigation')[0]} />;
};

export const GenerateTemplate = ({ data, header }) => (
  <div>
    <Header data={header} />
    <Container>
      <RenderComponents components={data} />
    </Container>
  </div>
);

export const GeneratePageComponents = (comps, template, pageName) => {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: '0 auto'
    }
  }));
  const classes = useStyles();
  const components = [];

  comps.map(obj => {
    switch (obj.type) {
      case 'pageTitle':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin}>
              <Title data={obj} template={template} type={obj.type} pageName={pageName} />
            </Grid>
          </>
        );
        break;
      case 'pageSubTitle':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin}>
              <Subtitle data={obj} template={template} type={obj.type} />
            </Grid>
          </>
        );
        break;
      case 'hero':
        components.push(
          <>
            <Grid item xs={12} md={10} className={classes.margin}>
              <Hero data={obj} template={template} type={obj.type} />
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
              />
            </Grid>
          </>
        );
        break;
      case 'oneColSection':
        components.push(
          <>
            <Grid item xs={12} md={8} className={`${classes.margin} ${obj.id}`}>
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
  const components = [];

  comps.map(obj => {
    switch (obj.type) {
      case 'sectionTitle':
        components.push(
          <>
            <Title data={obj} template={template} type={obj.type} pageName={pageName} />
          </>
        );
        break;
      case 'image':
        components.push(
          <>
            <Image data={obj} template={template} type={obj.type} />
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
      case 'button':
        components.push(
          <>
            <SPButton data={obj} template={template} type={obj.type} align={obj.desktopStyle.align} />
          </>
        );
        break;
      case 'box':
        components.push(
          <>
            <SPBox data={obj} template={template} type={obj.type} comps={obj.value.components} />
          </>
        );
        break;
      case 'list':
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
