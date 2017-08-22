import React from 'react'
import { colors } from '../common/color'

import style from './style.css'

import type { Dot as Dot_type } from '../../type'

export type Props = { dot: Dot_type | 'white' | 'black' }

const hue = [null, 0, 34, 60, 100, 230, 270]

const bodyColor = dot =>
    (dot === 'black' && '#262626') ||
    (dot === 'white' && '#cbcaca') ||
    `hsl(${hue[dot]},50%,56%)`

const headColor = dot =>
    (dot === 'black' && '#333') ||
    (dot === 'white' && '#dedede') ||
    `hsl(${hue[dot]},56%,60%)`

export const Dot = ({ dot }: Props) =>
    <div className={style.container + ' ' + style[`color-${dot}`]}>
        <div
            className={style.body}
            style={{ backgroundColor: bodyColor(dot) }}
        />
        <div
            className={style.head}
            style={{ backgroundColor: headColor(dot) }}
        />
        <div
            className={style.foot}
            style={{ backgroundColor: bodyColor(dot) }}
        />
    </div>
