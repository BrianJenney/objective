import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: props => ({	
			color: props.desktopStyle.fontColor,
			fontWeight: props.desktopStyle.fontWeight || 'normal',
			fontSize: props.desktopStyle.fontSize || 48,
			lineHeight: props.desktopStyle.lineHeight || 'normal',
			fontFamily: props.desktopStyle.fontFamily || 'Canela Text Web',
			textAlign: props.desktopStyle.align || 'center',
			padding: props.desktopStyle.margin || '0',
			[theme.breakpoints.down('xs')]: {
				color: props.mobileStyle.fontColor,
				fontWeight: props.mobileStyle.fontWeight,
				fontSize: props.mobileStyle.fontSize || 24,
				lineHeight: props.mobileStyle.lineHeight || 'normal',
				fontFamily: props.mobileStyle.fontFamily || 'Canela Text Web',
				textAlign: props.mobileStyle.align || 'center',
				padding: props.mobileStyle.margin || '0',
			}	
	}),
	sectionTitle: props => ({
		color: props.desktopStyle.fontColor,
		fontWeight: props.desktopStyle.fontWeight || 600,
		fontSize: props.desktopStyle.fontSize || 24,
		lineHeight: props.desktopStyle.lineHeight || 'normal',
		fontFamily: props.desktopStyle.fontFamily || 'p22-underground, sans-serif',
		textAlign: props.desktopStyle.align || 'left',
		margin: props.desktopStyle.margin || '50px 0 30px',
		[theme.breakpoints.down('xs')]: {
			color: props.mobileStyle.fontColor,
			fontWeight: props.mobileStyle.fontWeight || 600,
			fontSize: props.mobileStyle.fontSize || 18,
			lineHeight: props.mobileStyle.lineHeight || 'normal',
			fontFamily: props.mobileStyle.fontFamily || 'p22-underground, sans-serif',
			textAlign: props.mobileStyle.align || 'left',
			margin: props.mobileStyle.margin || '50px 0 24px'
		}
	}),
	paragraph: props => ({
		color: props.desktopStyle.fontColor,
		fontWeight: props.desktopStyle.fontWeight || 'normal',
		fontSize: props.desktopStyle.fontSize || 24,
		lineHeight: props.desktopStyle.lineHeight || 'normal',
		fontFamily: props.desktopStyle.fontFamily || 'p22-underground, sans-serif',
		textAlign: props.desktopStyle.align || 'left',
		padding: props.desktopStyle.margin,
		[theme.breakpoints.down('xs')]: {
			color: props.mobileStyle.fontColor,
			fontWeight: props.mobileStyle.fontWeight || 'normal',
			fontSize: props.mobileStyle.fontSize || 18,
			lineHeight: props.mobileStyle.lineHeight || 'normal',
			fontFamily: props.mobileStyle.fontFamily || 'p22-underground, sans-serif',
			textAlign: props.mobileStyle.align || 'left',
			padding: props.mobileStyle.margin 
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

export const generateComponents = (page, xs) => {
	// console.log('testing-PAGE',page)
	let components = [];
	page.components.map(comp => {
		const borderStyle = { 
			paddingBottom: 20, 
			marginBottom: 20, 
			borderBottom: comp.desktopStyle.borderColor ? comp.desktopStyle.borderColor : '1px solid grey' 
		};
		const isBorder = comp.desktopStyle.border ? borderStyle : {	paddingBottom: 20, marginBottom: 20 };
	const styledSection = transformStyle(comp);

	// console.log('testing-STYLEEEE', styledSection);
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
			case 'paragraph':
				components.push(
					<Paragraph data={comp} value={comp.value}/>
				);
				break;
			case 'container':
				components.push(
					<Box style={isBorder}>
						{generateComponents(comp.value)	}	
					</Box>
				);
				break;
			case 'oneColSection':
				components.push(
					<Container style={xs ? styledSection.mobile : styledSection.desktop}>
						{ generateComponents(comp.value) }
					</Container>
				);
				break;
		}
	});
	return components
};



export const transformStyle = (data) => {
	const { desktopStyle, mobileStyle } = data;
	const desktop =  Object.keys(desktopStyle).reduce((obj, value) => {
		if (!obj[value]) {
			if (value === 'padding' && desktopStyle[value] === true) {
				obj[value] = desktopStyle.margin;
				delete desktopStyle.margin;
			} else if (value === 'bgColor') {
				obj['backgroundColor'] = desktopStyle[value];
			} else {
				obj[value] = desktopStyle[value];
			}
		}
		return obj;
	}, {});

	const mobile =  Object.keys(mobileStyle).reduce((obj, value) => {
		if (!obj[value]) {
			if (value === 'padding' && mobileStyle[value] === true) {
				obj[value] = mobileStyle.margin;
				delete mobileStyle.margin;
			} else if (value === 'bgColor') {
				obj['backgroundColor'] = mobileStyle[value];
			} else {
				obj[value] = mobileStyle[value];
			}
		}
		return obj;
	}, {});
	return { desktop, mobile };
};

