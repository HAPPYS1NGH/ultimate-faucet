"use client";
import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className=" text-center my-6">
      <Image
        src="/gasyard.svg"
        width={235}
        height={50}
        alt="logo"
        className="block mx-auto"
      />

      {/* <div className="flex space-x-4 ">
        <Link
          href="/"
          className={`${
            pathname == "/" ? "text-rabble" : "text-color  hover:text-color/90"
          } `}
        >
          Home
        </Link>
        <Link
          href="/contract"
          className={`${
            pathname == "/contract"
              ? "text-rabble"
              : "text-color hover:text-color/90"
          } `}
        >
          Contract
        </Link>
      </div> */}
    </nav>
  );
};

export default Navbar;
