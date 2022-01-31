import ScoreSheet, {Frame, FrameState} from '../types/ScoreSheet'
import {MAX_SCORE, TOTAL_FRAMES} from './constants'

const sum = (array: number[]): number => (
  array.reduce((accumulator, current) => accumulator + current, 0)
)

const groupScoresByFrames = (scores: number[]): number[][] => (
  scores.reduce((accumulator: number[][], score) => {
    const lastFrame = accumulator[accumulator.length - 1]

    const shouldCreateNewFrame = accumulator.length !== TOTAL_FRAMES && (
      !lastFrame || lastFrame.length === 2 || lastFrame[0] === MAX_SCORE
    )

    if (shouldCreateNewFrame) {
      return [...accumulator, [score]]
    }

    return accumulator.map((frame, index) => (
      index === accumulator.length - 1 ? [...frame, score] : frame
    ))
  }, [])
)

export const mapScoresToScoreSheet = (scores: number[]): ScoreSheet => {
  const frames = groupScoresByFrames(scores)

  const scoreSheetFrames = frames.map((scores, index) => {
    const isStrike = scores[0] === MAX_SCORE

    if(isStrike) {
      const bonusScores = index === TOTAL_FRAMES - 1 ? scores.slice(1) : [
        frames[index + 1]?.[0],
        frames[index + 1]?.[1] || frames[index + 2]?.[0],
      ].filter(isFinite)

      return {state: FrameState.STRIKE, scores: [MAX_SCORE], bonusScores}
    }

    const isSpare = scores[0] + scores[1] === MAX_SCORE

    if(isSpare) {
      const bonusScores = index === TOTAL_FRAMES - 1 ? scores.slice(2) :
        [frames[index + 1]?.[0]].filter(isFinite)

      return {state: FrameState.SPARE, scores: scores.slice(0, 2), bonusScores}
    }

    return {state: FrameState.REGULAR, scores, bonusScores: []}
  }).map((frame) => ({...frame, total: sum(frame.scores) + sum(frame.bonusScores)}))

  return {
    frames: scoreSheetFrames as Frame[],
    total: sum(scoreSheetFrames.map(({total}) => total)),
  }
}
