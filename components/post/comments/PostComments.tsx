import React from 'react';
import {
    Box,
    Flex,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Text,
  } from "@chakra-ui/react";
import {User} from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    increment,
    orderBy,
    query,
    serverTimestamp,
    where,
    writeBatch,
  } from "firebase/firestore";
  import { useSetRecoilState } from "recoil";
import { authModalState } from '../../../recoil/atoms/authModalAtom';
import { Post, postState } from '../../../recoil/atoms/postAtom';
import {firestore} from "../../../firebase/init"
import CommentItem, { Comment } from './CommentItem';
import CommentInput from './Input';

type CommentsProps = {
    user?: User | null;
    selectedPost: Post;
    community: string;
  };
  
  const Comments: React.FC<CommentsProps> = ({
    user,
    selectedPost,
    community,
  }) => {
    const [comment, setComment] = React.useState("");
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [commentFetchLoading, setCommentFetchLoading] = React.useState(false);
    const [commentCreateLoading, setCommentCreateLoading] = React.useState(false);
    const [deleteLoading, setDeleteLoading] = React.useState("");
    const setAuthModalState = useSetRecoilState(authModalState);
    const setPostState = useSetRecoilState(postState);
  
    const onCreateComment = async (comment: string) => {
      if (!user) {
        setAuthModalState({ open: true, view: "login" });
        return;
      }
  
      setCommentCreateLoading(true);
      try {
        const batch = writeBatch(firestore);
  
        const commentDocRef = doc(collection(firestore, "comments"));
        batch.set(commentDocRef, {
          postId: selectedPost.id,
          creatorId: user.uid,
          creatorDisplayText: user.email!.split("@")[0],
          creatorPhotoURL: user.photoURL,
          communityId: community,
          text: comment,
          postTitle: selectedPost.title,
          createdAt: serverTimestamp(),
        } as Comment);

        batch.update(doc(firestore, "posts", selectedPost.id), {
          numberOfComments: increment(1),
        });
        await batch.commit();
  
        setComment("");
        const { id: postId, title } = selectedPost;
        setComments((prev) => [
          {
            id: commentDocRef.id,
            creatorId: user.uid,
            creatorDisplayText: user.email!.split("@")[0],
            creatorPhotoURL: user.photoURL,
            communityId: community,
            postId,
            postTitle: title,
            text: comment,
            createdAt: {
              seconds: Date.now() / 1000,
            },
          } as Comment,
          ...prev,
        ]);
        setPostState((prev) => ({
          ...prev,
          selectedPost: {
            ...prev.selectedPost,
            numberOfComments: prev.selectedPost?.numberOfComments! + 1,
          } as Post,
          postUpdateRequired: true,
        }));
      } catch (error: any) {
        throw new Error(error)
      }
      setCommentCreateLoading(false);
    };
  
    const onDeleteComment = React.useCallback(
      async (comment: Comment) => {
        setDeleteLoading(comment.id as string);
        try {
          if (!comment.id) throw "Comment has no ID";
          const batch = writeBatch(firestore);
          const commentDocRef = doc(firestore, "comments", comment.id);
          batch.delete(commentDocRef);
  
          batch.update(doc(firestore, "posts", comment.postId), {
            numberOfComments: increment(-1),
          });
  
          await batch.commit();
  
          setPostState((prev) => ({
            ...prev,
            selectedPost: {
              ...prev.selectedPost,
              numberOfComments: prev.selectedPost?.numberOfComments! - 1,
            } as Post,
            postUpdateRequired: true,
          }));
  
          setComments((prev) => prev.filter((item) => item.id !== comment.id));
        } catch (error: any) {
          throw new Error(error)
        }
        setDeleteLoading("");
      },
      [setComments, setPostState]
    );
  
    const getPostComments = async () => {
      try {
        const commentsQuery = query(
          collection(firestore, "comments"),
          where("postId", "==", selectedPost.id),
          orderBy("createdAt", "desc")
        );
        const commentDocs = await getDocs(commentsQuery);
        const comments = commentDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(comments as Comment[]);
      } catch (error: any) {
        console.log("getPostComments error", error.message);
      }
      setCommentFetchLoading(false);
    };
  
    React.useEffect(() => {
      getPostComments();
    }, []);
  
    return (
      <Box bg="white" p={2} borderRadius="0px 0px 4px 4px">
        <Flex
          direction="column"
          pl={10}
          pr={4}
          mb={6}
          fontSize="10pt"
          width="100%"
        >
          <CommentInput
            comment={comment}
            setComment={setComment}
            loading={commentCreateLoading}
            user={user}
            onCreateComment={onCreateComment}
          />
        </Flex>
        <Stack spacing={6} p={2}>
          {commentFetchLoading ? (
            <>
              {[0, 1, 2].map((item) => (
                <Box key={item} padding="6" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={2} spacing="4" />
                </Box>
              ))}
            </>
          ) : (
            <>
              {!!comments.length ? (
                <>
                  {comments.map((item: Comment) => (
                    <CommentItem
                      key={item.id}
                      comment={item}
                      onDeleteComment={onDeleteComment}
                      isLoading={deleteLoading === (item.id as string)}
                      userId={user?.uid}
                    />
                  ))}
                </>
              ) : (
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  borderTop="1px solid"
                  borderColor="gray.100"
                  p={20}
                >
                  <Text fontWeight={700} opacity={0.3}>
                    No Comments Yet
                  </Text>
                </Flex>
              )}
            </>
          )}
        </Stack>
      </Box>
    );
  };
  export default Comments;