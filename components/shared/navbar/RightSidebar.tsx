import { Flex } from '@chakra-ui/react'
import React from 'react'
import AuthButtons from '../../auth/AuthButtons'

function RightSidebar() {
  return (
    <Flex justify="center" align="center">
      <AuthButtons />
    </Flex>
  )
}

export default RightSidebar