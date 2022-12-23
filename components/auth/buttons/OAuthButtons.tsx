import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import {FcGoogle} from "react-icons/fc"

function OAuthButtons() {
  return (
    <>
      <Flex direction="column" width="100%" mb={4}>
        <Button variant="oauth"><FcGoogle />Sign in with google</Button>
      </Flex>
    </>
  )
}

export default OAuthButtons