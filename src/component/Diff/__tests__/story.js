import React from 'react'
import { storiesOf } from '@storybook/react'
import { Diff } from '../index'
import { Diff as StatefulDiff } from '../stateful'

storiesOf('Diff', module)
    .add('default', () =>
        <div
            style={{
                transform: 'rotateX(30deg)',
                transformStyle: 'preserve-3d',
                margin: 50,
            }}
        >
            <Diff dots={['black', 'black', 'white', null]} />
        </div>
    )
    .add('stateful', () =>
        <div
            style={{
                transform: 'rotateX(30deg)',
                transformStyle: 'preserve-3d',
                margin: 50,
            }}
        >
            <StatefulDiff diff={{ black: 2, white: 1 }} animated />
        </div>
    )
