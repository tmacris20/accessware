import React from 'react'
import Document from 'next/document'
import { CustomAppDocument } from '@components/custom-app-document'
const STATIC_PREFIX = 'accessware-static'

class CustomDocument extends Document {
  render() {
    return <CustomAppDocument staticPrefix={STATIC_PREFIX} />
  }
}

export default CustomDocument
