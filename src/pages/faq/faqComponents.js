import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: props => ({	
			color: props.desktopStyle.fontColor,
			fontWeight: props.desktopStyle.fontWeight || 'normal',
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
				textAlign: props.mobileStyle.align || 'center',
				margin: props.mobileStyle.margin || '0 0 44px'
			}
	
	}),
	sectionTitle: props => ({
		color: props.desktopStyle.fontColor,
		fontWeight: props.desktopStyle.fontWeight || 600,
		fontSize: props.desktopStyle.fontSize || 24,
		lineHeight: props.desktopStyle.lineHeight || 'normal',
		fontFamily: props.desktopStyle.fontFamily || 'p22-underground, sans-serif',
		textAlign: props.desktopStyle.align || 'left',
		margin: props.desktopStyle.margin || '0 0 30px',
		[theme.breakpoints.down('xs')]: {
			color: props.mobileStyle.fontColor,
			fontWeight: props.mobileStyle.fontWeight || 600,
			fontSize: props.mobileStyle.fontSize || 18,
			lineHeight: props.mobileStyle.lineHeight || 'normal',
			fontFamily: props.mobileStyle.fontFamily || 'p22-underground, sans-serif',
			textAlign: props.mobileStyle.align || 'left',
			margin: props.mobileStyle.margin || '0 0 24px'
		}
	}),
	paragraph: props => ({
		color: props.desktopStyle.fontColor,
		fontWeight: props.desktopStyle.fontWeight || 'normal',
		fontSize: props.desktopStyle.fontSize || 24,
		lineHeight: props.desktopStyle.lineHeight || 'normal',
		fontFamily: props.desktopStyle.fontFamily || 'p22-underground, sans-serif',
		textAlign: props.desktopStyle.align || 'left',
		[theme.breakpoints.down('xs')]: {
			color: props.mobileStyle.fontColor,
			fontWeight: props.mobileStyle.fontWeight || 'normal',
			fontSize: props.mobileStyle.fontSize || 18,
			lineHeight: props.mobileStyle.lineHeight || 'normal',
			fontFamily: props.mobileStyle.fontFamily || 'p22-underground, sans-serif',
			textAlign: props.mobileStyle.align || 'left',
		}
	}),
	
}));

export const Title = ({ data, value }) => {
	const classes = useStyles(data);
  return (
    <>
      <Box>
        <div className={classes.title}>{value}</div>
      </Box>
    </>
  );
};

export const SectionTitle = ({ data, value }) => {
  const classes = useStyles(data);
  return (
    <Grid>
      <Box>
        <div className={classes.sectionTitle}>{value}</div>
      </Box>
    </Grid>
  );
};

export const Paragraph = ({ data, value }) => {
  const classes = useStyles(data);
  return (   
    <Box>
			{value.map((item, i) => 	
				<div key={i} className={classes.paragraph} dangerouslySetInnerHTML={{ __html: item }}></div>				
			)}
    </Box>
  );
};

export const Container = ({ data }) => {
	const borderStyle = { 
		paddingBottom: 20, 
		marginBottom: 20, 
		borderBottom: data.desktopStyle.borderColor ? data.desktopStyle.borderColor : '1px solid grey' 
	};
	const paragraph = data.value.components.map(comp => {
		return <Paragraph data={comp} value={comp.value}/>
	});

  return (
    <Grid>
      <Box style={borderStyle}>
				{paragraph}
      </Box>
    </Grid>
  );
};

export const generateComponents = (page) => {
	let components = [];
	page.components.map(comp => {
		switch(comp.type) {
			case 'pageTitle':
        components.push(
          <Title data={comp} value={comp.value}/>					
        );
				break;
			case 'sectionTitle':
				components.push(
					<SectionTitle data={comp} value={comp.value}/>
				);
				break;
			case 'container':
				components.push(
					<Container data={comp}/>
				);
				break;
			case 'oneColSection':
				components.push(
					generateComponents(comp.value)		
				);
				break;
		}
	});
	return components


};




