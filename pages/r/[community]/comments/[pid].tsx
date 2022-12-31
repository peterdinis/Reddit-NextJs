import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "../../../../recoil/atoms/postAtom";
import AboutCommunity from "../../../../components/communities/AboutCommunity";
import PageContent from "../../../../components/shared/PageContent";
import Comments from "../../../../components/post/comments/PostComments";
import PostLoader from "../../../../components/post/PostLoader";
import PostItem from "../../../../components/post/item/PostItem";
import {auth, firestore} from "../../../../firebase/init";
import useCommunity from "../../../../hooks/useCommunity"
import usePosts from "../../../../hooks/usePosts";
import { getErrorMessage } from "../../../../utils/errorTyping";

const PostPage: React.FC = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const { community, pid } = router.query;
    const { communityStateValue } = useCommunity();
    const {
      postStateValue,
      setPostStateValue,
      onDeletePost,
      loading,
      setLoading,
      onVote,
    } = usePosts(communityStateValue.currentCommunity);
  
    const fetchPost = async () => {
  
      setLoading(true);
      try {
        const postDocRef = doc(firestore, "posts", pid as string);
        const postDoc = await getDoc(postDocRef);
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
        }));
      } catch (error: unknown) {
        let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);

      getErrorMessage({ message });
      }
      setLoading(false);
    };
    React.useEffect(() => {
      const { pid } = router.query;
  
      if (pid && !postStateValue.selectedPost) {
        fetchPost();
      }
    }, [router.query, postStateValue.selectedPost]);
  
    return (
      <PageContent>
        <>
          {loading ? (
            <PostLoader />
          ) : (
            <>
              {postStateValue.selectedPost && (
                <>
                  <PostItem
                    post={postStateValue.selectedPost}
                    onVote={onVote}
                    onDeletePost={onDeletePost}
                    userVoteValue={
                      postStateValue.postVotes.find(
                        (item) => item.postId === postStateValue.selectedPost!.id
                      )?.voteValue
                    }
                    userIsCreator={
                      user?.uid === postStateValue.selectedPost.creatorId
                    }
                    router={router}
                  />
                  <Comments
                    user={user}
                    community={community as string}
                    selectedPost={postStateValue.selectedPost}
                  />
                </>
              )}
            </>
          )}
        </>
        <>
          <AboutCommunity
            communityData={
              communityStateValue.currentCommunity
            }
            loading={loading}
          />
        </>
      </PageContent>
    );
  };
  export default PostPage;