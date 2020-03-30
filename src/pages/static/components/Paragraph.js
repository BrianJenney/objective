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
  }),
  nav: {
    color: '#551A8B'
  }
}));

const Paragraph = ({ data }) => {
  const classes = useStyles(data);

  const { value } = data;
  const [context, setContext] = useState([]);
  useEffect(() => {
    const results = transformPara(value);
    setContext(results);
  }, []);

  const transformPara = content => {
    const final = [];
    for (let i = 0; i < content.length; i++) {
      if (typeof content[i] === 'object') {
        const para = {
          par1: { value: content[i].value, url: content[i].url },
          par2: content[i + 1]
        };
        final.push(para);
        i += 1;
      } else {
        final.push(content[i]);
      }
    }
    return final;
  };

  return (
    <div>
      {context.map((text, key) => {
        if (typeof text === 'object') {
          return (
            <p className={classes.root}>
              <NavLink underline="always" to={text.par1.url} className={classes.nav}>
                {' '}
                {text.par1.value}
              </NavLink>
              {text.par2}
            </p>
          );
        }
        return (
          <p key={key} className={classes.root}>
            {text}
          </p>
        );
      })}
    </div>
  );
};

export default Paragraph;
