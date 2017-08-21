import React from 'react'
import { Board } from '../Board/stateful'
// import { LinePool } from '../LinePool'
// import { LineToPlay } from '../LineToPlay/stateful'

import style from './style.css'

export const App = ({ board, linePlayed, setDiff }) =>
    <div className={style.container}>
        <div
            className={style.board}
            style={{ transform: `translateY(${(board.length - 3.5) * 90}px)` }}
        >
            <Board board={board} linePlayed={linePlayed} setDiff={setDiff} />
        </div>
    </div>
