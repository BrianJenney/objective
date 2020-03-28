import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
  //const paragraph = data.value.components.filter(item => item.type === 'paragraph')[0];
  //const style = paragraph;
  const classes = useStyles(data);

  return (
    <div>
      {data.value.map((text, i) => {
        return (
          <p key={i} className={classes.root}>
            {text}
          </p>
        );
      })}
    </div>
  );
};

export default Paragraph;
