import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from '../../../components/common';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    [theme.breakpoints.down('sm')]: {
      fontSize: props.mobileStyle.fontSize
    }
  })
}));

const Paragraph = ({ data, template, type }) => {
  const classes = useStyles(data);

  return (
    <div>
      {data.value.map((text, key) => (
        <p key={key} className={`${classes.root} ${template}-${type}`} dangerouslySetInnerHTML={{ __html: text }}></p>
      ))}
    </div>
  );
};

export default Paragraph;
