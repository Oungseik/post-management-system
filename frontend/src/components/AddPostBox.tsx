import { useContext } from "react";
import ModalBox from "./ModalBox";
import { UserContext } from "../contexts/UserContext";
import { PostsContext } from "../contexts/PostsContext";

import { DOMAIN } from "../lib/config";
import { toast } from "react-toastify";

function AddPostButton({ onClick }: { onClick: () => void }) {

  return (
    /** @ts-ignore */
    <button onClick={onClick} className="text-sky-700">
      Add Post
    </button>
  )
}

function LoginBox() {
  const { posts, setPosts } = useContext(PostsContext);
  const { user } = useContext(UserContext);

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title");
    const content = formData.get("content");


    try {
      const response = await fetch(`${DOMAIN}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bear ${user?.token}`
        },
        body: JSON.stringify({ title, content }),
      })
      const data: Record<string, any> = await response.json();

      if (response.status === 201) {
        setPosts([data.post, ...posts]);
        (e.target as HTMLFormElement).reset();
        (document.getElementById("modal_box") as HTMLDialogElement).close();
      } else {
        toast(data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  }



  return (
    <>
      {/* @ts-ignore */}
      <ModalBox OpenButton={() => <AddPostButton onClick={() => window.modal_box.showModal()} />} >
        <>
          <form method="dialog" onSubmit={addPost} >
            <div className="p-8 flex flex-col gap-4 w-80 sm:w-[520px] md:w-[640px]">
              <h2 className="text-2xl text-slate-700 font-bold">Add Post</h2>
              <input type="text" name="title" required placeholder="Title" className="border-2 border-slate-200 p-2 rounded-md" />
              <textarea name="content" required placeholder="Content" rows={6} className="border-2 border-slate-200 p-2 rounded-md" />
              <button className="bg-sky-600 text-slate-100 p-2 rounded-md">Submit</button>
            </div>
          </form>
        </>
      </ModalBox>
    </>
  )
}

export default LoginBox;
