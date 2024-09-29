"use client";
import { toast } from "@/hooks/use-toast";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import SearchCategory from "./SearchCategory";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const hnadleOnLogout = () => {
    try {
      signOut();
      router.replace("/");
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
        duration: 3000,
        variant: "default",
      });
      console.log("Logged out successfully");
    } catch {
      console.error("Failed to logout");
    }
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-10 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">Project Work</Link>
        </div>

        {/* Search Bar */}
        <SearchCategory />
        {/* <form action="">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Search for products..."
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
              Search
            </button>
          </div>
        </form> */}

        {/* Navigation & Icons */}
        <div className="flex items-center space-x-6">
          {/* Nav Links */}
          <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
            <Link
              href="/"
              className="text-gray-800 py-1.5 border-b-transparent hover:border-purple-700 px-4 border-b-[2px]  transition duration-300 ease-in-out hover:text-indigo-700 "
            >
              Home
            </Link>
          </nav>

          {/* User & Cart Icons */}
          <div className="flex space-x-4 items-center">
            {/* User Icon */}
            {session?.user.email ? (
              <>
                <div className="flex items-center gap-x-5 justify-center">
                  {session.user.isAdmin ? (
                    <Link
                      href="/admin"
                      className="text-gray-800 py-1.5 rounded-lg px-4 border-[1px] border-indigo-700 hover:bg-emerald-900 transition duration-300 ease-in-out hover:text-white"
                    >
                      Admin
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link
                    href="/account"
                    className="text-gray-800 py-1.5 rounded-lg px-4 border-[1px] border-indigo-700 hover:bg-indigo-600 transition duration-300 ease-in-out hover:text-white"
                  >
                    Account
                  </Link>
                  <Link
                    href="/signin"
                    className="text-gray-800 py-1.5 rounded-lg px-4 border-[1px] border-red-700 hover:bg-red-600 transition duration-300 ease-in-out hover:text-white"
                    onClick={() => hnadleOnLogout()}
                  >
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-x-5 justify-center">
                  <Link
                    href="/signin"
                    className="text-gray-800 py-1.5 rounded-lg px-4 border-[1px] border-indigo-700 hover:bg-indigo-600 transition duration-300 ease-in-out hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-gray-800 py-1.5 rounded-lg px-4 border-[1px] border-green-700 hover:bg-green-600 transition duration-300 ease-in-out hover:text-white"
                  >
                    Resister
                  </Link>
                </div>
              </>
            )}

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative text-gray-800 hover:text-indigo-600"
            >
              Cart
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <nav className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
        <Link
          href="/"
          className="block py-2 text-gray-800 hover:text-indigo-600"
        >
          Home
        </Link>
        <Link
          href="/shop"
          className="block py-2 text-gray-800 hover:text-indigo-600"
        >
          Shop
        </Link>
        <Link
          href="/about"
          className="block py-2 text-gray-800 hover:text-indigo-600"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="block py-2 text-gray-800 hover:text-indigo-600"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
