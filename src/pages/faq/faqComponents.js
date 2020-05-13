import React from 'react';
import { useTheme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize || 48,
    lineHeight: props.desktopStyle.lineHeight || 'normal',
    fontFamily: props.desktopStyle.fontFamily || 'Canela Text Web',
    textAlign: props.desktopStyle.align || 'center',
    margin: props.desktopStyle.margin || '0 0 62px',
    [theme.breakpoints.down('xs')]: {
      color: props.mobileStyle.fontColor,
      fontWeight: props.mobileStyle.fontWeight,
      fontSize: props.mobileStyle.fontSize || 24,
      lineHeight: props.mobileStyle.lineHeight || 'normal',
      fontFamily: props.mobileStyle.fontFamily || 'Canela Text Web',
      textAlign: props.desktopStyle.align || 'center',
      marginBottom: props.desktopStyle.margin || '0 0 44px'
    }
  })
}));

export const generateComponents = (page) => {
	let components = [];

	page.components.map(comp => {
		switch(comp.type) {
			case 'pageTitle':
        components.push(
          <Title data={comp}/>
					
        );
        break;
		}
	});
	console.log('testing-COMPPPPP----', components)
	return components


};


export const Title = ({data}) => {
  const classes = useStyles(data);

  return (
    <>
      <Box>
        <div className={classes.root}>{data.value}</div>
      </Box>
    </>
  );
};
