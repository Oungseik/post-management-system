import React, { createContext } from "react";
import type { PostWithUserInfo } from "../types";

type PostContext = { post: PostWithUserInfo | null, setPost: React.Dispatch<React.SetStateAction<PostWithUserInfo>> }

const PostContext = createContext<PostContext>({
  post: null,
  setPost: () => { }
})

export { PostContext };
