import React from 'react'
import { Board } from '../Board'
import { LinePool } from '../LinePool'
import { LineToPlay } from '../LineToPlay/stateful'

import style from './style.css'

export const App = ({ board, linePossible, lineToPlay, setDiff }) =>
    <div className={style.container}>
        <div className={style.center}>
            <div className={style.board}>
                <Board board={board} />
            </div>
            <div className={style.lineToPlay}>
                {lineToPlay
                    ? <LineToPlay line={lineToPlay} setDiff={setDiff} />
                    : 'error'}
            </div>
        </div>
        <div className={style.right}>
            <div className={style.linePool}>
                <LinePool lines={linePossible} />
            </div>
        </div>
    </div>
