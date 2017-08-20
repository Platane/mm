const DEFAULT_SEED = 821182389
const M = 9123027

export const create = (seed = DEFAULT_SEED) => () =>
    (seed = (seed * seed + DEFAULT_SEED) % M) / M
