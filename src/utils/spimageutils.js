import { useMediaQuery, useTheme } from '@material-ui/core';

export const ResizeImage = (template, data) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('xs'));
  let defaultParams;

  switch (template) {
    case 'LP-Template-1':
      if (data.desktopImg) {
        defaultParams = '?w=315';
      }
      break;
    default:
      defaultParams = '?w=315';
  }

  const desktopWidth = data.desktopStyle.width;
  const mobileWidth = data.mobileStyle.width;

  let params;

  if (!sm) {
    if (desktopWidth) {
      params = `?w=${desktopWidth}`;
    } else {
      params = defaultParams;
    }
  } else if (mobileWidth === '100%') {
    params = `?w=315`;
  } else if (mobileWidth) {
    params = `?w=${mobileWidth}`;
  } else {
    params = '?w=164';
  }
  return params;
};
