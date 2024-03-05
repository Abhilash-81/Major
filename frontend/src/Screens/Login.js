import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { addUser } from "../utils/userSlice";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [errMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        userData
      );
      const { data, token } = response?.data?.data;
      const { username, _id, image } = data;
      dispatch(addUser({ username, token, _id, image }));
      toast("Login Successful");
      navigate("/users/" + username);
    } catch (error) {
      const errorMessage =
        error.response?.data?.err?.message || "Login failed.";
      setErrorMessage(errorMessage);
      toast(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <AiOutlineMail className="text-gray-600 mr-2" />
            <label htmlFor="email" className="sr-only">
              Email
            </label>
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
            <label htmlFor="password" className="sr-only">
              Password
            </label>
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
          <p className="text-red-500 font-bold text-lg mb-4">{errMessage}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Log In
          </button>
          <Link to="/api/v1/signup" className="block text-center mt-4">
            <span className="text-blue-500">Do Not have an Account?</span>{" "}
            <b>Signup</b>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
