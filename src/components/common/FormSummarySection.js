import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const FormSummarySection = ({ title, pairs, children, ...rest }) => (
  <Box {...rest}>
    {title && <Typography variant="h3" children={title} gutterBottom />}
    {children}
    {pairs && (
      <Box>
        {pairs.map(({ label, value, ...childProps }, index) => (
          <Box
            key={`summary_${index}`}
            display="flex"
            alignItems="center"
            mb={1}
            {...childProps}
          >
            {label ? (
              <>
                <Box
                  component={Typography}
                  width={1 / 3}
                  mr={2}
                  variant="subtitle2"
                  children={`${label}:`}
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  lineHeight={2.3}
                />
                <Box
                  flex={1}
                  component={Typography}
                  variant="body2"
                  children={value}
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                />
              </>
            ) : (
              value
            )}
          </Box>
        ))}
      </Box>
    )}
  </Box>
);

FormSummarySection.propTypes = {
  title: PropTypes.string.isRequired,
  pairs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.node
    })
  ),
  children: PropTypes.node
};

export default FormSummarySection;
