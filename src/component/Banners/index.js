import React from 'react'

import style from './style.css'

const Button = ({ onClick }) =>
    <div className={style.button} onClick={onClick}>
        Ok
    </div>

const LINE_HEIGHT = 90

export const Banners = ({ y, submitDiff, linePlayed, error, state }) =>
    <div className={style.container}>
        <div
            className={style.infoMain + ' ' + style[`info-${state}`]}
            style={{
                transform:
                    `translate3d(0,${y * LINE_HEIGHT - 60}px,50px) ` +
                    'rotateX(-20deg)',
            }}
        >
            <div className={style.arrow} />

            {state === 'error' && <div className={style.title}>Error</div>}

            {state === 'error' &&
                <div className={style.subtitle}>
                    Did you corectly submit all the results ?
                </div>}

            {state === 'writeDiff' &&
                <div className={style.title}>Write the result here</div>}

            {state === 'playThis' &&
                <div className={style.title}>Play this line</div>}

            {state === 'playThis' && <Button onClick={linePlayed} />}

            {state === 'computing' &&
                <div className={style.title}>Computing ...</div>}
        </div>

        {state === 'writeDiff' &&
            <div
                className={style.infoSecond + ' ' + style[`info-${state}`]}
                style={{
                    transform:
                        `translate3d(0,${y * LINE_HEIGHT + 120}px,50px) ` +
                        'rotateX(0deg)',
                }}
            >
                <Button onClick={submitDiff} />
            </div>}
    </div>
