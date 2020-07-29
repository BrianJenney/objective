import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const FormSummarySection = ({ title, pairs, children, ...rest }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
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
              {...childProps}
            >
              {label && (
                <Box
                  component={Typography}
                  width={1 / 3}
                  mr={2}
                  variant="subtitle2"
                  children={`${label}:`}
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                />
              )}
              <Box
                component={Typography}
                flex={1}
                lineHeight={1.6}
                variant="caption"
                children={value}
                fontSize={14}
                color={'#553226'}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

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
