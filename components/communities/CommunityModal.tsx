import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import { firestore } from "../../firebase/init";
import ModalWrapper from "../shared/ModalWrapper";
import { communityState } from "../../recoil/atoms/communitiesAtom";

const CommunityModal: React.FC = () => {
  return (
    <>

    </>
  )
}

export default CommunityModal