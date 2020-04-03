import React from 'react';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
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
  let components = [];

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
            <Image data={obj} template={template} type={obj.type} caption={obj.caption} />
          </>
        );
        break;
      case 'paragraph':
        components.push(
          <>
            <Paragraph data={obj} template={template} type={obj.type} />
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
      case 'sectionSubTitle':
        components.push(
          <>
            <Title data={obj} template={template} type={obj.type} />
          </>
        );
        break;
      case 'list':
        components.push(
          <>
            <List data={obj} template={template} type={obj.type} symbol={obj.desktopStyle.bulletSymbol} />
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
