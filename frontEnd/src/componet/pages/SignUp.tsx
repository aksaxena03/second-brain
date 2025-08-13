import { useRef } from "react";
import axios from "axios";
import { Brain as BrainLogo } from "../Logo/Brain";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import "../../styles/gradient.css"; // For animated background

const Backend_url = import.meta.env.VITE_Backend_url


export default function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (username && username.trim() !== "") {
        await axios.post(`${Backend_url}/api/v1/signup`, { username, password });
        alert("Signup successful");
        navigate("/signin");
      } else {
        alert("Invalid username");
      }
    } catch {
      alert("User already exists");
    }
  }

  return (
    <div className="animated-gradient min-h-screen flex items-center justify-center px-4">
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(255,0,255,0.5)] border border-pink-400 w-full max-w-md">
        {/* Logo & Title */}
        <div className="flex items-center justify-center">
          <BrainLogo size="size-16" />
          <h2 className="ml-2 text-pink-400 text-4xl font-extrabold tracking-tight">
            Second Brain
          </h2>
        </div>
        <h2 className="mt-6 text-center text-lg font-semibold text-white">
          Sign up to your account
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
              className="mt-2 block w-full rounded-md bg-black/30 border border-pink-400 px-3 py-2 text-white placeholder-pink-200 focus:border-cyan-400 focus:ring-cyan-400 outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 block w-full rounded-md bg-black/30 border border-pink-400 px-3 py-2 text-white placeholder-pink-200 focus:border-cyan-400 focus:ring-cyan-400 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={signup}
            variant="primary"
            text="Sign Up"
            className="w-full rounded-md mx-auto  bg-pink-500 px-3 py-2 font-semibold text-white shadow-lg hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 transition"
          />
        </form>

        {/* Already a member */}
        <p className="mt-6 text-center text-sm text-pink-200">
          Already a member?{" "}
          <a
            href="/signin"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
