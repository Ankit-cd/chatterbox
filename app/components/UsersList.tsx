"use client";

import { User } from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Search, UserRound } from "lucide-react";

interface UserListProps {
  items: User[];
}

const UsersList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 w-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">People</h1>
            <p className="text-sm text-gray-500 mt-1">
              Find someone to chat with
            </p>
          </div>

          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <UserRound className="h-5 w-5 text-gray-600" />
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search people..."
            className="w-full h-11 rounded-xl bg-gray-100 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-3 pb-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <UserRound className="h-6 w-6 text-gray-400" />
            </div>

            <h3 className="text-sm font-semibold text-gray-900">
              No users found
            </h3>

            <p className="text-xs text-gray-500 mt-1 max-w-55">
              There are no people available to start a conversation with yet.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {items.map((user) => (
              <Link
                key={user.id}
                href={`/users/${user.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-lg font-semibold text-amber-700">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}

                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />
                </div>

                {/* User information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-amber-600 transition">
                      {user.name || "Unknown User"}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default UsersList;
