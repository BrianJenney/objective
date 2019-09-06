import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import {
  Box,
  Paper,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
          <Typography variant="h2" children={title} />
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
