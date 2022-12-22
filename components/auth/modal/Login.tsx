import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../recoil/atoms/authModalAtom";

const Login: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
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
      <Button width="100%" height="36px" mb={2} mt={2} type="submit">
        Log In
      </Button>
      <Flex fontSize="8px" justifyContent="center">
        <Text mr={1}>New Here</Text>
        <Text onClick={() => setAuthModalState(prev =>({
            ...prev,
            view: "signup"
        }))} color="blue.500" fontWeight={700} cursor="pointer">Sign up</Text>
      </Flex>
    </form>
  );
};

export default Login;
