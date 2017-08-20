import React from 'react'
import { colors } from '../common/color'

import style from './style.css'

import type { Line as Line_type } from '../../type'

export type Props = { line: Line_type }

const Dot = ({ dot }) =>
    <div className={style.dot} style={{ backgroundColor: colors[dot] }} />

export const Line = ({ line }: Props) =>
    <div className={style.container}>
        {line.map((dot, i) => <Dot key={i} dot={dot} />)}
    </div>
