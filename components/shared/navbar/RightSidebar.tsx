import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import AuthModal from "../../auth/modal/AuthModal";
import AuthButtons from "../../auth/buttons/AuthButtons";
import { auth } from "../../../firebase/init";
import { useRouter } from "next/router";

type RightSidebarProps = {
  user: User | any; // TODO: Later remove any
};

const RightSidebar: React.FC<RightSidebarProps> = ({ user }) => {
  
  const router = useRouter();
  
  const logoutUser = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
        {user ? (
          <Button onClick={logoutUser}>
            <Text>Logout</Text>
          </Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
export default RightSidebar;
