import React from 'react'
import { colors } from '../common/color'

import style from './style.css'

import type { Dot as Dot_type } from '../../type'

export type Props = { dot: Dot_type }

export const Dot = ({ dot }: Props) =>
    <div className={style.container + ' ' + style[`color${dot}`]}>
        <div className={style.body} />
        <div className={style.head} />
        <div className={style.foot} />
    </div>
