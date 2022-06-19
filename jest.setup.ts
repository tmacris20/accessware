// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom'
import failOnConsole from 'jest-fail-on-console'

failOnConsole({ shouldFailOnWarn: true, shouldFailOnLog: true })
