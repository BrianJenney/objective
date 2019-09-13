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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  root: {
    alignItems: 'stretch',
    padding: 0
  },
  content: {
    margin: 0,
    flexDirection: 'column'
  },
  expandIcon: {
    position: 'absolute',
    top: 0,
    right: 100,
    padding: 0
  }
};
const ExpansionPanelSummary = withStyles(styles)(MuiExpansionPanelSummary);

const Panel = ({ title, expanded, collapsible, children, ...rest }) => {
  const [expandedInternal, setExpandedInternal] = useState(false);

  if (collapsible) {
    return (
      <ExpansionPanel
        expanded={expanded || expandedInternal}
        elevation={0}
        onChange={(event, isExpanded) => {
          if (isNil(expanded)) {
            setExpandedInternal(isExpanded);
          }
        }}
        {...rest}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {title}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box width={1} children={children} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  return (
    <Paper>
      <Typography variant="h2" children={title} gutterBottom />
      <Box width={1} children={children} {...rest} />
    </Paper>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  children: PropTypes.node
};

Panel.defaultProps = {
  title: '',
  collapsible: false
};

export default Panel;
