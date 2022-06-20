import React from 'react'
import { render } from '@testing-library/react'

import { CustomAppDocument } from './CustomAppDocument'

const getHrefValueForGivenAttribute = (sizes: string) => {
  const iconSizesDetails = document.querySelector(`link[sizes="${sizes}"]`)
  return iconSizesDetails?.attributes?.getNamedItem('href')?.value
}

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
  }
})

jest.mock('next/document', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
    Html: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
    Head: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
    Main: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
    NextScript: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
  }
})

describe('CustomAppDocument Component', () => {
  describe('Handle style sheets', () => {
    it('should have various style sheet links', () => {
      render(<CustomAppDocument staticPrefix="test" />)

      const styleSheetDetails = document.querySelectorAll('link[rel="stylesheet"]')

      expect(styleSheetDetails).toHaveLength(1)

      const globalStyleSheet = styleSheetDetails?.[0]?.attributes?.getNamedItem('href')?.value

      expect(globalStyleSheet).toEqual('test/global.css')
    })
  })

  describe('Various icons', () => {
    it('should have short cut icon for favicon', () => {
      render(<CustomAppDocument staticPrefix="test" />)

      const shortCutIcon = document.querySelector('link[rel="shortcut icon"]')

      const shortCutIconHref = shortCutIcon?.attributes?.getNamedItem('href')?.value

      expect(shortCutIconHref).toEqual('test/icons/favicon.ico')
    })

    describe('Apple touch icon for various sizes', () => {
      beforeEach(() => {
        render(<CustomAppDocument staticPrefix="test" />)
      })

      it('like 48x48 should exist', () => {
        expect(getHrefValueForGivenAttribute('48x48')).toEqual('test/icons/icon-48.png')
      })

      it('like 72x72 should exist', () => {
        expect(getHrefValueForGivenAttribute('72x72')).toEqual('test/icons/icon-72.png')
      })

      it('like 96x96 should exist', () => {
        expect(getHrefValueForGivenAttribute('96x96')).toEqual('test/icons/icon-96.png')
      })

      it('like 144x144 should exist', () => {
        expect(getHrefValueForGivenAttribute('144x144')).toEqual('test/icons/icon-144.png')
      })

      it('like 168x168 should exist', () => {
        expect(getHrefValueForGivenAttribute('168x168')).toEqual('test/icons/icon-168.png')
      })

      it('like 192x192 should exist', () => {
        expect(getHrefValueForGivenAttribute('192x192')).toEqual('test/icons/icon-192.png')
      })
    })
  })
})
