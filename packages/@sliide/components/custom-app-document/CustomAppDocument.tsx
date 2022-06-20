import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'

interface CustomAppDocumentProps {
  /** Class name or array of class names that are applied to the control route */
  className?: string | string[]
  // statif prefix where various assets are mapped.
  staticPrefix?: string
}

export const CustomAppDocument = ({ staticPrefix }: CustomAppDocumentProps) => {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href={`${staticPrefix}/global.css`} />
        <link rel="apple-touch-icon" sizes="48x48" href={`${staticPrefix}/icons/icon-48.png`} />
        <link rel="apple-touch-icon" sizes="72x72" href={`${staticPrefix}/icons/icon-72.png`} />
        <link rel="apple-touch-icon" sizes="96x96" href={`${staticPrefix}/icons/icon-96.png`} />
        <link rel="apple-touch-icon" sizes="144x144" href={`${staticPrefix}/icons/icon-144.png`} />
        <link rel="apple-touch-icon" sizes="168x168" href={`${staticPrefix}/icons/icon-168.png`} />
        <link rel="apple-touch-icon" sizes="192x192" href={`${staticPrefix}/icons/icon-192.png`} />
        <link rel="manifest" href={`${staticPrefix}/manifest.json`} />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          media="all"
          href={`${staticPrefix}/icons/favicon.ico`}
        />
      </Head>
      <>
        <div>
          <noscript>You need to enable Javascript to use this site.</noscript>
          <Main />
          <NextScript />
        </div>
      </>
    </Html>
  )
}
