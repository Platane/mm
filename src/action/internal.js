export const startComputing = () => ({
    type: 'computing:start',
})

export const doneComputing = (bestLine, possibleLines) => ({
    type: 'computing:done',
    bestLine,
    possibleLines,
})

export const errorComputing = () => ({
    type: 'computing:error',
})
