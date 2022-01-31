import React from 'react'
import Frame from './Frame'
import ScoreSheetType from '../../types/ScoreSheet'
import styles from './ScoreSheet.module.scss'

interface ScoreSheetProps {
  scoreSheet: ScoreSheetType,
}

const ScoreSheet = ({scoreSheet: {frames, total}}: ScoreSheetProps) => {
  const renderFrames = () => frames.map((frame, index) => (
    <Frame orderNumber={index + 1} frame={frame}/>
  )).reverse()

  return (
    <div className={styles.container}>
      <h2>{`Total: ${total}`}</h2>
      {renderFrames()}
    </div>
  )
}

export default ScoreSheet
