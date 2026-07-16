"use client";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const AuthForm = () => {
  return (
    <div className="w-120 h-[90%] bg-white rounded-t-[40px] mx-auto px-10 py-10 shadow-2xl flex flex-col">
      {/* Logo */}
      <div className="flex flex-col items-center">


        <h2 className="text-4xl font-bold text-gray-900">Welcome Back</h2>

        <p className="text-gray-500 mt-2 text-center">
          Sign in to continue to{" "}
          <span className="font-semibold">Chatterbox</span>
        </p>
      </div>

      {/* Form */}
      <form className="mt-10 space-y-5">
        <input
          type="text"
          placeholder="Username"
          className="w-full h-14 rounded-full border border-gray-200 px-6 outline-none text-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full h-14 rounded-full border border-gray-200 px-6 outline-none text-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-amber-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full h-14 rounded-full bg-gradient-to-r from-amber-300 to-yellow-300 text-white font-semibold text-lg hover:scale-[1.02] transition duration-300 shadow-lg"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-gray-400 font-medium">OR</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-3 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <FcGoogle size={22} />
          <span className="font-medium text-gray-700">Google</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-3 h-12 rounded-full bg-[#1877F2] text-white hover:bg-[#166FE5] transition"
        >
          <FaFacebookF />
          <span className="font-medium">Facebook</span>
        </button>
      </div>

      {/* Bottom */}
      <p className="text-center text-gray-500 mt-auto pt-10">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-amber-600 font-semibold hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
