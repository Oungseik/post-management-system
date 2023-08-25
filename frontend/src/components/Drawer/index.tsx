import type { ReactNode } from "react";

import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

import AddPostBox from "../AddPostBox";


type Props = {
  children: ReactNode,
}

function Menu({ children }: Props) {
  const { user, setUser } = useContext(UserContext);


  return (
    <div className="sm:flex sm:flex-row-reverse justify-between">
      <input id="menu" type="checkbox" className="peer hidden menu-peer" />
      <div className="flex-1">
        <nav className="sticky top-4">
          <label htmlFor="menu" aria-label="menu" role="button" className="block w-fit ml-auto md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="block ml-auto mr-4 shadow text-slate-800 active:shadow-none" width="36" height="36" viewBox="0 0 1024 1024"><path fill="currentColor" d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z" /></svg>
          </label>
        </nav>
        {children}

      </div>
      <div className="menu fixed sm:sticky w-screen h-screen sm:w-80 sm:h-screen sm:visible top-0 left-0 invisible peer-checked:visible grow-0">
        <label htmlFor="menu" className="absolute block w-full h-full bg-slate-800/60 sm:hidden"></label>
        <div className="relative slider -translate-x-full sm:translate-x-0 sm:transition-none transition-all duration-300 flex flex-col bg-gray-200 justify-between z-10 p-4 w-80 h-full">

          <div className="text-center">
            <p className="text-2xl font-bold">{user && user.username}</p>
            <p>{user && user.email}</p>
            <div className="mt-4">
            {user && <AddPostBox />}
            </div>
          </div>

          {!user?.id && <Link to="/login" className="text-center w-full bg-sky-600 py-2 text-slate-100">LOGIN</Link>}
          {user?.id && <button onClick={() => { setUser(null) }} className="text-center w-full bg-sky-600 py-2 text-slate-100">LOG OUT</button>}

        </div>
      </div>
    </div>
  )
}

export default Menu;
