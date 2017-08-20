import React from 'react'
import { colors } from '../common/color'
import { Line } from '../Line'

import style from './style.css'

import type {
    Board as Board_type,
    Line as Line_type,
    Dot as Dot_type,
    Diff,
} from '../../type'

export type Props = { line: Line_type, diff: Diff }

const Arrows = ({ value, onChange }) =>
    <div className={style.arrows}>
        <button onClick={() => onChange(value + 1)}>^</button>
        <button onClick={() => onChange(value - 1)}>v</button>
    </div>

const DiffDot = ({ value }) =>
    <div
        className={style.dot}
        style={{ backgroundColor: value ? 'black' : 'white' }}
    />

export const LineToPlay = ({ line, diff, setDiff, submitDiff }: Props) =>
    <div className={style.container}>
        <div className={style.row}>
            <div className={style.line}>
                <Line line={line} />
            </div>
            <div className={style.diff}>
                <Arrows
                    value={diff.black}
                    onChange={i => setDiff({ ...diff, black: i })}
                />
                {Array.from({ length: diff.black }).map((_, i) =>
                    <DiffDot key={i} value={true} />
                )}
                <Arrows
                    value={diff.white}
                    onChange={i => setDiff({ ...diff, white: i })}
                />
                {Array.from({ length: diff.white }).map((_, i) =>
                    <DiffDot key={i} value={false} />
                )}

                <button onClick={submitDiff}>ok</button>
            </div>
        </div>
    </div>
