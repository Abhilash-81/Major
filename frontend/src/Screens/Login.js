import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { checkValidPassword } from "../utils/validate.js";
import { toast } from "react-toastify";

const Login = () => {
  const [errMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const errMessage = checkValidPassword(passwordRef.current.value);
    // setErrorMessage(errMessage);
    try {
      const userData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        userData
      );
      console.log("Login successful:", response?.data);
      toast.success("Login successful!", {
        autoClose: 3000,
      });

      // navigate("/users/" + response?.data?.data?.data?.username);
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed.";
      toast.error(errorMessage, {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <AiOutlineMail className="text-gray-600 mr-2" />
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-semibold mb-2"
            ></label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              className="w-full p-2 pl-8 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <AiOutlineLock className="text-gray-600 mr-2" />
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-semibold mb-2"
            ></label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              className="w-full p-2 pl-8 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="text-red-600 font-bold text-lg ">{errMessage}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Log In
          </button>
          <Link to="/api/v1/signup">
            <h3 className="p-2">
              Do Not have an Account? <b>Signup</b>
            </h3>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
