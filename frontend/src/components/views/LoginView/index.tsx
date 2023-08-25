import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

import { DOMAIN } from "../../../lib/config";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(`${DOMAIN}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      })
      const data: Record<string, any> = await response.json();

      if (response.status === 200) {
        (e.target as HTMLFormElement).reset();
        setUser({ ...data.user, token: data.token });
        navigate("/");
      } else {
        toast(data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={login}>
        <div className="p-8 flex flex-col gap-4 w-80 sm:w-96 mx-auto">
          <h2 className="text-2xl text-slate-700 font-bold">Login</h2>
          <input type="email" name="email" required placeholder="Email" className="border-2 border-slate-200 p-2 rounded-md" />
          <input type="password" name="password" required placeholder="Password" className="border-2 border-slate-200 p-2 rounded-md" />
          <button className="bg-sky-600 text-slate-100 p-2 rounded-md">Submit</button>
          <p>Not have an account? <Link to="/register" className="text-sky-600 hover:underline">register</Link></p>
        </div>
      </form>
    </>
  )

}

export default Login;
