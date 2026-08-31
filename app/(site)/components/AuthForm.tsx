"use client";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "Register") {
      //Axios Register
      axios.post('/api/register',data)
      .catch(()=>toast.error('Something Went Wrong !!'))
      .finally(()=>setIsLoading(false))
    }

    if (variant === "Login") {
      //NextAuth Signin
      signIn('credentials',{
        ...data,
        redirect:false
      })
      .then((callback)=>{
        if(callback?.error){
          toast.error('Invalid Credentials')
        }

        if(callback?.ok){
          toast.success('Logged In!!')
        }
      })

    }
  };

  const socialActions = (action: string) => {
    setIsLoading(true);

    //NextAuth Social Sign In
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
            <p
              className="text-sm text-amber-600 hover:underline"
            >
              Forgot Password?
            </p>
          </div>
        )}

        <Button
        disabled={isloading}
        fullWidth
        type="submit"
        >
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
