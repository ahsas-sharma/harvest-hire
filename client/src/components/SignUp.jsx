import { useState } from "react";
import axios from "axios";

import { useAuth } from "./AuthContext";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CONFIG from "../config/config";

const notify = () =>
  toast.success(
    "Registration successful! Please login with your email and password."
  );

export default function SignUp() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    phoneNo: "",
    govtID: "",
  });

  function onChangeHandler(e) {
    console.log(e.target.value);
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  async function userRegister(e) {
    try {
      e.preventDefault();
      let response = await axios.post(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/user/register`,
        newUser
      );

      console.log(response.data);
      notify();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      let errorString = "";

      if (error.response.data.errors) {
        //express validator :: errors []
        error.response.data.errors.forEach((err) => {
          errorString += `${err.msg} for ${err.path}`;
        });
      } else {
        //direct error :: string
        errorString = error.response.data;
      }

      toast.error(errorString);
    }
  }
  return (
    <>
      <Toaster />
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up for a new account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Provide your details below
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={newUser.email}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 px-2"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={newUser.password}
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="current-password"
                        value={newUser.name}
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phoneNo"
                        name="phoneNo"
                        type="number"
                        required
                        value={newUser.phoneNo}
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="govtID"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Government ID
                    </label>
                    <div className="mt-2">
                      <input
                        id="govtID"
                        name="govtID"
                        type="text"
                        required
                        value={newUser.govtID}
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      onClick={userRegister}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1646201272470-c5f5ac43d6a1?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
