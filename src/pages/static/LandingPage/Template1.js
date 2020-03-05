import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
import Logo from '../../../components/common/Icons/Logo/Logo';
import '../../landingpages/fast-asleep.scss';

const Template1 = ({ match }) => {
	// const { landingSlug } = match.params;
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<div className="fast-asleep-lp">
			<div className="landing-header">
				<Container>
					<div className="link-holder">
						<NavLink to="/">
							<Logo />
						</NavLink>
					</div>
				</Container>

				<Container></Container>
			</div>
		</div>
	);
};

export default withRouter(Template1);
