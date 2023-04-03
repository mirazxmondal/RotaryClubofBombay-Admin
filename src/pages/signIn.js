import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/data");
        console.log(auth.currentUser.uid);
      }
    } catch (error) {
      //   toast.error("Bad user credentials");
      console.log(error);
    }
  }
  return (
    <section>
      <h1 className="text-3xl mt-6 font-bold text-center">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ml-4 mt-4">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
            alt="Sign In"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              type="email"
              className="w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border border-gray-700 rounded transition ease-in-out"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />
            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition ease-in-out"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase shadow-md rounded hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 "
            >
              {" "}
              Admin Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
