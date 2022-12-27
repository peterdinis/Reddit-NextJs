import React from "react";
import { Flex, Icon, MenuDivider, MenuItem } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { useResetRecoilState } from "recoil";
import { auth } from "../../../firebase/init";
import { communityState } from "../../../recoil/atoms/communitiesAtom";
import { useRouter } from "next/router";

type UserListProps = {};

const UserList: React.FC<UserListProps> = () => {
  const router = useRouter();
  const resetCommunityState = useResetRecoilState(communityState);

  const logout = async () => {
    await signOut(auth);
    router.push("/");
    resetCommunityState();
  };

  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={CgProfile} />
          Profile
        </Flex>
      </MenuItem>
      <MenuDivider />
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={logout}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          Log Out
        </Flex>
      </MenuItem>
    </>
  );
};

export default UserList;
