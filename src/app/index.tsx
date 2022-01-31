import React from 'react'
import {ScoreForm, ScoreSheet} from '../components'
import {useAddScore, useCanAddScore, useRestart, useScoreSheet} from '../context/ScoreSheetContext'
import styles from './App.module.scss'

const BowlingScoreApp = () => {
  const scoreSheet = useScoreSheet()
  const canAddScore = useCanAddScore()
  const addScore = useAddScore()
  const restart = useRestart()

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {canAddScore ? <ScoreForm onSubmit={addScore}/> :
          <button type="button" onClick={restart} className={styles.restart}>Restart</button>}
      </div>
      <div className={styles.column}>
        <ScoreSheet scoreSheet={scoreSheet}/>
      </div>
    </div>
  )
}

export default BowlingScoreApp
