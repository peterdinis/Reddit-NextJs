import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../recoil/atoms/authModalAtom";
import { Community, communityState } from "../recoil/atoms/communitiesAtom";
import { useRouter } from "next/router";
import {auth, firestore, storage} from "../firebase/init"
import {Post, postState, PostVote} from "../recoil/atoms/postAtom"

const usePosts = (communityData?: Community) => {
    const [user, loadingUser] = useAuthState(auth);
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const communityStateValue = useRecoilValue(communityState);
  
    const onSelectPost = (post: Post, postIdx: number) => {
      console.log("HERE IS STUFF", post, postIdx);
  
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { ...post, postIdx },
      }));
      router.push(`/r/${post.communityId}/comments/${post.id}`);
    };
  
    const onVote = async (
      event: React.MouseEvent<SVGElement, MouseEvent>,
      post: Post,
      vote: number,
      communityId: string
    ) => {
      event.stopPropagation();
      if (!user?.uid) {
        setAuthModalState({ open: true, view: "login" });
        return;
      }
  
      const { voteStatus } = post;
      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      );
  
      // is this an upvote or a downvote?
      // has this user voted on this post already? was it up or down?
  
      try {
        let voteChange = vote;
        const batch = writeBatch(firestore);
  
        const updatedPost = { ...post };
        const updatedPosts = [...postStateValue.posts];
        let updatedPostVotes = [...postStateValue.postVotes];
  
        // New vote
        if (!existingVote) {
          const postVoteRef = doc(
            collection(firestore, "users", `${user.uid}/postVotes`)
          );
  
          const newVote: PostVote = {
            id: postVoteRef.id,
            postId: post.id,
            communityId,
            voteValue: vote,
          };
  
          batch.set(postVoteRef, newVote);
  
          updatedPost.voteStatus = voteStatus + vote;
          updatedPostVotes = [...updatedPostVotes, newVote];
        }

        else {
          const postVoteRef = doc(
            firestore,
            "users",
            `${user.uid}/postVotes/${existingVote.id}`
          );

          if (existingVote.voteValue === vote) {
            voteChange *= -1;
            updatedPost.voteStatus = voteStatus - vote;
            updatedPostVotes = updatedPostVotes.filter(
              (vote) => vote.id !== existingVote.id
            );
            batch.delete(postVoteRef);
          }
          // Changing vote
          else {
            voteChange = 2 * vote;
            updatedPost.voteStatus = voteStatus + 2 * vote;
            const voteIdx = postStateValue.postVotes.findIndex(
              (vote) => vote.id === existingVote.id
            );
            if (voteIdx !== -1) {
              updatedPostVotes[voteIdx] = {
                ...existingVote,
                voteValue: vote,
              };
            }
            batch.update(postVoteRef, {
              voteValue: vote,
            });
          }
        }
  
        let updatedState = { ...postStateValue, postVotes: updatedPostVotes };
  
        const postIdx = postStateValue.posts.findIndex(
          (item) => item.id === post.id
        );
  
        // if (postIdx !== undefined) {
        updatedPosts[postIdx!] = updatedPost;
        updatedState = {
          ...updatedState,
          posts: updatedPosts,
          postsCache: {
            ...updatedState.postsCache,
            [communityId]: updatedPosts,
          },
        };
        if (updatedState.selectedPost) {
          updatedState = {
            ...updatedState,
            selectedPost: updatedPost,
          };
        }
        setPostStateValue(updatedState);
  
        const postRef = doc(firestore, "posts", post.id);
        batch.update(postRef, { voteStatus: voteStatus + voteChange });
        await batch.commit();
      } catch (error) {
        console.log("onVote error", error);
      }
    };
  
    const onDeletePost = async (post: Post): Promise<boolean> => {
      console.log("DELETING POST: ", post.id);
  
      try {
        // if post has an image url, delete it from storage
        if (post.imageURL) {
          const imageRef = ref(storage, `posts/${post.id}/image`);
          await deleteObject(imageRef);
        }
  
        // delete post from posts collection
        const postDocRef = doc(firestore, "posts", post.id);
        await deleteDoc(postDocRef);
  
        // Update post state
        setPostStateValue((prev) => ({
          ...prev,
          posts: prev.posts.filter((item) => item.id !== post.id),
          postsCache: {
            ...prev.postsCache,
            [post.communityId]: prev.postsCache[post.communityId]?.filter(
              (item) => item.id !== post.id
            ),
          },
        }));
        
        return true;
      } catch (error) {
        console.log("THERE WAS AN ERROR", error);
        return false;
      }
    };
  
    const getCommunityPostVotes = async (communityId: string) => {
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("communityId", "==", communityId)
      );
      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    };
  
    useEffect(() => {
      if (!user?.uid || !communityStateValue.currentCommunity) return;
      getCommunityPostVotes(communityStateValue.currentCommunity.id);
    }, [user, communityStateValue.currentCommunity]);
  
    useEffect(() => {
      // Logout or no authenticated user
      if (!user?.uid && !loadingUser) {
        setPostStateValue((prev) => ({
          ...prev,
          postVotes: [],
        }));
        return;
      }
    }, [user, loadingUser]);
  
    return {
      postStateValue,
      setPostStateValue,
      onSelectPost,
      onDeletePost,
      loading,
      setLoading,
      onVote,
      error,
    };
}

export default usePosts;