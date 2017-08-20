import React from 'react'
import { Line } from '../Line'

import style from './style.css'

import type { Board as Board_type } from '../../type'

export type Props = { board: Board_type }

const DiffDot = ({ value }) =>
    <div
        className={style.dot}
        style={{ backgroundColor: value ? 'black' : 'white' }}
    />

export const Board = ({ board }: Props) =>
    <div className={style.container}>
        {board.map(({ line, diff }, i) =>
            <div key={i} className={style.row}>
                <Line key={i} line={line} />
                <div className={style.diff}>
                    {Array.from({ length: diff.black }).map((_, i) =>
                        <DiffDot key={i} value={true} />
                    )}
                    {Array.from({ length: diff.white }).map((_, i) =>
                        <DiffDot key={i} value={false} />
                    )}
                </div>
            </div>
        )}
    </div>
