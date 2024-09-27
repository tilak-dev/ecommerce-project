"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { adminLink } from "@/data/Link";

export default function AdminLayout() {
  const pathname = usePathname();
  const [active, setActive] = useState<
    string | number | readonly string[] | undefined
  >("");

  //set active

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
            {adminLink &&
              adminLink.map((link) => (
                <li
                  key={link.id}
                  value={link.link}
                  onClick={()=>setActive(link.id)}
                  className={`${
                    active === link.id
                      ? "bg-cyan-700 text-white"
                      : "text-cyan-100"
                  } rounded-lg transition-colors duration-200 hover:bg-cyan-600 focus:bg-cyan-700`}
                >
                  <Link
                    href={link.link}
                    className="block py-3 px-4"
                  >
                    {link.value}
                  </Link>
                </li>
              ))}
          
          </ul>
        </nav>
      </div>
    </div>
  );
}
