/* eslint-disable import/no-cycle */
/* eslint-disable react/no-danger */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Box, Container } from '@material-ui/core';
import Scrollchor from 'react-scrollchor';
import { PropTypes } from 'prop-types';
import LPParagraph from '../bundleLP/LPParagraph';

const commonPropTypes = {
  data: PropTypes.object,
  value: PropTypes.string,
  xs: PropTypes.bool
};

export const Title = ({ data, value, xs }) => (
  <div style={xs ? transformMobileStyle(data) : transformDesktopStyle(data)}>{value}</div>
);

Title.propTypes = {
  ...commonPropTypes
};

export const SectionTitle = ({ data, value, xs }) => (
  <div style={xs ? transformMobileStyle(data) : transformDesktopStyle(data)}>{value}</div>
);

SectionTitle.propTypes = {
  ...commonPropTypes
};

export const Image = ({ data, xs }) => (
  <img
    style={xs ? transformMobileStyle(data) : transformDesktopStyle(data)}
    src={data.desktopImg}
    alt={data.name}
  />
);

Image.propTypes = {
  ...commonPropTypes
};

export const InlineAnchor = ({ data, value, xs }) => {
  const transformedStyles = xs ? transformMobileStyle(data) : transformDesktopStyle(data);
  return (
    <div style={transformedStyles}>
      <Scrollchor to={`#${value[0].scroll}`} style={{ textDecoration: 'none' }}>
        {value[0].label}
      </Scrollchor>
    </div>
  );
};

InlineAnchor.propTypes = {
  ...commonPropTypes
};

// Anchor links for terms of use page:
export const AnchorList = ({ data, value, xs }) => {
  const indented = data.name.toLowerCase().includes('indent');
  const transformedStyles = xs ? transformMobileStyle(data) : transformDesktopStyle(data);
  const bullet = indented ? 'circle' : 'disc';
  const listStyle = {
    ...transformedStyles,
    listStylePosition: 'inside',
    listStyleType: bullet,
    margin: '0'
  };

  const result = value.map(item => (
    <li style={listStyle}>
      <Scrollchor to={`#${item.scroll}`} style={{ textDecoration: 'none' }}>
        {item.label}
      </Scrollchor>
    </li>
  ));

  return <ul>{result}</ul>;
};

AnchorList.propTypes = {
  ...commonPropTypes
};

export const List = ({ data, value, xs }) => {
  const transformedStyles = xs ? transformMobileStyle(data) : transformDesktopStyle(data);
  const listStyle = {
    ...transformedStyles,
    margin: '0'
  };

  const result = value.map(item => (
    <li style={listStyle} dangerouslySetInnerHTML={{ __html: item }}></li>
  ));

  return <ul>{result}</ul>;
};

List.propTypes = {
  ...commonPropTypes
};

export const generateComponents = (page, xs) => {
  const components = [];
  page.components.map(comp => {
    const borderStyle = {
      marginBottom: 20,
      borderBottom: comp.desktopStyle.borderColor ? comp.desktopStyle.borderColor : '1px solid grey'
    };
    const isBorder = comp.desktopStyle.border
      ? borderStyle
      : { paddingBottom: 20, marginBottom: 20, textAlign: 'center' };

    switch (comp.type) {
      case 'pageTitle':
        components.push(<Title data={comp} value={comp.value} xs={xs} />);
        break;
      case 'sectionTitle':
        components.push(<SectionTitle data={comp} value={comp.value} xs={xs} />);
        break;
      case 'paragraph':
        components.push(<LPParagraph data={comp} value={comp.value} xs={xs} />);
        break;
      case 'image':
        components.push(<Image data={comp} xs={xs} />);
        break;
      case 'box':
        components.push(
          <Box style={xs ? transformMobileStyle(comp) : transformDesktopStyle(comp)}>
            {generateComponents(comp.value, xs)}
          </Box>
        );
        break;
      case 'container':
        components.push(
          <Box style={isBorder}>
            <Box
              style={xs ? transformMobileStyle(comp) : transformDesktopStyle(comp)}
              id={comp.name}
            >
              {generateComponents(comp.value, xs)}
            </Box>
          </Box>
        );
        break;
      case 'oneColSection':
        components.push(
          <Container style={xs ? transformMobileStyle(comp) : transformDesktopStyle(comp)}>
            {generateComponents(comp.value, xs)}
          </Container>
        );
        break;
      case 'navigation':
        if (comp.desktopStyle.cssClass === 'inline-anchor') {
          components.push(<InlineAnchor data={comp} value={comp.value} xs={xs} />);
        } else {
          components.push(<AnchorList data={comp} value={comp.value} xs={xs} />);
        }
        break;
      case 'list':
        components.push(<List data={comp} value={comp.value} xs={xs} />);
        break;
      default:
        break;
    }
    return '';
  });
  return components;
};

export const transformDesktopStyle = (data, noBorder) => {
  const { desktopStyle, type } = data;
  return Object.keys(desktopStyle).reduce((obj, value) => {
    if (!obj[value]) {
      if (value === 'padding' && desktopStyle[value] === true) {
        obj[value] = desktopStyle.margin;
      } else if (value === 'bgColor') {
        obj.backgroundColor = desktopStyle[value];
      } else if (value === 'borderPlacement') {
        const borderVal = desktopStyle[value];
        if (noBorder) {
          obj[borderVal] = null;
        } else {
          obj[borderVal] = desktopStyle.borderColor;
        }
      } else if (value === 'margin') {
        // skip margin value from Contentful
      } else if (value === 'align') {
        obj.textAlign = desktopStyle[value];
      } else if (value === 'fontColor') {
        obj.color = desktopStyle[value];
      } else {
        obj[value] = desktopStyle[value];
      }
    }
    if (type === 'box') {
      obj.flexDirection = 'row';
    }
    return obj;
  }, {});
};

export const transformMobileStyle = data => {
  const { mobileStyle, type } = data;
  return Object.keys(mobileStyle).reduce((obj, value) => {
    if (!obj[value]) {
      if (value === 'padding' && mobileStyle[value] === true) {
        obj[value] = mobileStyle.margin;
      } else if (value === 'bgColor') {
        obj.backgroundColor = mobileStyle[value];
      } else if (value === 'borderPlacement') {
        const borderVal = mobileStyle[value];
        obj[borderVal] = mobileStyle.borderColor;
      } else if (value === 'margin') {
        // skip margin value from Contentful
      } else if (value === 'align') {
        obj.textAlign = mobileStyle[value];
      } else if (value === 'fontColor') {
        obj.color = mobileStyle[value];
      } else {
        obj[value] = mobileStyle[value];
      }
    }
    if (type === 'box') {
      obj.flexDirection = 'column';
    }
    return obj;
  }, {});
};
