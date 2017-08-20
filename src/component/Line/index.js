import React from 'react'
import { colors } from '../common/color'
import { Dot } from '../Dot'

import style from './style.css'

import type { Line as Line_type } from '../../type'

export type Props = { line: Line_type }

export const Line = ({ line }: Props) =>
    <div className={style.container}>
        {line.map((dot, i) => <Dot key={i} dot={dot} />)}
    </div>
