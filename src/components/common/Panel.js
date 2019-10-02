import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MenuLink from './MenuLink';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import { relative } from 'path';

const styles = {
  root: {
    alignItems: 'stretch',
    padding: 0,
    position: 'relative'
  },
  content: {
    margin: 0,
    flexDirection: 'column'
  },
  expanded: {
    '&.MuiExpansionPanelSummary-content': {
      margin: 0
    },
    '&.MuiExpansionPanelSummary-expandIcon': {
      display: 'none'
    }
  },
  expandIcon: {
    position: 'absolute',
    top: 24,
    right: 100,
    padding: 0
  }
};
const ExpansionPanelSummary = withStyles(styles)(MuiExpansionPanelSummary);

const Panel = ({
  title,
  expanded,
  collapsible,
  hideExpandIcon,
  onChange,
  children,
  ...rest
}) => {
  const [expandedInternal, setExpandedInternal] = useState(false);
  const isPanelExpanded = isNil(expanded) ? expandedInternal : expanded;
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  if (collapsible) {
    return (
      <ExpansionPanel
        expanded={isPanelExpanded}
        elevation={0}
        onChange={(event, isExpanded) => {
          if (onChange) {
            onChange(isExpanded);
          } else {
            setExpandedInternal(isExpanded);
          }
        }}
        {...rest}
      >
        <ExpansionPanelSummary
          expandIcon={
            hideExpandIcon ? null : (
              <MenuLink
                children="CHANGE"
                underline="always"
                style={{fontSize: 16, color: '#6f6f6f'}}
              />
            )
          }
        >
          <Box width={1} children={title} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box width={1} children={children} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  return (
    <Paper>
      {title && <Typography variant="h2" children={title} gutterBottom />}
      <Box width={1} children={children} {...rest} />
    </Paper>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  hideExpandIcon: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node
};

Panel.defaultProps = {
  title: '',
  collapsible: false
};

export default Panel;
