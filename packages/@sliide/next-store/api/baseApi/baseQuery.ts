import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'

export interface GOError {
  errorCode?: string
  errorKey?: string
  errorParameters?: string[]
  errorMessage?: string
  errorMsg?: string
  fieldName?: string
}

export interface GOErrorResponse {
  status?: number
  data: {
    errors: GOError[]
  }
}

export interface ExtraOptions {
  isTransformer?: boolean
  isSSR?: boolean
}

const GITHUB_API = 'https://api.github.com'

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, GOErrorResponse> = async (
  arg,
  api,
  extraOptions: ExtraOptions,
) => {
  const baseUrl = GITHUB_API
  const getFetchBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json')

      return headers
    },
    mode: 'cors',
    credentials: 'same-origin',
  }) as BaseQueryFn<string | FetchArgs, unknown, GOErrorResponse>

  return getFetchBaseQuery(arg, api, extraOptions)
}

export type BaseQuery = typeof baseQuery
