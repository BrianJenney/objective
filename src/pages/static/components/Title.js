import React, { Component, useState, useEffect, useRef } from 'react';
import TrackVisibility from 'react-on-screen';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    textAlign: props.desktopStyle.align,
    [theme.breakpoints.down('sm')]: {
      color: props.mobileStyle.fontColor,
      fontWeight: props.mobileStyle.fontWeight,
      fontSize: props.mobileStyle.fontSize,
      lineHeight: props.mobileStyle.lineHeight,
      fontFamily: props.mobileStyle.fontFamily
    }
  })
}));

const Title = ({ data, template, type, pageName }) => {
  const [tracked, setTracked] = useState(false);
  const classes = useStyles(data);
  const borderClassname = data.desktopStyle.borderPlacement
    ? `${template}-${type}-${data.desktopStyle.borderPlacement}`
    : '';

  const ComponentToTrack = ({ isVisible }) => {
    if (isVisible && tracked === false && (type === 'sectionTitle' || type === 'sectionSubTitle')) {
      setTracked(true);
      window.analytics.track('Percent Scrolled', {
        page_type: `LP: ${pageName}`,
        section_name: data.value,
        url: window.location.href
      });
    }
    return null;
  };

  return (
    <>
      <TrackVisibility once>
        <ComponentToTrack />
      </TrackVisibility>
      <Box className={template}>
        <div className={`${classes.root} ${template}-${type} ${borderClassname}`}>{data.value}</div>
      </Box>
    </>
  );
};

export default Title;
