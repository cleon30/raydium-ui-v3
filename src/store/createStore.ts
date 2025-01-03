import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { StateCreator } from 'zustand/vanilla'
import { Draft } from 'immer'

const storeResetter: {
  name?: string
  reset: (replaceState?: Record<string, any>) => void
}[] = []

// e.g. resetAllStore({ useAppStore: { raydium: useAppStore.getState().raydium, rpcNodeUrl: 'https://xxx' } })
export const resetAllStore = (props?: { [key: string]: Record<string, any> }) => {
  storeResetter.forEach((f) => f.reset(f.name && props ? props[f.name] : undefined))
}

type StoreMiddlewares = [['zustand/devtools', never], ['zustand/immer', never]]

interface ActionType {
  type: string
  payload?: any
}

const createStore = <T extends object>(
  fn: StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]], [], T>,
  name?: string
) => {
  const store = create<T>()(
    devtools(
      immer((set, get, store) => {
        const logSet = (nextStateOrUpdater: T | Partial<T> | ((state: Draft<T>) => void), shouldReplace?: boolean, action?: string | ActionType) => {
          const objAct = typeof action === 'string' ? { type: action } : (action || { type: 'unknown' }) as ActionType
          return set(nextStateOrUpdater, shouldReplace, objAct)
        }

        return fn(logSet, get, store)
      }),
      { name }
    )
  )

  const reset = (replaceState?: Record<string, any>) => {
    const initialState = fn(store.setState, store.getState, store)
    store.setState({ ...initialState, ...(replaceState || {}) } as T, true)
  }

  storeResetter.push({ name, reset })

  return store
}

export default createStore
