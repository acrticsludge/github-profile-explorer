"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  function onHome() {
    router.push("/");
  }
  return (
    <nav className="w-full bg-white backdrop-blur border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Profile Explorer Logo"
          width={40}
          height={40}
          priority
        />
        <h1 className="text-[1.1rem] font-medium text-gray-700 tracking-tight">
          Profile Explorer
        </h1>

        <ul className="hidden md:flex gap-8 text-gray-500 font-normal cursor-pointer">
          <li
            className="hover:text-gray-700 transition-colors"
            onClick={onHome}
          >
            Home
          </li>
          <li className="hover:text-gray-700 transition-colors">Search</li>
          <li className="hover:text-gray-700 transition-colors">About</li>
        </ul>

        <div className="md:hidden text-gray-500 text-2xl cursor-pointer">☰</div>
      </div>
    </nav>
  );
}
