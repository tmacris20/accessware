import React from 'react'
import { render, screen } from '@testing-library/react'
import { Test } from './Test'

describe('Test Component', () => {
  it('should render the Test component', () => {
    render(<Test testName="test" />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
