import React from 'react'

interface TestProps {
  testName: string
}

export const Test = ({ testName }: TestProps) => {
  return <div>{testName}</div>
}
