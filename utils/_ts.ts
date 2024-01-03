export type UnionOverrideKeys<T, U> = Omit<T, keyof U> & U;
