import React from 'react'
import styles from './styles.module.css'

import Slider from './slider'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>
    <Slider />
  </div>
}
