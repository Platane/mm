import React from 'react'
import { colors } from '../common/color'
import { Dot } from '../Dot'

import style from './style.css'

type Dot_type = 'white' | 'black' | null

export type Props = {
    dots: [Dot_type, Dot_type, Dot_type, Dot_type],
    animated: boolean,
    setDots: (*) => void,
}

const createClickSlotHandler = (setDots, dots, k) => () =>
    setDots(
        dots.map(
            (x, i) =>
                k === i
                    ? (x === null && 'black') ||
                      (x === 'black' && 'white') ||
                      (x === 'white' && null)
                    : x
        )
    )

export const Diff = ({ dots, setDots, animated }: Props) =>
    <div className={style.container + ' ' + (animated ? style.animated : '')}>
        {[0, 1].map(i =>
            <div key={i} className={style.row}>
                {[0, 1].map(j =>
                    <div
                        key={j}
                        className={style.slot}
                        onClick={
                            setDots &&
                            createClickSlotHandler(setDots, dots, i * 2 + j)
                        }
                    >
                        <div className={style.hole} />

                        {dots[i * 2 + j] &&
                            <div
                                key={j + (dots[i * 2 + j] || 'o')}
                                className={style.dot}
                            >
                                <Dot dot={dots[i * 2 + j]} />
                            </div>}
                    </div>
                )}
            </div>
        )}
    </div>
