import React from "react";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Community } from "../../recoil/interfaces/ICommunity";
import { firestore } from "../../firebase/init";
import PostLoader from "./PostLoader";
import {Post} from "../../recoil/interfaces/IPost";
import PostItem from "./item/PostItem";
import { useRouter } from "next/router";
import usePosts from "../../hooks/usePosts";
import { getErrorMessage } from "../../utils/errorTyping";

type PostsProps = {
  communityData?: Community;
  userId?: string;
  loadingUser: boolean;
};

const Posts: React.FC<PostsProps> = ({
  communityData,
  userId,
  loadingUser,
}) => {
  const [loading, setLoading] =React.useState(false);
  const router = useRouter();

  const { postStateValue, setPostStateValue, onVote, onDeletePost } = usePosts(
    communityData!
  );

  const onSelectPost = (post: Post, postIdx: number) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: { ...post, postIdx },
    }));
    router.push(`/r/${communityData?.id!}/comments/${post.id}`);
  };

  React.useEffect(() => {
    if (
      postStateValue.postsCache[communityData?.id!] &&
      !postStateValue.postUpdateRequired
    ) {
      setPostStateValue((prev) => ({
        ...prev,
        posts: postStateValue.postsCache[communityData?.id!],
      }));
      return;
    }

    getPosts();

  }, [communityData, postStateValue.postUpdateRequired]);

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData?.id!),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        postsCache: {
          ...prev.postsCache,
          [communityData?.id!]: posts as Post[],
        },
        postUpdateRequired: false,
      }));
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);

      getErrorMessage({ message });
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post: Post) => (
            <PostItem
              key={post.id}
              post={post}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={
                postStateValue.postVotes.find((item) => item.postId === post.id)
                  ?.voteValue
              }
              userIsCreator={userId === post.creatorId}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;