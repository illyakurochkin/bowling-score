import ScoreSheet, {Frame, FrameState} from '../types/ScoreSheet'
import {MAX_SCORE, TOTAL_FRAMES} from './constants'

const sum = (array: number[]): number => (
  array.reduce((accumulator, current) => accumulator + current, 0)
)

const groupScoresByFrames = (scores: number[]): number[][] => (
  scores.reduce((accumulator: number[][], score, index) => {
    const lastFrame = accumulator[accumulator.length - 1]

    const shouldCreateNewFrame = accumulator.length !== TOTAL_FRAMES && (
      !lastFrame || lastFrame[0] === MAX_SCORE || isFinite(lastFrame[1])
    )

    if (shouldCreateNewFrame) {
      return [...accumulator, [score]]
    }

    return accumulator.map((frame, frameIndex) => (
      frameIndex === accumulator.length - 1 ? [...frame, score] : frame
    ))
  }, [])
)

export const mapScoresToScoreSheet = (scores: number[]): ScoreSheet => {
  const frames = groupScoresByFrames(scores)

  const scoreSheetFrames = frames.map((scores, index) => {
    const isStrike = scores[0] === MAX_SCORE

    if(isStrike && index === TOTAL_FRAMES - 1) {
      const [, ...bonusScores] = scores
      return {state: FrameState.STRIKE, scores: [MAX_SCORE], bonusScores}
    }

    if (isStrike) {
      const bonusScores = [
        frames[index + 1]?.[0],
        frames[index + 1]?.[1] || frames[index + 2]?.[0],
      ].filter(isFinite) as number[]

      return {state: FrameState.STRIKE, scores, bonusScores}
    }

    const isSpare = scores[0] + scores[1] === MAX_SCORE

    if(isSpare && index === TOTAL_FRAMES - 1) {
      const [first, second, ...bonusScores] = scores
      return {state: FrameState.SPARE, scores: [first, second], bonusScores}
    }

    if (isSpare) {
      const bonusScores = [frames[index + 1]?.[0] || null]
        .filter((score) => score !== null) as number[]

      return {state: FrameState.SPARE, scores, bonusScores}
    }

    return {state: FrameState.REGULAR, scores, bonusScores: []}
  }).map((frame) => ({...frame, total: sum(frame.scores) + sum(frame.bonusScores)}))

  return {
    frames: scoreSheetFrames as Frame[],
    total: sum(scoreSheetFrames.map(({total}) => total))
  }
}
