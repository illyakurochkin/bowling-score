import React, {ChangeEvent} from 'react'
import {MAX_SCORE} from '../../../context/constants'
import styles from './ScoreInput.module.scss'

interface ScoreInputProps {
  value: number | null,
  onChange: (value: number | null) => void,
}

const ScoreInput = ({value, onChange}: ScoreInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    if (newValue.match(/^[0-9]*$/) && (+newValue ?? 0) <= MAX_SCORE) {
      onChange(newValue ? +newValue : null)
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={value ?? ''}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  )
}

export default ScoreInput
