"use client"
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">ShopName</Link>
        </div>

        {/* Search Bar */}
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

        {/* Navigation & Icons */}
        <div className="flex items-center space-x-6">
          {/* Nav Links */}
          <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <Link href="/shop" className="hover:text-indigo-600">Shop</Link>
            <Link href="/about" className="hover:text-indigo-600">About</Link>
            <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
          </nav>

          {/* User & Cart Icons */}
          <div className="flex space-x-4 items-center">
            {/* User Icon */}
            <Link href="/account" className="text-gray-800 hover:text-indigo-600">
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
                  d="M5.121 18.364A9 9 0 1018.364 5.121M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative text-gray-800 hover:text-indigo-600">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M17 13l1.6 8M6 21h12M9 9h6"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <nav className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
        <Link href="/" className="block py-2 text-gray-800 hover:text-indigo-600">Home</Link>
        <Link href="/shop" className="block py-2 text-gray-800 hover:text-indigo-600">Shop</Link>
        <Link href="/about" className="block py-2 text-gray-800 hover:text-indigo-600">About</Link>
        <Link href="/contact" className="block py-2 text-gray-800 hover:text-indigo-600">Contact</Link>
      </nav>
    </header>
  );
}
