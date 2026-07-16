import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-amber-300">
      <div className="max-w-6xl mx-auto flex items-center justify-center h-full gap-4">
        <div className="flex-1 w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-5">
            <div className="flex justify-center px-10 pb-5 pt-10 items-center bg-white w-fit mx-auto rounded-2xl">
              <Image
                src="/images/logo2.png"
                loading="eager"
                alt="Logo"
                width={300}
                height={300}
                className="mb-4 mx-auto w-auto h-auto"
              />
            </div>

            <h1 className="text-5xl font-bold text-white">
              Welcome to Chatterbox!!
            </h1>
            <p className="text-lg font-semibold text-amber-700">
              Join the conversation and connect with others...
            </p>
            <p className="text-white text-sm">
              Experience lightning-fast communication, secure conversations, and
              effortless collaboration all in one place.
            </p>
            <p className="text-white text-sm">
              Sign in to ChatterBox to continue your conversations, share ideas
              instantly, and stay connected with friends, family, and your
              team—anytime, anywhere.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full h-full flex items-end justify-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
