import { App as Component } from './index'
import { connect } from 'react-redux'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    setDiff: diff => dispatch({ type: 'setDiff', diff }),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(Component)
