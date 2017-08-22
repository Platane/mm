import React from 'react'
import { Board } from '../Board/stateful'

import style from './style.css'

export const App = ({ board, linePlayed, setDiff, computing }) =>
    <div className={style.container}>
        <div
            className={style.board}
            style={{ transform: `translateY(${(board.length - 3.5) * 90}px)` }}
        >
            <Board
                board={board}
                linePlayed={linePlayed}
                setDiff={setDiff}
                computing={computing}
            />
        </div>
    </div>
