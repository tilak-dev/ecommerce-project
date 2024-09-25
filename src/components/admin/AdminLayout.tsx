"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout() {
  const pathname = usePathname(); // Get the current route for active state

  return (
    <div className="w-64 h-full flex-col text-white bg-cyan-800">
      <div className="py-4 px-6">
        {/* Admin Title */}
        <div className="text-center font-extrabold font-mono text-2xl mb-8">
          Admin Control
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          <ul className="space-y-1">
            {/* Dashboard Link */}
            <li
              className={`${
                pathname === "/admin"
                  ? "bg-cyan-700 text-white"
                  : "text-cyan-100"
              } rounded-lg transition-colors duration-200 hover:bg-cyan-600 focus:bg-cyan-700`}
            >
              <Link href="/admin" className="block py-3 px-4">
                Dashboard
              </Link>
            </li>

            {/* Manage Category Link */}
            <li
              className={`${
                pathname === "/admin/manage-category"
                  ? "bg-cyan-700 text-white"
                  : "text-cyan-100"
              } rounded-lg transition-colors duration-200 hover:bg-cyan-600 focus:bg-cyan-700`}
            >
              <Link href="/admin/manage-category" className="block py-3 px-4">
                Manage Category
              </Link>
            </li>
            {/* Create Product Link */}
            <li
              className={`${
                pathname === "/admin/create-product"
                  ? "bg-cyan-700 text-white"
                  : "text-cyan-100"
              } rounded-lg transition-colors duration-200 hover:bg-cyan-600 focus:bg-cyan-700`}
            >
              <Link href="/admin/create-product" className="block py-3 px-4">
                Create Product
              </Link>
            </li>
            {/* Manage Product Link */}
            <li
              className={`${
                pathname === "/admin/manage-product"
                  ? "bg-cyan-700 text-white"
                  : "text-cyan-100"
              } rounded-lg transition-colors duration-200 hover:bg-cyan-600 focus:bg-cyan-700`}
            >
              <Link href="/admin/manage-product" className="block py-3 px-4">
                Manage Product
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
