import { addParameters } from '@storybook/react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Development Guidelines', 'Base Components', 'Group Components'],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const customViewports = {
  smallMobile: {
    name: 'Small Mobile',
    styles: {
      width: '321px',
      height: '568px',
    },
  },
  largeMobile: {
    name: 'Large Mobile',
    styles: {
      width: '429px',
      height: '926px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '769px',
      height: '1024px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1025px',
      height: '768px',
    },
  },
  largeDesktop: {
    name: 'Large Desktop',
    styles: {
      width: '1367px',
      height: '768px',
    },
  },
}

addParameters({
  viewport: {
    viewports: {
      ...customViewports,
    },
  },
})
