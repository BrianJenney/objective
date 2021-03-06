import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const CustomizedBtn = withStyles({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'bold',
    padding: '24px 0 26px',
    border: '1px solid #000'
  }
})(Button);

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
  ...rest
}) => (
  <Box
    display="inline-block"
    position="relative"
    width={fullWidth ? 1 : 'auto'}
    flex={flex}
    ml={ml}
    mr={mr}
    mt={mt}
    mb={mb}
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
  color: PropTypes.string
};

ButtonComponent.defaultProps = {
  variant: 'contained',
  color: 'primary'
};

export default ButtonComponent;
