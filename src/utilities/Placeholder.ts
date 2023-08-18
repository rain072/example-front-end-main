import { Reducer } from 'react';

export const ignoreCallback = () => {
  // Just Ignore This Callback
};

export type StateReducer<T> = Reducer<T, Partial<T> | ((p: Partial<T>) => Partial<T>)>;
export const stateReducer = <S extends object, A extends Partial<S> | ((p: Partial<S>) => Partial<S>)>(prev: S, nextStateOrAction: A) => {
  return { ...prev, ...(nextStateOrAction instanceof Function ? nextStateOrAction(prev) : nextStateOrAction) };
};
