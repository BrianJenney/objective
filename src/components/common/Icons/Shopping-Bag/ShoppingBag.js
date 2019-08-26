import React from 'react'
import { ReactComponent as ShoppingBag } from '../../../../assets/static/square-shopping-bag-with-handle.svg';
import styles from '../../styles/shopping-bag-icon.module.scss'

const ShoppingBagIcon = () => (
  <div className={styles['shopping-bag-icon']}>
    <ShoppingBag />
  </div>
)

export default ShoppingBagIcon
