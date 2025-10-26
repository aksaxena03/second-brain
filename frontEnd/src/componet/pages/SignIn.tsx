import axios from "axios";
import { Brain as BrainLogo } from "../Logo/Brain";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import "../../styles/gradient.css"; // For animated background

const Backend_url = import.meta.env.VITE_Backend_url




export default function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [done, setDone] = useState<boolean>(true);

  async function signin() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      setDone(true);

      if (username && username.trim() !== "") {
        const response = await axios.post(`${Backend_url}/api/v1/signin`, {
          username,
          password,
        });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);

        if (username !== "" && password !== "") {
          navigate("/Dash");
        } else {
          alert("Invalid data");
        }
      } else {
        setDone(false);
        throw new Error();
      }
    } catch {
      setDone(false);
      alert("Invalid username or password");
    }
  }

  return (
    <div className="animated-gradient min-h-screen flex items-center justify-center px-4">
      <div className=" backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.5)] border border-cyan-400 w-full max-w-md">
        {/* Logo & Title */}
        <div className="flex items-center justify-center">
          <BrainLogo size="size-16" />
          <h2 className="ml-2 text-cyan-300 text-4xl font-extrabold tracking-tight">
            Second Brain
          </h2>
        </div>
        <h2 className="mt-6 text-center text-lg font-semibold text-white">
          Sign in to your account
        </h2>

        {/* Form */}
        <form className="mt-8 space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="UserName"
              className="block text-sm font-medium text-white"
             >
              Username
            </label>
            <input
              ref={usernameRef}
              id="UserName"
              name="UserName"
              type="text"
              required
              className="mt-2 block w-full rounded-md bg-black/30 border border-cyan-400 px-3 py-2 text-white placeholder-cyan-200 focus:border-pink-400 focus:ring-pink-400 outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-pink-300 hover:text-pink-200"
              >
                Forgot password?
              </a>
            </div>
            <input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 block w-full rounded-md bg-black/30 border border-cyan-400 px-3 py-2 text-white placeholder-cyan-200 focus:border-pink-400 focus:ring-pink-400 outline-none"
              placeholder="Enter your password"
            />
            {!done && (
              <div className="p-2 mt-3 text-sm text-red-400 bg-red-900/30 rounded-md border border-red-500">
                Wrong username or password
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={signin}
            variant="primary"
            text="Sign In"
            className="w-full rounded-md  bg-cyan-500 py-2 font-semibold text-white shadow-lg hover:bg-cyan-400  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 transition"
          />
        </form>

        {/* Not a member */}
        <p className="mt-6 text-center text-sm text-pink-200">
          Not a member?{" "}
          <a
            href="/signup"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
