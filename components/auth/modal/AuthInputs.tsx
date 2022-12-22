import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../recoil/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

const AuthInputs: React.FC = () => {
    const modalState = useRecoilValue(authModalState);
    return (
        <>
          <Flex direction="column" align="center" width="100%" mt={4}>
            {modalState.view === "login" && <Login />}
            {modalState.view === "signup" && <Signup />}
          </Flex>
        </>
    )
}

export default AuthInputs;