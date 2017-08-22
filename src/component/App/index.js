import React from 'react'
import { Board } from '../Board'
import { Banners } from '../Banners'

import style from './style.css'

export const App = ({ board, linePlayed, setDiff, submitDiff, state, error }) =>
    <div className={style.container}>
        <div
            className={style.board}
            style={{ transform: `translateY(${(board.length - 3.5) * 90}px)` }}
        >
            <Board board={board} setDiff={setDiff} />

            <Banners
                y={7 - board.length}
                submitDiff={submitDiff}
                linePlayed={linePlayed}
                state={state}
                error={error}
            />
        </div>
    </div>
