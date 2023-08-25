import { useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { PostsContext } from "./contexts/PostsContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { User, PostWithUserInfo } from "./types";

import PostsListView from "./components/views/PostsListView";
import LoginView from "./components/views/LoginView";
import RegisterView from "./components/views/RegisterView";
import Post from "./components/views/PostView";

import { DOMAIN } from "./lib/config";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PostsListView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/posts/:postId" loader={async ({ params }) => {
        const response = await fetch(`${DOMAIN}/api/posts/${params.postId}?user=true`);
        return await response.json();
      }} element={<Post />} />
    </>
  )
);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostWithUserInfo[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PostsContext.Provider value={{ posts, setPosts }}>
        <ToastContainer />
        <RouterProvider router={router} />
      </PostsContext.Provider>
    </UserContext.Provider>
  )
}

export default App
