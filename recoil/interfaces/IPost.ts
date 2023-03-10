import { Timestamp } from "firebase/firestore";

export type Post = {
    id: string;
    communityId: string;
    communityImageURL?: string;
    userDisplayText: string;
    creatorId: string;
    title: string;
    body: string;
    numberOfComments: number;
    voteStatus: number;
    currentUserVoteStatus?: {
      id: string;
      voteValue: number;
    };
    imageURL?: string;
    postIdx?: number;
    createdAt?: Timestamp;
    editedAt?: Timestamp;
  };
  
  export type PostVote = {
    id?: string;
    postId: string;
    communityId: string;
    voteValue: number;
  };
  
export interface PostState {
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
    postsCache: {
      [key: string]: Post[];
    };
    postUpdateRequired: boolean;
  }
  