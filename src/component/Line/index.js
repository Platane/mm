import React from 'react'
import { colors } from '../common/color'
import { Dot } from '../Dot'

import style from './style.css'

import type { Line as Line_type } from '../../type'

export type Props = { line: Line_type, animated: boolean }

export const Line = ({ line, animated }: Props) =>
    <div className={style.container + ' ' + (animated ? style.animated : '')}>
        {line.map((dot, i) =>
            <div key={i} className={style.dot}>
                <Dot dot={dot} />
            </div>
        )}
    </div>
