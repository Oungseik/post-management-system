import type { PostWithUserInfo } from "../../../types";

import { Link } from "react-router-dom";

type Props = {
  post: PostWithUserInfo
}

function Post({ post }: Props) {

  return (
    <li className="text-slate-800 hover:text-blue-800 px-4 py-2 sm:px-8 sm:py-4 transition duration-300 post-item hover:bg-slate-100">
      <Link to={`posts/${post.id}`}>
        <h2 className="text-xl sm:text-2xl font-bold ">{post.title}</h2>
        <p>by {post.user.username}</p>
      </Link>
    </li>
  )
}

export default Post;
