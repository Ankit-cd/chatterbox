"use client";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Variant = "Login" | "Register";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("Login");
  const [isloading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "Login") {
      setVariant("Register");
    } else {
      setVariant("Login");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      if (variant === "Register") {
        const response = await axios.post("/api/register", data);

        // Registration successful
        toast.success(response.data?.message || "Registration successful!");

        // Optional: switch to Login after registration
        setVariant("Login");
      }

      if (variant === "Login") {
        const callback = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged In!!");
          console.log(data);
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Handle duplicate email
        if (error.response?.status === 409) {
          toast.error(error.response.data?.message || "Email already exists");
        } else {
          toast.error(error.response?.data?.message || "Something went wrong!");
        }
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const socialActions = async (action: string) => {
    setIsLoading(true);

    try {
      await signIn(action, {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };
  return (
    <div className="w-120 h-[90%] overflow-y-scroll no-scrollbar bg-white rounded-t-[40px] mx-auto px-10 py-10 shadow-2xl flex flex-col">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-900">Welcome Back</h2>

        <p className="text-gray-500 mt-2 text-center">
          Sign in to continue to{" "}
          <span className="font-semibold">Chatterbox</span>
        </p>
      </div>

      {/* Form */}
      <form className="mt-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {variant === "Register" && (
          <Input
            id="name"
            type="text"
            placeholder="Full Name"
            register={register}
            errors={errors}
            disabled={isloading}
          />
        )}
        <Input
          id="email"
          type="email"
          placeholder="Email Address"
          register={register}
          errors={errors}
          disabled={isloading}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
          disabled={isloading}
        />
        {variant === "Login" && (
          <div className="flex justify-end">
            <p className="text-sm text-amber-600 hover:underline">
              Forgot Password?
            </p>
          </div>
        )}

        <Button disabled={isloading} fullWidth type="submit">
          {variant === "Login" ? "Sign In" : "Register"}
        </Button>
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
          onClick={() => socialActions("google")}
          type="button"
          className="flex items-center justify-center gap-3 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <FcGoogle size={22} />
          <span className="font-medium text-gray-700">Google</span>
        </button>

        <button
          onClick={() => socialActions("github")}
          type="button"
          className="cursor-pointer flex items-center justify-center gap-3 h-12 rounded-full bg-black text-white hover:bg-black transition"
        >
          <FaGithub />
          <span className="font-medium">Github</span>
        </button>
      </div>

      {/* Bottom */}
      <p className="text-center text-gray-500 mt-auto pt-10">
        {variant === "Login"
          ? "New to Chatterbox? "
          : "Already have an account? "}
        <span
          onClick={toggleVariant}
          className="text-amber-600 cursor-pointer font-semibold hover:underline"
        >
          {variant === "Login" ? "Sign Up" : "Sign In"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
