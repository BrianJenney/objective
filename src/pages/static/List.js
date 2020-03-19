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

const List = ({ data }) => {
  const list = data.components.filter(item => item.type === 'list')[0];
  const style = list;
  const classes = useStyles(style);
  const checkmark = list.bulletSymbol === 'checkmark';
  const crossmark = list.bulletSymbol === 'crossmark';
  const blueCheckmark = list.bulletSymbol === 'blueCheckmark';
  const greenCheckmark = list.bulletSymbol === 'blueCheckmark';

  return (
    <ul>
      {list.value.map(item => {
        return <li className={classes.root}>{item}</li>;
      })}
    </ul>
  );
};

export default List;
