import { createContext } from 'solid-js'
import { Store, SetStoreFunction } from 'solid-js/store'
import { Session } from './models/session'

export const SessionsContext =
  createContext<[get: Store<Session[]>, set: SetStoreFunction<Session[]>]>([[], () => { }])

