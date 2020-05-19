import React from 'react';
import { Box, Grid, Container } from '@material-ui/core';

export const Title = ({ data, value, xs }) => (
	<div style={xs ? transformMobileStyle(data) : transformDesktopStyle(data)}>{value}</div>
);

export const SectionTitle = ({ data, value, xs }) => (
	<div style={xs ? transformMobileStyle(data) : transformDesktopStyle(data)}>{value}</div>
);

export const Paragraph = ({ data, value, xs }) =>
	value.map((item, i) => {
		const link = item.match(/<a[^>]*>([^<]+)<\/a>/);
		let styleTag = null;
		if (link) {
			if (data.name === 'ContactUs-EmailAddress' || data.name === 'ContactUs-PhoneNumber') {
				styleTag = `<a href=${link[1]} style="color:#000000">${link[1]}</a>`;
			} else {
				styleTag = `<a href=${link[1]} style="color:#00c3ef">${link[1]}</a>`;
			}
			const splitTag = item.split(link[0]);
			item = splitTag[0] + styleTag + splitTag[1];
		}
		return <div key={i} style={xs ? transformMobileStyle(data) : transformDesktopStyle(data)} dangerouslySetInnerHTML={{ __html: item }}></div>
    );
  });

export const Image = ({ data, xs }) => (
	<img style={xs ? transformMobileStyle(data) : transformDesktopStyle(data)} src={data.desktopImg} />
);

export const generateComponents = (page, xs) => {
	const components = [];
	page.components.map(comp => {
		const borderStyle = {
			marginBottom: 20,
			borderBottom: comp.desktopStyle.borderColor ? comp.desktopStyle.borderColor : '1px solid grey'
		};
		const isBorder = comp.desktopStyle.border
			? borderStyle
			: { paddingBottom: 20, marginBottom: 20, textAlign: 'center' };

		switch (comp.type) {
			case 'pageTitle':
				components.push(<Title data={comp} value={comp.value} xs={xs} />);
				break;
			case 'sectionTitle':
				components.push(<SectionTitle data={comp} value={comp.value} xs={xs} />);
				break;
			case 'paragraph':
				components.push(<Paragraph data={comp} value={comp.value} xs={xs} />);
				break;
			case 'image':
				components.push(<Image data={comp} xs={xs} />);
				break;
			case 'box':
				components.push(
					<Box style={xs ? transformMobileStyle(comp) : transformDesktopStyle(comp)}>
						{generateComponents(comp.value, xs)}
					</Box>
				);
				break;
			case 'container':
				components.push(
					<Box style={isBorder}>
						<Box style={xs ? transformMobileStyle(comp) : transformDesktopStyle(comp)}>
							{generateComponents(comp.value, xs)}
						</Box>
					</Box>
				);
				break;
			case 'oneColSection':
				components.push(
					<Container style={xs ? transformMobileStyle(comp) : transformDesktopStyle(comp)}>
						{generateComponents(comp.value, xs)}
					</Container>
				);
				break;
		}
	});
	return components;
};

export const transformDesktopStyle = data => {
	const { desktopStyle, type } = data;
	return Object.keys(desktopStyle).reduce((obj, value) => {
		if (!obj[value]) {
			if (value === 'padding' && desktopStyle[value] === true) {
				obj[value] = desktopStyle.margin;
			} else if (value === 'bgColor') {
				obj.backgroundColor = desktopStyle[value];
			} else if (value === 'borderPlacement') {
				const borderVal = desktopStyle[value];
				obj[borderVal] = desktopStyle.borderColor;
			} else if (value === 'margin') {
				// skip margin value from Contentful
			} else if (value === 'align') {
				obj.textAlign = desktopStyle[value];
			} else {
				obj[value] = desktopStyle[value];
			}
		}
		if (type === 'box') {
			obj.flexDirection = 'row';
		}
		return obj;
	}, {});
};

export const transformMobileStyle = data => {
	const { mobileStyle, type } = data;
	return Object.keys(mobileStyle).reduce((obj, value) => {
		if (!obj[value]) {
			if (value === 'padding' && mobileStyle[value] === true) {
				obj[value] = mobileStyle.margin;
			} else if (value === 'bgColor') {
				obj.backgroundColor = mobileStyle[value];
			} else if (value === 'borderPlacement') {
				const borderVal = mobileStyle[value];
				obj[borderVal] = mobileStyle.borderColor;
			} else if (value === 'margin') {
				// skip margin value from Contentful
			} else if (value === 'align') {
				obj.textAlign = mobileStyle[value];
			} else {
				obj[value] = mobileStyle[value];
			}
		}
		if (type === 'box') {
			obj.flexDirection = 'column';
		}
		return obj;
	}, {});
};
