import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

function OAuthButtons() {
  return (
    <>
      <Flex direction="column" width="100%" mb={4}>
        <Button>Sign in with google</Button>
      </Flex>
    </>
  )
}

export default OAuthButtons