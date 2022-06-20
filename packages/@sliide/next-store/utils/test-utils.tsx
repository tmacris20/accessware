import type { RenderOptions } from '@testing-library/react'
import { cleanup, render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import React, { PropsWithChildren } from 'react'
import * as ReactRedux from 'react-redux'
import * as NextRouter from 'next/router'
import { Provider } from 'react-redux'
import type { AppStore, RootState } from '../index'
import type { PreloadedState } from '@reduxjs/toolkit'
import {
  AnyAction,
  combineReducers,
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
} from '@reduxjs/toolkit'
import { Mock } from 'ts-mockery'
import { baseApi } from '../api/baseApi'

// From https://medium.com/@johnmcdowell0801/testing-rtk-query-with-jest-cdfa5aaf3dc1
export function setupApiStore<
  A extends {
    reducer: Reducer<any, any>
    reducerPath: string
    middleware: Middleware
    util: { resetApiState(): any }
  },
  R extends Record<string, Reducer<any, any>> = Record<never, never>,
>(
  api: A,
  extraReducers?: R,
  preloadedState?: any,
): { api: any; store: EnhancedStore; preloadedState: any } {
  /*
   * Modified version of RTK Query's helper function:
   * https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/query/tests/helpers.tsx
   */
  const getStore = (): EnhancedStore =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(api.middleware),
      preloadedState,
    })

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A['reducer']>
    } & {
      [K in keyof R]: ReturnType<R[K]>
    },
    AnyAction,
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M> ? M : never
  >

  delete preloadedState.api

  const initialStore = getStore() as StoreType
  const refObj = {
    api,
    store: initialStore,
    preloadedState,
  }
  const store = getStore() as StoreType
  refObj.store = store

  return refObj
}

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store. For
// future dependencies, such as wanting to test with react-router, you can extend
// this interface to accept a path and route and use those in a <MemoryRouter />
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  /** provide extra state to be combined with the preloadedState **/
  extraState?: PreloadedState<RootState>
  store?: AppStore
}

const defaultPreloadedState = Mock.of<PreloadedState<RootState>>({})

/*
 * This function provides a full state for a component to be used in tests.
 */
function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = defaultPreloadedState,
    extraState = Mock.of<PreloadedState<RootState>>({}),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const extraReducers = {}
  const storeRef = setupApiStore(baseApi, extraReducers, { ...preloadedState, ...extraState })
  function wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={storeRef.store}>{children}</Provider>
  }
  return {
    store: storeRef.store,
    api: storeRef.api,
    ...render(ui, { wrapper, ...renderOptions }),
  }
}

/*
 * This function is a wrapper around renderHook to be used for testing hooks that require a full state
 */
export const renderHookWithWrapper = <T extends unknown>(
  fn: (props: any) => T,
  extraState: any,
) => {
  const extraReducers = {}

  const storeRef = setupApiStore(baseApi, extraReducers, {
    ...defaultPreloadedState,
    ...extraState,
  })

  // const store = initStore(withState)
  function wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={storeRef.store}>{children}</Provider>
  }
  return {
    store: storeRef.store,
    api: storeRef.api,
    ...renderHook(fn, { wrapper }),
  }
}

export const clean = () => {
  cleanup()
  jest.restoreAllMocks()
  jest.clearAllMocks()
}

export const spyOnUseDispatch = (mock: jest.Mock, expected: Object) =>
  jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => mock.mockResolvedValue(expected))

export const spyOnUseDispatchReject = (mock: jest.Mock, expected: Object) =>
  jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => mock.mockRejectedValue(expected))

export const spyOnUseSelector = (mock: jest.Mock, expected: Object) =>
  jest.spyOn(ReactRedux, 'useSelector').mockImplementation(() => mock.mockReturnValue(expected)())

export const spyOnReactHook = (hook: any, expected: Object) =>
  jest.spyOn(React, hook).mockImplementation(() => expected)

export const spyOnUseRouter = (expected: Object) =>
  // @ts-ignore
  jest.spyOn(NextRouter, 'useRouter').mockReturnValue({ push: () => {}, ...expected })

export const spyOnUseContext = (mock: jest.Mock, expected: Object) =>
  jest.spyOn(React, 'useContext').mockImplementation(() => mock.mockReturnValue(expected)())

export { renderWithProviders }
