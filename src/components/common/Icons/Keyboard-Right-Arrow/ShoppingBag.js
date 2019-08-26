import React from 'react'
import { ReactComponent as KeyboardArrow } from '../../../../assets/static/keyboard_arrow_right.svg';
import styles from '../../styles/shopping-bag-icon.module.scss'
import SvgIcon from '@material-ui/core/SvgIcon';

const RightArrow = () => {
  return (
    <SvgIcon>
      <KeyboardArrow />
    </SvgIcon>
  );
}

export default RightArrow
