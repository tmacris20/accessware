import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { ErrorPageProps } from 'types/errorPageTypes'

const Error: NextPage<ErrorPageProps> = (props) => {
  let response
  const { statusCode } = props

  switch (statusCode) {
    case 200: // Also display a 404 if someone requests /_error explicitly
    case 404:
      response = (
        <>
          <Head>
            <title> Error</title>
          </Head>
          <div>404 - Not Found</div>
        </>
      )
      break
    case 500:
      response = (
        <>
          <Head>
            <title>Error</title>
          </Head>
          <div>
            <h1>Internal Server Error</h1>
            <p>An internal server error occurred.</p>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        </>
      )
      break
    default:
      response = (
        <>
          <Head>
            <title>Error</title>
          </Head>
          <div>
            <h1>Error</h1>
            <p>An error occurred.</p>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        </>
      )
  }

  return response
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode, err }
}

export default Error
