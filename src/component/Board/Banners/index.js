import React from 'react'

import style from './style.css'

const Button = ({ onClick }) =>
    <div className={style.button} onClick={onClick}>
        Ok
    </div>

const LINE_HEIGHT = 90

export const Banners = ({ y, submitDiff, linePlayed, computing }) =>
    <div className={style.container}>
        {submitDiff &&
            <div
                className={style.infoWriteDiff}
                style={{
                    transform:
                        `translate3d(0,${y * LINE_HEIGHT - 60}px,50px) ` +
                        'rotateX(-20deg)',
                }}
            >
                <div className={style.arrow} />
                Write the result here
            </div>}

        {submitDiff &&
            <div
                className={style.infoWriten}
                style={{
                    transform:
                        `translate3d(0,${y * LINE_HEIGHT + 120}px,50px) ` +
                        'rotateX(0deg)',
                }}
            >
                <div className={style.arrow} />
                <Button onClick={submitDiff} />
            </div>}

        {linePlayed &&
            <div
                className={style.infoPlayLine}
                style={{
                    transform:
                        `translate3d(0,${y * LINE_HEIGHT - 60}px,50px) ` +
                        'rotateX(-20deg)',
                }}
            >
                <div className={style.arrow} />
                Play this line
                <Button onClick={linePlayed} />
            </div>}

        {computing &&
            <div
                className={style.infoComputing}
                style={{
                    transform:
                        `translate3d(0,${y * LINE_HEIGHT - 60}px,50px) ` +
                        'rotateX(-20deg)',
                }}
            >
                <div className={style.arrow} />
                computing ...
            </div>}
    </div>
