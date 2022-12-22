import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../recoil/atoms/authModalAtom";

const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmitForm = () => {};

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
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
        onChange={onChangeInput}
      />

      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        onChange={onChangeInput}
      />
      <Button width="100%" height="36px" mb={2} mt={2} type="submit">
        Sign up
      </Button>
      <Flex fontSize="8px" justifyContent="center">
        <Text mr={1}>Already have an account</Text>
        <Text
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
