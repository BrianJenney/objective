import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const ButtonComponent = ({
  loading,
  disabled,
  icon,
  children,
  flex,
  ml,
  mr,
  mt,
  mb,
  fullWidth,
  style,
  padding,
  ...rest
}) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const buttonStyles = {
    fontFamily: 'proxima-nova, sans-serif',
    border: 'none',
    fontWeight: 600,
    padding: '0 16px 0 16px',
    letterSpacing: xs ? '1.17px' : '1.33px',
    lineHeight: xs ? 1.88 : 2.14,
    fontSize: 14,
    height: '46px',
    ...style
  };

  return (
    <Box
      display="inline-block"
      position="relative"
      width={fullWidth ? 1 : 'auto'}
      flex={flex}
      ml={ml}
      mr={mr}
      mt={mt}
      mb={mb}
      padding={padding || 0}
    >
      <Button disabled={loading || disabled} fullWidth={fullWidth} style={buttonStyles} {...rest}>
        {icon && <Box component={Icon} children={icon} mr={1} />}
        {children}
      </Button>
      {loading && (
        <Box
          component={CircularProgress}
          position="absolute"
          top="50%"
          left="50%"
          ml="-12px"
          mt="-12px"
          size={24}
        />
      )}
    </Box>
  );
};

ButtonComponent.propTypes = {
  flex: PropTypes.any,
  ml: PropTypes.any,
  mr: PropTypes.any,
  mt: PropTypes.any,
  mb: PropTypes.any,
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object
};

ButtonComponent.defaultProps = {
  variant: 'contained',
  color: 'primary'
};

export default ButtonComponent;
