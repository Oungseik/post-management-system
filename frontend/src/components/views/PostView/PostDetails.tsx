import { useContext, useState } from "react";
import ModalBox from "../../ModalBox";
import { UserContext } from "../../../contexts/UserContext";
import { DOMAIN } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PostContext } from "../../../contexts/PostContext";
import { PostWithUserInfo } from "../../../types";

function PostDetailsOpenButton() {
  return (
    <button
      className="bg-sky-600 text-slate-100 p-2 shadow-md active:shadow-none rounded-md disabled:cursor-not-allowed disabled:bg-slate-300"
      onClick={() => {
        // @ts-ignore
        window.post_details_modal.showModal();
      }}
    >
      details
    </button>
  );
}

function PostDetails() {
  const { post, setPost }: { post: PostWithUserInfo, setPost: React.Dispatch<React.SetStateAction<PostWithUserInfo>> } = useContext(PostContext) as any;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  async function updatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title");
    const content = formData.get("content");

    if (user?.id !== post?.user.id) return;
    try {
      const response = await fetch(
        `${DOMAIN}/api/posts/${post?.id}?user=true`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bear ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        toast("You updated the post!");
        setPost(data.post);
      } else {
        toast(data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deletePost(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (user?.id !== post?.user.id) return;
    const response = await fetch(`${DOMAIN}/api/posts/${post?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bear ${user?.token}`,
      },
    });

    if (response.status === 204) {
      navigate("/");
      toast("You deleted a post.");
    } else {
      toast("Something went wrong when delete post.");
    }
  }

  return (
    <>
      <ModalBox
        OpenButton={() => <PostDetailsOpenButton />}
        dialogId="post_details_modal"
      >
        <>
          <form method="dialog" onSubmit={updatePost}>
            <div className="p-8 flex flex-col gap-4 w-80 sm:w-[520px] md:w-[640px]">
              <h2 className="text-2xl text-slate-700 font-bold">
                Post Details
              </h2>
              <p className="text-medium">
                This post is written by {post?.user.username} (
                {post?.user.email})
              </p>
              <input
                type="text"
                name="title"
                required
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                readOnly={user?.id !== post.user.id}
                className="border-2 border-slate-200 p-2 rounded-md read-only:text-slate-700 read-only:focus-within:outline-none"
              />
              <textarea
                name="content"
                required
                placeholder="Content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                readOnly={user?.id !== post.user.id}
                rows={6}
                className="border-2 border-slate-200 p-2 rounded-md read-only:text-slate-700 read-only:focus-within:outline-none"
              />
              <button
                className="bg-sky-600 text-slate-100 p-2 shadow-md active:shadow-none rounded-md disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={user?.id !== post.user.id}
              >
                Submit
              </button>
            </div>
          </form>

          <div className="p-8 pt-0 text-right">
            <button
              onClick={deletePost}
              className="bg-red-600 text-slate-100 p-2 shadow-md active:shadow-none rounded-md disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={user?.id !== post.user.id}
            >
              Delete Post
            </button>
          </div>
        </>
      </ModalBox>
    </>
  );
}

export default PostDetails;
