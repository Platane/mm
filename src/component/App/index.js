import React from 'react'
import { Board } from '../Board'
import { Banners } from '../Banners'

import style from './style.css'

class SBanners extends React.PureComponent {
    render() {
        return <Banners {...this.props} />
    }
}
class SBoard extends React.PureComponent {
    render() {
        return <Board {...this.props} />
    }
}

export const App = ({
    board,
    gamma,
    linePlayed,
    setDiff,
    submitDiff,
    state,
    error,
}) =>
    <div className={style.container}>
        <div
            className={style.board}
            style={{
                transform:
                    `translateY(${(board.length - 3.5) * 90}px)` +
                    `rotateY(${gamma * 16}deg)`,
            }}
        >
            <SBoard board={board} setDiff={setDiff} />

            <SBanners
                y={7 - board.length}
                submitDiff={submitDiff}
                linePlayed={linePlayed}
                state={state}
                error={error}
            />
        </div>
    </div>
