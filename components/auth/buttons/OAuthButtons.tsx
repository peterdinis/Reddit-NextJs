import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, firestore } from "../../../firebase/init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function OAuthButtons() {
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user))); // setDoc because we dont know if user try to login or signup 
  }

  React.useEffect(() => {
    if(userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred])

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
