import React from 'react'
import { storiesOf } from '@storybook/react'
import { Line } from '../index'

storiesOf('Line', module).add('default', () =>
    <div
        style={{
            transform: 'rotateX(30deg)',
            transformStyle: 'preserve-3d',
            margin: 50,
        }}
    >
        <Line line={[1, 2, 3, 4]} animated />
    </div>
)
