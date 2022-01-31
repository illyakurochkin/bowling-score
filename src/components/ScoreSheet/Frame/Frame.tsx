import React from 'react'
import {Frame as FrameType, FrameState} from '../../../types/ScoreSheet'
import styles from './Frame.module.scss'

interface FrameProps {
  orderNumber: number,
  frame: FrameType,
}

const Frame = ({orderNumber, frame: {state, total, scores, bonusScores}}: FrameProps) => {
  const renderScores = () => scores.map((score) => (
    <div className={styles.score}>{score}</div>
  ))

  const renderBonusScores = () => bonusScores.map((bonusScore) => (
    <div className={styles.bonusScore}>+{bonusScore}</div>
  ))

  return (
    <div className={`${styles.container} ${styles[state]}`}>
      <div className={styles.title}>
        <p>{`Frame #${orderNumber} - (${total})`}</p>
        {state !== FrameState.REGULAR && (
          <div className={`${styles.state} ${styles[state]}`}>{state}</div>
        )}
      </div>

      <div className={styles.scoresList}>
        {!scores.length && '...'}
        {renderScores()}
        {renderBonusScores()}
      </div>
    </div>
  )
}

export default Frame
