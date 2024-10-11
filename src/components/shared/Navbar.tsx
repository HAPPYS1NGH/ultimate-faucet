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
    <nav className="mx-3 my-4">
      <div className="flex items-end">
        <h1 className="text-2xl text-rabble font-extrabold ">DevFaucet</h1>{" "}
        <div className="ml-auto flex items-center ">
          <ConnectButton accountStatus={"avatar"} chainStatus={"icon"} />
        </div>
      </div>
      <hr className="bg-black mt-2" />
    </nav>
  );
};

export default Navbar;
