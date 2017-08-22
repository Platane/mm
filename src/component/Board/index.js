import React from 'react'
import { Diff } from '../Diff/stateful'
import { Line } from '../Line'

import style from './style.css'

import type { Board as Board_type } from '../../type'

const Row = ({ i, line, diff, selected, setDiff }) =>
    <div className={style.row}>
        <div className={style.number}>
            {i + 1}
        </div>
        <div
            className={style.line + ' ' + (selected ? style.lineSelected : '')}
        >
            {line && <Line line={line} animated />}
        </div>
        <div className={style.diff}>
            {diff &&
                <Diff
                    diff={diff}
                    setDiff={setDiff}
                    wobble={!!setDiff}
                    animated
                />}
        </div>
    </div>

export type Props = {
    board: Board_type,
    setDiff?: (*) => void,
}

export const Board = ({ board, state, setDiff }: Props) =>
    <div className={style.container}>
        <div className={style.caseLeft} />
        <div className={style.caseRight} />
        <div className={style.caseFront} />

        <div className={style.board}>
            {Array.from({ length: 7 }, (_, i) => 6 - i).map(i =>
                <Row
                    key={i}
                    i={i}
                    line={board[i] && board[i].line}
                    diff={board[i] && board[i].diff}
                    setDiff={board.length - 1 === i && setDiff}
                />
            )}
        </div>
    </div>
