"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import {
  useBackButton,
  useClosingBehavior,
  useViewport,
} from "@telegram-apps/sdk-react";
import { useRouter, usePathname } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  const bb = useBackButton();
  const close = useClosingBehavior(); // will be undefined or ClosingBehavior.
  const viewport = useViewport(); // will be undefined or InitData.
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    function goBack() {
      router.back();
    }
    if (close) {
      close.enableConfirmation();
    }
    if (viewport) {
      viewport.expand();
    }
    if (bb) {
      if (pathname === "/") {
        bb.hide();
        return;
      }
      bb.show();
      bb.on("click", goBack);
    }
  }, [bb, router, pathname]);

  return (
    <main className="bg-background">
      <Navbar />
      <main className=" mx-3 my-4 ">{children}</main>
      <Toaster richColors />
      <footer className="text-center text-sm mt-8 mb-4 text-[#000000b6]">
        Made with ❤️ by{" "}
        <a
          className=" cursor-pointer font-bold underline"
          href="https://x.com/happys1ngh"
        >
          HappySingh
        </a>
      </footer>
    </main>
  );
}

export default Layout;
