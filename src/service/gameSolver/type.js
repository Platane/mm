import type { Line, Dot } from '../../type'

export type ImcompleteLine = Line | [Dot, Dot, Dot] | [Dot, Dot] | [Dot] | []
