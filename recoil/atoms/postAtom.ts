import {atom} from "recoil"
import { PostState } from "../interfaces/IPost";

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
  postsCache: {},
  postUpdateRequired: true,
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});
