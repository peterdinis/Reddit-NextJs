import React from "react";
import { Flex} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import AuthModal from "../../auth/modal/AuthModal";
import AuthButtons from "../../auth/buttons/AuthButtons";
import { auth } from "../../../firebase/init";
import { useRouter } from "next/router";
import Icons from "./Icons";
import MenuWrapper from "../../auth/profile/MenuWrapper";

type RightSidebarProps = {
  user?: User | null;
};

const RightSidebar: React.FC<RightSidebarProps> = ({ user }) => {
  
  const router = useRouter();
  
  /* const logoutUser = () => {
    signOut(auth);
    router.push("/");
  };

  console.log("User", user); */

  return (
    <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
        {user ? <Icons /> : <AuthButtons />}
        <MenuWrapper />
      </Flex>
    </>
  );
};
export default RightSidebar;
