import { setupListeners } from '@reduxjs/toolkit/query'
import { createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'

export const initStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    ...options,
    devTools: process.env.NODE_ENV !== 'production',
  })

export type AppStore = ReturnType<typeof initStore>
export type AppState = ReturnType<AppStore['getState']>

export const wrapper = createWrapper<AppStore>(initStore)

export const store = initStore()
setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
