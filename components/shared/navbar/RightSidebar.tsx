import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "../../auth/AuthButtons";
import AuthModal from "../../auth/modal/AuthModal";

function RightSidebar() {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
}

export default RightSidebar;
