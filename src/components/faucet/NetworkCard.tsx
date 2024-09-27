import React from "react";
import Link from "next/link";
import { spaceAfterCapital } from "@/lib/utils";
import { NetworkName, networkData } from "@/constants/faucet";
import Image from "next/image";

function NetworkCard({ name }: { name: NetworkName }) {
  const network = networkData[name];

  return (
    <Link href={`/faucet/${name}`} className="group">
      <div
        className={`flex flex-col items-center justify-center w-[190px] h-[320px] sm:w-[160px] sm:h-[280px] md:w-[190px] md:h-[320px] bg-${network.color} rounded-3xl text-center text-white hover:shadow-lg hover:bg-opacity-90 transition duration-300 ease-in-out`}
      >
        <Image
          src={`/${name}.svg`}
          width={68}
          height={68}
          alt={`${name} Logo`}
        />
        <h2 className="mt-4 text-xl sm:text-lg md:text-2xl font-bold">
          {spaceAfterCapital(network.name)}
        </h2>
      </div>
    </Link>
  );
}

export default NetworkCard;
