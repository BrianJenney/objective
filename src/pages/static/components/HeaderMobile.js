import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      border: '1px solid #000',
      margin: '15px 0 15px 0',
      padding: 10
    }
  },
  link: props => ({
    color: props.mobileStyle.fontColor,
    fontWeight: props.mobileStyle.fontWeight,
    fontSize: props.mobileStyle.fontSize,
    fontFamily: props.mobileStyle.fontFamily,
    lineHeight: props.mobileStyle.lineHeight,
    textTransform: props.mobileStyle.textTransform
  }),
  ulList: {
    marginLeft: '-1em'
  },
  list: {
    marginBottom: 14
  }
}));

const HeaderMobile = ({ data, template }) => {
  const mobileNav = data.filter(nav => nav.name.toLowerCase().includes('mobile'));
  const classes = useStyles(mobileNav[0]);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <ul className={classes.ulList}>
        {sm
          ? data.map(nav => {
              return nav.name.toLowerCase().includes('mobile')
                ? nav.value.map(val => (
                    <li className={classes.list}>
                      <a href={val.scroll} className={`${classes.link} ${template}-${nav.type}`}>
                        {val.label}
                      </a>
                    </li>
                  ))
                : data.length <= 1 && nav.name.toLowerCase().includes('desktop')
                ? nav.value.map(val => (
                    <li className={classes.list}>
                      <a href={val.scroll} className={`${template}-${nav.type}`}>
                        {val.label}
                      </a>
                    </li>
                  ))
                : null;
            })
          : null}
      </ul>
    </div>
  );
};

export default HeaderMobile;
