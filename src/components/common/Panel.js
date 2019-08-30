import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Panel = ({ title, collapsible, children }) => {
  const [expanded, setExpanded] = useState(false);

  if (collapsible) {
    return (
      <ExpansionPanel
        expanded={expanded}
        elevation={0}
        onChange={(event, isExpanded) => {
          setExpanded(isExpanded);
        }}
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
      <Box width={1} children={children} />
    </Paper>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  collapsible: PropTypes.bool,
  children: PropTypes.node
};

Panel.defaultProps = {
  title: '',
  collapsible: false
};

export default Panel;
