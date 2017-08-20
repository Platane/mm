import React from 'react'
import { Line } from '../Line'
import { colors } from '../common/color'

import style from './style.css'

import type { Line as Line_type } from '../../type'

export type Props = { lines: Line_type[], onClickLine: (i: number) => void }

const LIMIT = 20

export const LinePool = ({ lines, onClickLine }: Props) =>
    <div className={style.container}>
        {lines.slice(0, LIMIT - 1).map((line, i) =>
            <div
                key={i}
                className={style.row}
                onClick={() => onClickLine && onClickLine(i)}
            >
                <Line key={i} line={line} />
            </div>
        )}
        {lines.length > LIMIT && `and ${lines.length - LIMIT} more`}
    </div>
