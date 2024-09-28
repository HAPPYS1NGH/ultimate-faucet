"use client";
import { useState } from "react"; // Import useState for state management
import { useParams, useRouter } from "next/navigation";
import { networkData, NetworkName } from "@/constants/faucet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { canDripTokens, dripTokensToAddress } from "@/helpers/contract";
import { useTelegramUsername } from "@/hooks/useTelegramUsername";

function FaucetPage() {
  const { network } = useParams();
  const router = useRouter();
  const telegramUsername = useTelegramUsername();

  // State for wallet address and funds status
  const [walletAddress, setWalletAddress] = useState("");
  const [fundsDripped, setFundsDripped] = useState(false);

  // Ensure that the network exists in networkData and is a valid NetworkName
  if (typeof network !== "string" || !isValidNetwork(network)) {
    return <div>Network not found!</div>;
  }

  const networkInfo = networkData[network as NetworkName]; // Safe cast here

  // Handle wallet address change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  // Handle button click
  const handleButtonClick = () => {
    // Simulate fund dripping (replace with actual logic as needed)
    if (walletAddress) {
      // Here you would usually make a request to drip funds
      setFundsDripped(true);
      // Reset the wallet address if desired
      // setWalletAddress(""); // Uncomment if you want to clear the input
    } else {
      alert("Please enter a valid wallet address.");
    }
  };

  return (
    <div
      className={`mt-10 text-black flex flex-col items-center justify-center bg-[${networkInfo.color}] mb-40`}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
      >
        ← Back
      </button>

      {/* Image in the center */}
      <Image
        src={`/${network}2.svg`}
        width={85}
        height={85}
        alt={`${networkInfo.name} Logo`}
        className="mb-8"
      />

      {/* Center Greeting Text */}
      <h1 className="text-2xl font-bold mb-4">Hey @{telegramUsername}!</h1>

      {/* Claim Information */}
      <p className="text-xl mb-8">
        {fundsDripped
          ? "Your Funds are on the way!"
          : "You can claim your tokens below:"}
      </p>

      {/* Input field for EVM Address */}
      <Input
        type="text"
        placeholder="Place your EVM address"
        value={walletAddress}
        onChange={handleInputChange} // Handle input change
        className="px-4 py-4 rounded-lg text-center mb-4 bg-white"
      />

      <Button
        className={`font-semibold w-full bg-${network} `}
        onClick={handleButtonClick}
      >
        Get your {networkInfo.name} token
      </Button>
    </div>
  );
}

// Type guard to check if network is a valid NetworkName
function isValidNetwork(network: string): network is NetworkName {
  return (network as NetworkName) in networkData;
}

export default FaucetPage;
