
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRoutes from "@/app/hooks/useRoutes";

const MobileFooter = () => {
  const routes = useRoutes();
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md lg:hidden">
      <nav className="mx-auto flex h-[68px] max-w-md items-center justify-around">

        {routes.map((route) => {
          const Icon = route.icon;

          const isActive =
            route.active ??
            pathname === route.href;

          {/* Logout */}
          if (route.onClick) {
            return (
              <button
                key={route.label}
                type="button"
                onClick={route.onClick}
                className={`
                  relative flex h-14 min-w-[64px] flex-col
                  items-center justify-center gap-1 rounded-xl
                  transition-all duration-200
                  ${
                    isActive
                      ? "text-amber-500"
                      : "text-gray-400 hover:text-gray-700"
                  }
                `}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                <span
                  className={`
                    text-[10px] font-semibold
                    ${
                      isActive
                        ? "text-amber-500"
                        : "text-gray-400"
                    }
                  `}
                >
                  {route.label}
                </span>

                {isActive && (
                  <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500" />
                )}
              </button>
            );
          }

          return (
            <Link
              key={route.label}
              href={route.href}
              className={`
                relative flex h-14 min-w-[64px] flex-col
                items-center justify-center gap-1 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "text-amber-500"
                    : "text-gray-400 hover:text-gray-700"
                }
              `}
            >
              <div className="relative">

                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {/* Unread badge */}
                {route.label === "Messages" && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[9px] font-bold text-black">
                    4
                  </span>
                )}

              </div>

              <span
                className={`
                  text-[10px] font-semibold
                  ${
                    isActive
                      ? "text-amber-500"
                      : "text-gray-400"
                  }
                `}
              >
                {route.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-500" />
              )}
            </Link>
          );
        })}

      </nav>
    </footer>
  );
};

export default MobileFooter;

