import { useEffect, useContext } from "react";
import { PostsContext } from "../../../contexts/PostsContext";

import Container from "../../Container";
import PostItem from "./PostItem";
import Drawer from "../../Drawer";

import { DOMAIN } from "../../../lib/config";

function Posts({ }) {
  const { posts, setPosts } = useContext(PostsContext);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${DOMAIN}/api/posts?user=true`);
      const { posts } = await response.json();
      setPosts(posts);
    })();
  }, [])


  return (
    <Drawer>
      <Container>
        <h1 className="text-2xl text-center font-bold my-4 sm:text-4xl">Posts</h1>
        <ul className="flex flex-col divide-y-2">
          {posts.map(post => <PostItem post={post} key={post.title} />)}
        </ul>
      </Container>
    </Drawer>
  )
}

export default Posts;
