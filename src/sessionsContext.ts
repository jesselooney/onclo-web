import { createContext } from 'solid-js'
import { Store, SetStoreFunction } from 'solid-js/store'
import { Session } from './models/Session'

export const SessionsContext =
  createContext<[get: Store<Session[]>, set: SetStoreFunction<Session[]>]>([[], () => { }])

