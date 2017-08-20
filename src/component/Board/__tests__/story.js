import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Board } from '../index'

const board = [
    { line: [1, 2, 3, 4], diff: { black: 1, white: 1 } },
    { line: [1, 3, 2, 4], diff: { black: 1, white: 1 } },
]

storiesOf('Board', module).add('default', () => <Board board={board} />)
