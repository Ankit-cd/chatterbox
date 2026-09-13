"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";

import { User } from "@/generated/prisma/client";

interface DesktopSidebarProps {
  currentUser: User;
}
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  console.log({ currentUser });

  return (
    <aside
      className={`
        fixed
        inset-y-0
        left-0
        z-50
        hidden
        md:flex
        flex-col
        border-r
        border-gray-100
        bg-white
        shadow-[4px_0_20px_rgba(0,0,0,0.03)]
        transition-all
        duration-300
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* =========================================
          LOGO
      ========================================== */}
      <div className="flex h-20 items-center justify-center border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 shadow-lg shadow-amber-200">
            <MessageCircle
              size={23}
              strokeWidth={2.5}
              fill="currentColor"
              className="text-black"
            />
          </div>

          {isOpen && (
            <div className="overflow-hidden">
              <h1 className="whitespace-nowrap text-lg font-bold text-gray-900">
                Chatterbox
              </h1>

              <p className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                Connect · Chat · Share
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =========================================
          TOGGLE
      ========================================== */}
      <div className="flex justify-center px-3 pt-5">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-full items-center justify-center rounded-xl text-gray-400 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
        >
          {isOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* =========================================
          ROUTES
      ========================================== */}
      <nav className="mt-6 flex flex-1 flex-col items-center gap-2 px-3">
        {routes.map((route) => {
          const Icon = route.icon;

          const isActive = route.active ?? pathname === route.href;

          /*
           * Logout doesn't have a real href.
           */
          if (route.onClick) {
            return (
              <button
                key={route.label}
                type="button"
                onClick={route.onClick}
                className={`
                  group
                  relative
                  flex
                  h-12
                  w-full
                  items-center
                  rounded-xl
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-amber-50 text-amber-600"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <div className="flex w-14 shrink-0 items-center justify-center">
                  <Icon size={21} strokeWidth={2} />
                </div>

                {isOpen && (
                  <span className="whitespace-nowrap text-sm font-semibold">
                    {route.label}
                  </span>
                )}

                {/* Tooltip */}
                {!isOpen && (
                  <span className="pointer-events-none absolute left-16 z-50 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg group-hover:block">
                    {route.label}
                  </span>
                )}
              </button>
            );
          }

          return (
            <Link
              key={route.label}
              href={route.href}
              className={`
                group
                relative
                flex
                h-12
                w-full
                items-center
                rounded-xl
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-amber-50 text-amber-600"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <div className="flex w-14 shrink-0 items-center justify-center">
                <Icon size={21} strokeWidth={2} />
              </div>

              {isOpen && (
                <span className="whitespace-nowrap text-sm font-semibold">
                  {route.label}
                </span>
              )}

              {/* Tooltip */}
              {!isOpen && (
                <span className="pointer-events-none absolute left-16 z-50 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg group-hover:block">
                  {route.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* =========================================
          PROFILE
      ========================================== */}
      {/* =========================================
    PROFILE
========================================== */}
      <div className="border-t border-gray-100 p-3">
        <button
          type="button"
          className={`
      group relative flex h-12 w-full items-center rounded-xl
      transition hover:bg-gray-50
      ${isOpen ? "px-2" : "justify-center"}
    `}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            {currentUser.image ? (
              <img
                src={currentUser.image}
                alt={currentUser.name || "User"}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                {currentUser.name?.charAt(0).toUpperCase() ||
                  currentUser.email?.charAt(0).toUpperCase() ||
                  "U"}
              </div>
            )}

            {/* Online status */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          </div>

          {/* User information */}
          {isOpen && (
            <div className="ml-3 min-w-0 text-left">
              <p className="truncate text-sm font-semibold text-gray-800">
                {currentUser.name || "User"}
              </p>

              <p className="truncate text-[11px] text-gray-400">
                {currentUser.email}
              </p>
            </div>
          )}

          {/* Tooltip when sidebar collapsed */}
          {!isOpen && (
            <span className="pointer-events-none absolute left-16 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg group-hover:block">
              {currentUser.name || currentUser.email || "User"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
