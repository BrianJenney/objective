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
    <>
      {symbol ? (
        <ul>
          {data.value.map((item, i) => {
            return (
              <li
                key={i}
                className={`${classes.root} ${template}-${type} ${template}-${type}-${symbol}`}
                dangerouslySetInnerHTML={{ __html: item }}
              ></li>
            );
          })}
        </ul>
      ) : (
        <ol>
          {data.value.map((item, i) => {
            return (
              <li key={i} className={`${classes.root} ${template}-${type}-ol`}>
                {item}
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
};

export default List;
