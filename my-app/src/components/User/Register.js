import React, { useState, useRef, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/20/solid";
import { default as EyeOffIcon } from "@heroicons/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
// import emailjs from "emailjs-com";
import emailjs from "@emailjs/browser";

const Register = () => {
  const form = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    // preventDefault();

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      fullName: name,
      email: email,
      password: password,
    });

    let response = await fetch("http://localhost:3001/auth/user/signup", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();

    if (response.ok) {
      toast.success("Register successful. Please verify your email.");
      // navigate("/");
    } else {
      toast.error("Register failed");
    }
  };
  useEffect(() => emailjs.init("oiOaBMzMyj7RWU6Qj"), []);

  const sendEmail = async (e) => {
    e.preventDefault();

    const serviceId = "service_gdxc0up";
    const templateId = "template_30c58qy";
    try {
      await emailjs.send(serviceId, templateId, {
        name: name,
        recipient: email,
        message: `Thank You For Joining US`,
      });
      toast.success("Please verify your email");
      handleLogin();
      navigate("/user/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md border-grey border-3xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Register User
          </h2>
          <form ref={form}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="from_name"
                  type="text"
                  autoComplete="email"
                  value={name}
                  ref={nameRef}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="from_email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  ref={emailRef}
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
            <p className="mt-2 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/user/login" className="text-indigo-600 underline">
                Login
              </Link>
            </p>
            <div className="mt-6 flex justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => sendEmail(e)}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
