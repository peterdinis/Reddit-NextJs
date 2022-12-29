import React from "react";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../recoil/atoms/authModalAtom";
import { Community } from "../../recoil/atoms/communitiesAtom";
import { firestore } from "../../firebase/init";
import PostLoader from "./PostLoader";
import {Post, postState, PostVote} from "../../recoil/atoms/postAtom";
import PostItem from "./item/PostItem";
import { useRouter } from "next/router";
import usePosts from "../../hooks/usePosts";