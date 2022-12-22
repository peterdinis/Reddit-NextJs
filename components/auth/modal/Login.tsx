import { Input } from "@chakra-ui/react";
import React from "react";

const Login: React.FC = () => {
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });


  const onSubmitForm = () => {}

  const onChangeInput = () => {}

  return (
    <form onSubmit={onSubmitForm}> 
      <Input
        onChange={onChangeInput}
        name="email"
        type="email"
        mb={2}
        placeholder="Enter your email"
      />
      <Input
        onChange={onChangeInput}
        name="password"
        type="password"
        mb={2}
        placeholder="Enter your password"
      />
    </form>
  );
};

export default Login;
