import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import AuthModal from "../../auth/modal/AuthModal";
import AuthButtons from "../../auth/buttons/AuthButtons";
import { auth } from "../../../firebase/init";
import { useRouter } from "next/router";
import Menu from "./Menu";

type RightSidebarProps = {
  user?: User | null;
};

const RightSidebar: React.FC<RightSidebarProps> = ({ user }) => {
  
  const router = useRouter();
  
  const logoutUser = () => {
    signOut(auth);
    router.push("/");
  };

  console.log("User", user);

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
        <Menu />
      </Flex>
    </>
  );
};
export default RightSidebar;
