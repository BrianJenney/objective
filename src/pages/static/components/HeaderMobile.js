import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  // root: {},
  // link: props => ({
  //   color: props.desktopStyle.fontColor,
  //   fontWeight: props.desktopStyle.fontWeight,
  //   fontSize: props.desktopStyle.fontSize,
  //   fontFamily: props.desktopStyle.fontFamily,
  //   lineHeight: props.desktopStyle.lineHeight,
  //   textTransform: props.desktopStyle.textTransform,
  //   width: props.desktopStyle.width
  // })
}));

const HeaderMobile = ({ data, template }) => {
  const classes = useStyles(data);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {sm
        ? data.map(nav => {
            return nav.name.toLowerCase().includes('mobile')
              ? nav.value.map(val => <a href={val.scroll}>{val.label}</a>)
              : data.length <= 1 && nav.name.toLowerCase().includes('desktop')
              ? nav.value.map(val => <a href={val.scroll}>{val.label}</a>)
              : null;
          })
        : null}
    </div>
  );
};

export default HeaderMobile;
