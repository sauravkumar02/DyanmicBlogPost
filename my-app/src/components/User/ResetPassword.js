import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => emailjs.init("oiOaBMzMyj7RWU6Qj"), []);

  const generateToken = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    const values = new Uint32Array(20);
    window.crypto.getRandomValues(values);

    for (let i = 0; i < values.length; i++) {
      token += charset[values[i] % charset.length];
    }

    return token;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const token = generateToken();

      await axios.post("http://localhost:3001/auth/user/reset-password", {
        email,
        token,
      });
      sendEmail(token);
    } catch (error) {
      toast.error("Error sending password reset email");
      console.error("Error sending password reset email:", error);
    }
  };

  const sendEmail = async (token) => {
    const serviceId = "service_gdxc0up";
    const templateId = "template_30c58qy";
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    try {
      await emailjs.send(serviceId, templateId, {
        name: "Hey Buddy !",
        recipient: email,
        message: `Please click on the following link to reset your password: ${resetUrl}`,
      });
      toast.success("Please verify your email");
    } catch (error) {
      toast.error(error);
    } finally {
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
