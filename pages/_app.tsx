import React from 'react'
import { wrapper, RootState } from '@next-store/index'
import type { AppProps } from 'next/app'

interface AppWithStoreProps extends AppProps {
  store: RootState
}

const CustomApp = ({ Component, pageProps }: AppWithStoreProps) => {
  return (
    <div className="app">
      <Component {...pageProps} />
    </div>
  )
}

CustomApp.getInitialProps = wrapper.getInitialAppProps((store) => async (props) => {
  const { Component, ctx } = props

  const componentProps = Component.getInitialProps
    ? await Component.getInitialProps({ ...ctx, store })
    : {}
  return {
    pageProps: {
      ...componentProps,
      store,
    },
  }
})

export default wrapper.withRedux(CustomApp as unknown as React.FunctionComponent<AppProps>)
