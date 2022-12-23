import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import AuthModal from "../../auth/modal/AuthModal";
import AuthButtons from "../../auth/buttons/AuthButtons";

type RightSidebarProps = {
  user: User;
};

const RightSidebar: React.FC<RightSidebarProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
        {user ? <Text>FOO</Text> : <AuthButtons />}
      </Flex>
    </>
  );
};
export default RightSidebar;