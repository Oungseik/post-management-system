import { Link, useNavigate } from "react-router-dom";
import { DOMAIN } from "../../../lib/config";
import { toast } from "react-toastify";

function RegisterView() {
  const navigate = useNavigate();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    try {
      const response = await fetch(`${DOMAIN}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password, passwordConfirm }),
      })
      const data: Record<string, any> = await response.json();

      if (response.status === 201) {
        (e.target as HTMLFormElement).reset();
        navigate("/login");
      } else {
        if (data.msg) return toast(data.msg);
        toast("Please make sure that username is at least 4 characters, password is at least 8 characters long and contains uppercase, lowercase and number.")
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={register}>
        <div className="p-8 flex flex-col gap-4 w-80 sm:w-96 mx-auto">
          <h2 className="text-2xl text-slate-700 font-bold">Register</h2>
          <input type="username" name="username" required placeholder="Username" className="border-2 border-slate-200 p-2 rounded-md" />
          <input type="email" name="email" required placeholder="Email" className="border-2 border-slate-200 p-2 rounded-md" />
          <input type="password" name="password" required placeholder="Password" className="border-2 border-slate-200 p-2 rounded-md" />
          <input type="password" name="passwordConfirm" required placeholder="Confirm Password" className="border-2 border-slate-200 p-2 rounded-md" />
          <button className="bg-sky-600 text-slate-100 p-2 rounded-md">Submit</button>
          <p>Already have an account? <Link to="/login" className="text-sky-600 hover:underline">login</Link></p>
        </div>
      </form>
    </>
  )
}

export default RegisterView;
