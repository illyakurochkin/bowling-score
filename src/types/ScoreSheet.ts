export enum FrameState {
  STRIKE = 'strike',
  SPARE = 'spare',
  REGULAR = 'regular',
}

type StrikeFrame = {
  state: FrameState.STRIKE,
  scores: [number]
  bonusScores: [] | [number] | [number, number],
}

type SpareFrame = {
  state: FrameState.SPARE,
  scores: [number, number],
  bonusScores: [] | [number],
}

type RegularFrame = {
  state: FrameState.REGULAR,
  scores: [number, number],
  bonusScores: [],
}

export type Frame = (StrikeFrame | SpareFrame | RegularFrame) & { total: number }

type ScoreSheet = {
  frames: Frame[],
  total: number,
}

export default ScoreSheet
