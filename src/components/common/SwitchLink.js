import React from 'react';
import { Link } from 'react-router-dom';

const SwitchLink = props => {
  const href = props.to;
  let finalLink = null;
  if (href.includes('http')) {
    finalLink = (
      <a target="_blank" href={href}>
        {props.content}
      </a>
    );
  } else {
    finalLink = <Link {...props}>{props.content}</Link>;
  }

  return finalLink;
};

export default SwitchLink;
