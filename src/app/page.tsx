"use client";

import { useMainButton } from "@telegram-apps/sdk-react";
import Link from "next/link";
import Arrow from "@/assets/Arrow";
import { Button } from "@/components/ui/button";
import NetworkCard from "@/components/faucet/NetworkCard";
import { networks } from "@/constants/faucet";

export default function Home() {
  const mainBtn = useMainButton();

  const handleMainBtn = async () => {
    mainBtn.enable();
    mainBtn.setText("New Text");
    mainBtn.setBgColor("#08F7AF");
    if (mainBtn.isVisible) {
      mainBtn.hide();
    } else {
      mainBtn.show();
    }
  };

  mainBtn.on("click", () => {
    mainBtn.showLoader();
    mainBtn.setText("Action Performing");
    setTimeout(() => {
      console.log("Main Button Clicked");
      mainBtn.hideLoader();
      mainBtn.setText("New Text");
      mainBtn.hide();
    }, 2000);
  });

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="text-center flex flex-col items-center">
        <div className=" mt-10 grid grid-cols-2 gap-2">
          {networks.map((network) => (
            <NetworkCard key={network} name={network} />
          ))}
        </div>
      </div>
    </main>
  );
}
