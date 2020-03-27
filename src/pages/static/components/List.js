import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily
  })
}));

const List = ({ data, template, type, symbol }) => {
  const classes = useStyles(data);

  return (
    <ul>
      {data.value.map(item => {
        return <li className={`${classes.root} ${template}-${type} ${template}-${type}-${symbol}`}>{item}</li>;
      })}
    </ul>
  );
};

export default List;
