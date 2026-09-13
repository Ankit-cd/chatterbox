import React from "react";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center overflow-hidden bg-[#ededed] px-6">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-[120px]" />

        <div className="absolute left-[18%] top-[22%] h-2 w-2 rounded-full bg-amber-400/30" />
        <div className="absolute right-[20%] top-[28%] h-1.5 w-1.5 rounded-full bg-amber-400/40" />
        <div className="absolute bottom-[22%] left-[25%] h-1.5 w-1.5 rounded-full bg-amber-400/30" />
        <div className="absolute bottom-[30%] right-[24%] h-2 w-2 rounded-full bg-amber-400/20" />
      </div>

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">

        <div className="relative mb-8">

          <div className="absolute inset-0 scale-125 rounded-[32px] bg-amber-400/10 blur-2xl" />
        </div>

      

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Welcome to{" "}
          <span className="text-amber-500">
            Chatterbox
          </span>
        </h1>

        <p className="mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          Select a conversation from the sidebar to start chatting.
          Your conversations and messages will appear here.
        </p>

        <div className="group mt-8 flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
            <MessageCircle
              size={17}
              strokeWidth={2}
              className="text-amber-500"
            />
          </div>

          <span className="text-sm font-medium text-gray-500">
            Choose someone to start a conversation
          </span>

          <ArrowRight
            size={15}
            className="text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-500"
          />

        </div>

      </div>
    </div>
  );
};

export default EmptyState;

