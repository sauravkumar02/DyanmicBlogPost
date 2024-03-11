import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/20/solid";
import { default as EyeOffIcon } from "@heroicons/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("email", email);
    let headerList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodContent = JSON.stringify({
      email: email,
      password: password,
    });

    let response = await fetch("http://localhost:3001/auth/user/login", {
      method: "POST",
      body: bodContent,
      headers: headerList,
    });

    let data = await response.json();
    if (response.ok) {
      toast.success("Login successful");
      localStorage.setItem("token", data.token);
      navigate("/user/dashboard");
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <div className="w-full max-w-md border-grey border-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          User Login
        </h2>
        <form>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <div>
              <Link
                to="/reset"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot Password?
              </Link>
            </div>
            <div>
              <Link
                to="/register"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
