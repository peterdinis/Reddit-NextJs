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
import { auth } from "../firebase/init";
import { authModalState } from "../recoil/atoms/authModalAtom";
import { getMySnippets } from "../firebase/firestore";

const useCommunity = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const getSnippets = async () => {
    setLoading(true);
    try {
      const snippets = await getMySnippets(user?.uid!);
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
        initSnippetsFetched: true,
      }));
      setLoading(false);
    } catch (error: any) {
      console.log("Error getting user snippets", error);
      setError(error.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (!user || !!communityStateValue.mySnippets.length) return;

    getSnippets();
  }, [user]);
};

export default useCommunity;
