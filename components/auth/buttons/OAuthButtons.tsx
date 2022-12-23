import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../firebase/init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

function OAuthButtons() {
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
      <Flex direction="column" width="100%" mb={4}>
        <Button
          variant="oauth"
          mb={2}
          onClick={() => signInWithGoogle()}
          isLoading={loading}
        >
          <FcGoogle />
          Sign in with google
        </Button>
      </Flex>
    </>
  );
}

export default OAuthButtons;
