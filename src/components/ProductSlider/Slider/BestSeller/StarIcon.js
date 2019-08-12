import React from 'react'
import { ReactComponent as Star } from '../../../../assets/static/star.svg';
import styles from './starIcon.module.scss'

const StarIcon = () => (
  <div className={styles['star-icon']}>
    <Star />
  </div>
)

export default StarIcon


