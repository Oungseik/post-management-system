import React, { createContext } from "react";
import type { PostWithUserInfo } from "../types";

type PostsContext = { posts: PostWithUserInfo[], setPosts: React.Dispatch<React.SetStateAction<PostWithUserInfo[]>> }

const PostsContext = createContext<PostsContext>({
  posts: [],
  setPosts: () => { }
})

export { PostsContext };
