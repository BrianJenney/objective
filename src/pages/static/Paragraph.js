import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktop.fontColor,
    fontWeight: props.desktop.fontWeight,
    fontSize: props.desktop.fontSize,
    lineHeight: props.desktop.lineHeight,
    fontFamily: props.desktop.fontFamily,
    [theme.breakpoints.down('sm')]: {
      fontSize: props.mobile.fontSize
    }
  })
}));

const Paragraph = ({ data }) => {
  const paragraph = data.value.components.filter(item => item.type === 'paragraph')[0];
  const style = paragraph.style;
  const classes = useStyles(style);

  return (
    <div>
      {paragraph.value.map(text => {
        return <p className={classes.root}>{text}</p>;
      })}
    </div>
  );
};

export default Paragraph;
