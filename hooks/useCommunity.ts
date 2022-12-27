import React from "react";
import { doc, getDoc, increment, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    Community,
    CommunitySnippet,
    communityState,
    defaultCommunity,
  } from "../recoil/atoms/communitiesAtom";
  
const useCommunity = () => {

}

export default useCommunity;