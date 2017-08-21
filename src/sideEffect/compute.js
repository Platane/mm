import { getPossibleLines, getBestLine } from '../service/gameSolver'
import {
    startComputing,
    doneComputing,
    errorComputing,
} from '../action/internal'

const memoize = fn => {
    const memory = []

    return arg => {
        const x = memory.find(x => x.arg === arg)

        if (x) return x.res

        const res = fn(arg)

        memory.push({ arg, res })

        return res
    }
}

export const init = store => {
    const pending = []

    const update = () => {
        const { state, board } = store.getState()

        if (state === 'computing' && !pending.some(b => b === board)) {
            pending.push(board)

            store.dispatch(startComputing())

            const possibleLines = getPossibleLines(board)
            const bestLine = getBestLine(board, possibleLines)

            if (bestLine) store.dispatch(doneComputing(bestLine, possibleLines))
            else store.dispatch(errorComputing())
        }
    }
    update()
    store.subscribe(update)
}