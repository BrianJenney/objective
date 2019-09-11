import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const CustomizedBtn = withStyles({
  root: {
    height: '50px',
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'bold'
  }
})(Button);

const ButtonComponent = ({
  loading,
  disabled,
  icon,
  children,
  ml,
  mr,
  fullWidth,
  ...rest
}) => (
  <Box
    display="inline-block"
    position="relative"
    width={fullWidth ? 1 : 'auto'}
    ml={ml}
    mr={mr}
  >
    <CustomizedBtn
      disabled={loading || disabled}
      fullWidth={fullWidth}
      {...rest}
    >
      {icon && <Box component={Icon} children={icon} mr={1} />}
      {children}
    </CustomizedBtn>
    {loading && (
      <Box
        component={CircularProgress}
        position="absolute"
        top="50%"
        left="50%"
        mt="-12px"
        ml="-12px"
        size={24}
      />
    )}
  </Box>
);

ButtonComponent.propTypes = {
  ml: PropTypes.any,
  mr: PropTypes.any,
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string
};

ButtonComponent.defaultProps = {
  variant: 'contained',
  color: 'primary'
};

export default ButtonComponent;
