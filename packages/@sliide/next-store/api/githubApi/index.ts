import { endpoints } from '../endpoints'
import { baseApi } from '../baseApi'
import { RepositoriesResponse } from './types'

const {
  github: { repositories },
} = endpoints

export const githubApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getRepositories: build.query<RepositoriesResponse, void>({
        query: () => {
          return {
            url: repositories,
            method: 'GET',
            headers: {},
          }
        },
      }),
    }
  },
})

export const { useGetRepositoriesQuery } = githubApi
