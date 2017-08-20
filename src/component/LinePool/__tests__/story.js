import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { LinePool } from '../index'

const lines = [[1, 2, 3, 4], [1, 3, 2, 4]]

storiesOf('LinePool', module).add('default', () =>
    <LinePool lines={lines} onClickLine={action('clickLine')} />
)
