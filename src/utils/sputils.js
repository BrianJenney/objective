import React from 'react';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
import { Hero, Image, Paragraph, Title, Subtitle, Header, SPButton } from '../pages/static/components';
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
            <Title data={obj} template={template} type={obj.type} />
          </>
        );
        break;
      case 'pageSubTitle':
        components.push(
          <>
            <Subtitle data={obj} template={template} type={obj.type} />
          </>
        );
        break;
      case 'hero':
        components.push(
          <>
            <Hero data={obj} template={template} type={obj.type} />
          </>
        );
        break;
      case 'oneColumnBox':
        components.push(
          <>
            <Grid item xs={12} md={8} className={classes.margin}>
              <RenderComponents components={GenerateOneColumn(obj.value.components, template)} />
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

export const GenerateOneColumn = (comps, template) => {
  let components = [];

  comps.map(obj => {
    switch (obj.type) {
      case 'sectionTitle':
        components.push(
          <>
            <Title data={obj} template={template} type={obj.type} />
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
            <SPButton data={obj} template={template} type={obj.type} />
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
