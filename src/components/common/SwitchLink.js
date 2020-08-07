import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// SwitchLink makes a basic differentiation between an internal and external link:
const SwitchLink = props => {
  const href = props.to;
  if (href.includes('http')) {
    return (
      <a rel="noopener noreferrer" target="_blank" href={href}>
        {props.content}
      </a>
    );
  }
  return <Link {...props}>{props.content}</Link>;
};

SwitchLink.propTypes = {
  to: PropTypes.string,
  content: PropTypes.string
};

SwitchLink.defaultProps = {
  to: '',
  content: ''
};

export default SwitchLink;
