import React from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
  List,
  SPStickyBtn
} from '../pages/static/components';
import { StyledContainer } from '../assets/styles/StyledComponents';
import { transformDesktopStyle } from '../pages/static/transformComponents';

export const buildPage = page => {
  const tmpComps = GeneratePageComponents(page.components, page.template, page.name);
  return (
    <GenerateTemplate
      data={tmpComps}
      template={page.template}
      header={page.components.filter(c => c.type === 'navigation')[0]}
    />
  );
};

export const GenerateTemplate = ({ data, header, template }) => {
  GenerateTemplate.propTypes = {
    data: PropTypes.func.isRequired,
    header: PropTypes.func.isRequired,
    template: PropTypes.func.isRequired
  };
  return (
    <div>
      <Header data={header} template={template} type={header.type} />
      <StyledContainer className="renderComp">
        <RenderComponents components={data} />
      </StyledContainer>
    </div>
  );
};

export const GeneratePageComponents = (comps, template, pageName) => {
  const useStyles = makeStyles(() => ({
    margin: {
      margin: '0 auto'
    }
  }));
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const components = [];

  comps.forEach(obj => {
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
      case 'hero': {
        const nav = comps.filter(comp => comp.type === 'navigation');
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
      }
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
      case 'stickyBtn':
        const styles = transformDesktopStyle(obj);

        components.push(
          <aside
            style={{
              ...styles,
              border: styles.borderColor,
              top: '10px',
              margin: obj.desktopStyle.margin
            }}
          >
            <SPStickyBtn data={obj.value.components} xs={xs} />
          </aside>
        );
        break;
      case 'oneColSection':
        components.push(
          <div className="one-column">
            <Grid
              item
              xs={12}
              md={8}
              style={{ clear: 'both' }}
              className={`${classes.margin} ${obj.id}`}
              id={`${obj.name}`}
            >
              <RenderComponents
                components={GenerateOneColumn(obj.value.components, template, pageName, xs)}
              />
            </Grid>
          </div>
        );
        break;
      case 'twoColSection':
        components.push(
          <>
            <Grid
              item
              xs={12}
              md={8}
              className={`${classes.margin} ${obj.id}`}
              id={`${obj.name}`}
              style={{
                border: obj.desktopStyle.borderColor || '2px solid #000',
                margin: obj.desktopStyle.margin || '40px auto'
              }}
            >
              <RenderComponents
                components={GenerateTwoColumn(obj.value.components, template, pageName, xs)}
              />
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

export const GenerateTwoColumn = (comps, template, pageName, xs) => {
  const components = [];

  comps.forEach(obj => {
    switch (obj.type) {
      case 'sectionTitle':
        components.push(
          <>
            <Title
              data={obj}
              template={template}
              type={obj.type}
              pageName={pageName}
              id={`${obj.name}`}
            />
          </>
        );
        break;
      case 'image':
        components.push(
          <>
            <Image
              data={obj}
              template={template}
              type={obj.type}
              caption={obj.caption}
              id={`${obj.name}`}
              style={{ margin: xs ? '0 0 20px' : '20px' }}
            />
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

      case 'sectionSubTitle':
        components.push(
          <>
            <Title
              data={obj}
              template={template}
              type={obj.type}
              pageName={pageName}
              id={`${obj.name}`}
            />
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
      case 'container':
        components.push(
          <div
            style={{
              padding: xs ? obj.mobileStyle.margin : obj.desktopStyle.margin || '0 20px 40px'
            }}
          >
            {GenerateTwoColumn(obj.value.components, template, pageName)}
          </div>
        );
        break;
      default:
        break;
    }
  });

  return components;
};

export const GenerateOneColumn = (comps, template, pageName, xs) => {
  const components = [];

  comps.forEach(obj => {
    switch (obj.type) {
      case 'sectionTitle':
        components.push(
          <>
            <Title
              data={obj}
              template={template}
              type={obj.type}
              pageName={pageName}
              id={`${obj.name}`}
            />
          </>
        );
        break;
      case 'image':
        components.push(
          <>
            <Image
              data={obj}
              template={template}
              type={obj.type}
              caption={obj.caption}
              id={`${obj.name}`}
            />
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
            <SPBox
              data={obj}
              template={template}
              type={obj.type}
              comps={obj.value.components}
              id={`${obj.name}`}
            />
          </>
        );
        break;
      case 'sectionSubTitle':
        components.push(
          <>
            <Title
              data={obj}
              template={template}
              type={obj.type}
              pageName={pageName}
              id={`${obj.name}`}
            />
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
      case 'table':
        components.push(
          <>
            <SPBox
              data={obj}
              template={template}
              type={obj.type}
              comps={obj.value.components}
              id={`${obj.name}`}
            />
          </>
        );
        break;
      default:
        break;
    }
  });

  if (!xs) {
    let startInd = 0;
    components.forEach((currVal, ind) => {
      if (currVal.props.children.props.data.type === 'sectionTitle') {
        startInd = ind + 1;
      }

      if (currVal.props.children.props.data.type === 'box') {
        const boxComp = components.splice(ind, 1)[0];
        components.splice(startInd, 0, boxComp);
      }
    });
  }

  return components;
};

export const RenderComponents = ({ components }) => components.map(component => <>{component}</>);
