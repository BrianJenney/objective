import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

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
      {template ? (
        <div className={template}>
          <ul className={type}>
            {data.value.map(item => {
              return <li className={`${classes.root} ${symbol}`}>{item}</li>;
            })}
          </ul>
        </div>
      ) : (
        <ul>
          {data.value.map(item => {
            return <li className={classes.root}>{item}</li>;
          })}
        </ul>
      )}
    </>
  );
};

export default List;
