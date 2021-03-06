import {
  createContext,
  Dispatch,
  ReactChild,
  ReactChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react'
import ScoreSheet, {FrameState} from '../types/ScoreSheet'
import {mapScoresToScoreSheet} from './helpers'
import {MAX_SCORE, TOTAL_FRAMES} from './constants'

type ScoreSheetContextType = {
  scores: number[],
  setScores: Dispatch<SetStateAction<number[]>>,
}

const ScoreSheetContext = createContext<ScoreSheetContextType>({
  scores: [], setScores: (() => null) as any,
})

interface ScoreSheetProviderProps {
  children: ReactChild | ReactChildren,
}

const ScoreSheetProvider = ({children}: ScoreSheetProviderProps) => {
  const [scores, setScores] = useState<number[]>([])

  return (
    <ScoreSheetContext.Provider value={{scores, setScores}}>
      {children}
    </ScoreSheetContext.Provider>
  )
}

const useScoreSheet = (): ScoreSheet => {
  const {scores} = useContext(ScoreSheetContext)
  return mapScoresToScoreSheet(scores)
}

const useCanAddScore = () => {
  const {frames} = useScoreSheet()

  return !frames[TOTAL_FRAMES - 1] || (
    frames[TOTAL_FRAMES - 1].state === FrameState.STRIKE && frames[TOTAL_FRAMES - 1].bonusScores.length !== 2 ||
    frames[TOTAL_FRAMES - 1].state === FrameState.SPARE && frames[TOTAL_FRAMES - 1].bonusScores.length !== 1 ||
    frames[TOTAL_FRAMES - 1].scores.length + frames[TOTAL_FRAMES - 1].bonusScores.length < 2
  )
}

const useAddScore = () => {
  const scoreSheet = useScoreSheet()
  const canAddScore = useCanAddScore()
  const {setScores} = useContext(ScoreSheetContext)

  return useCallback((score: number) => {
    if (!canAddScore) {
      throw new Error('too many scores')
    }

    const previousFrame = scoreSheet.frames[scoreSheet.frames.length - 1]

    if (
      previousFrame &&
      scoreSheet.frames.length !== TOTAL_FRAMES &&
      previousFrame.scores.length === 1 &&
      previousFrame.state !== FrameState.STRIKE &&
      previousFrame.scores[0] + score > MAX_SCORE
    ) {
      throw new Error('incorrect score sum')
    }

    setScores((scores) => [...scores, score])
  }, [canAddScore, scoreSheet, setScores])
}

const useRestart = () => {
  const {setScores} = useContext(ScoreSheetContext)
  return useCallback(() => setScores([]), [setScores])
}

export {
  ScoreSheetProvider,

  useScoreSheet,
  useCanAddScore,
  useAddScore,
  useRestart,
}
