import type { PostWithUserInfo } from "../../../types";
import Container from "../../Container";
import Drawer from "../../Drawer";
import PostDetails from "./PostDetails";
import { PostContext } from "../../../contexts/PostContext";

import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function PostView() {
  const [post, setPost] = useState(useLoaderData() as PostWithUserInfo);

  return (
    <section className="text-slate-800">
      <Drawer>
        <Container>
          <PostContext.Provider value={{ post, setPost }}>
            <div className="py-4 sm:py-8">
              <h2 className="text-2xl sm:text-3xl font-bold ">{post.title}</h2>
              <PostDetails />
              <p>by {post.user.username}</p>
            </div>
            <p>{post.content}</p>
          </PostContext.Provider >
        </Container>
      </Drawer>
    </section >
  )
}

export default PostView;
