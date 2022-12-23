import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../recoil/atoms/authModalAtom";
import { auth } from "../../../firebase/init";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"

// TODO: Later add some error handling 
const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signupForm, setSignupForm] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = React.useState("");

  const [createUserWithEmailAndPassword, user, loading, userError] = useCreateUserWithEmailAndPassword(auth);

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if(formError) setFormError("");
    if(signupForm.password !== signupForm.confirmPassword) {
      setFormError("Password not match");
      return;
    }

    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // name = name = "email"
    }));
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name="email"
        placeholder="email"
        type="text"
        mb={2}
        onChange={onChangeInput}
      />
      <Input
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChangeInput}
      />

      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        mb={2}
        onChange={onChangeInput}
      />
      {formError || userError && (
        <Text color="red" textAlign="center" fontSize="10px">
          {userError.message}
        </Text>
      )}
      <Button width="100%" height="36px" mb={2} mt={2} type="submit">
        Sign up
      </Button>
      <Flex fontSize="8px" justifyContent="center">
        <Text fontSize="1rem" mr={1}>Already have an account</Text>
        <Text
          fontSize="1rem"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          Login here
        </Text>
      </Flex>
    </form>
  );
};

export default Signup;
