import React from 'react';
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

const Paragraph = ({ data }) => {
  const classes = useStyles(data);

  return (
    <div>
      {data.value.map((text, i) => {
        if (typeof text === 'object') {
          return (
            <NavLink to={text.url} className={classes.root}>
              {' '}
              {text.value}
            </NavLink>
          );
        }
        return <p className={classes.root}>{text}</p>;
      })}
    </div>
  );
};

export default Paragraph;
