"use client";
import { useState, useEffect } from "react"; // Import useState and useEffect for state and effects management
import { useParams, useRouter } from "next/navigation";
import { networkData, NetworkName } from "@/constants/faucet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { canDripTokens, dripTokensToAddress } from "@/helpers/contract";
import { useTelegramUsername } from "@/hooks/useTelegramUsername";

// Regex for EVM address validation
const isValidEvmAddress = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);

function FaucetPage() {
  const { network } = useParams();
  const router = useRouter();
  const telegramUsername = useTelegramUsername();

  // State for wallet address, loading status, and feedback messages
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fundsDripped, setFundsDripped] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNetworkValid, setIsNetworkValid] = useState(true); // New state for network validation

  // Ensure that the network exists in networkData and is a valid NetworkName
  useEffect(() => {
    if (typeof network !== "string" || !isValidNetwork(network)) {
      setIsNetworkValid(false); // Set network as invalid
    } else {
      setIsNetworkValid(true); // Set network as valid
    }
  }, [network]);

  const networkInfo = isNetworkValid
    ? networkData[network as NetworkName]
    : null; // Safe cast here

  // Handle wallet address change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
    setErrorMessage(""); // Clear any previous error message when user types
  };

  // Prefetch if the user can claim tokens
  useEffect(() => {
    if (isValidEvmAddress(walletAddress) && isNetworkValid) {
      setIsLoading(true); // Set loading when checking the drip status
      canDripTokens(walletAddress, telegramUsername, network as NetworkName)
        .then((result) => {
          if (result !== true) {
            setErrorMessage(result as string);
          }
        })
        .catch(() => {
          setErrorMessage(
            "Unable to check drip eligibility. Please try again."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [walletAddress, telegramUsername, network, isNetworkValid]);

  // Handle button click for dripping tokens
  const handleButtonClick = async () => {
    if (!isValidEvmAddress(walletAddress)) {
      setErrorMessage("Please enter a valid EVM address.");
      return;
    }

    setIsLoading(true); // Start loading state
    try {
      console.log(
        "Dripping tokens to",
        walletAddress,
        telegramUsername,
        network
      );

      const dripResult = await dripTokensToAddress(
        walletAddress,
        telegramUsername,
        BigInt(100000000000000000), // Adjust the amount as per your contract
        network as NetworkName
      );
      console.log(dripResult);

      if (dripResult) {
        setFundsDripped(true);
      }
    } catch (error) {
      console.log(error);

      setErrorMessage(
        "An error occurred while dripping tokens. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // If the network is invalid, return the error message without running the rest of the component
  if (!isNetworkValid) {
    return <div>Network not found!</div>;
  }

  return (
    <div
      className={`mt-10 text-black flex flex-col items-center justify-center bg-[${networkInfo?.color}] mb-40`}
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
        alt={`${networkInfo?.name} Logo`}
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
        disabled={isLoading || fundsDripped} // Disable while loading or after successful claim
      />

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {/* Button for dripping tokens */}
      <Button
        className={`font-semibold w-full ${networkInfo?.color} `}
        onClick={handleButtonClick}
        disabled={
          isLoading || fundsDripped || !isValidEvmAddress(walletAddress)
        } // Disable under these conditions
      >
        {isLoading ? "Processing..." : `Get your ${networkInfo?.name} token`}
      </Button>
    </div>
  );
}

// Type guard to check if network is a valid NetworkName
function isValidNetwork(network: string): network is NetworkName {
  return (network as NetworkName) in networkData;
}

export default FaucetPage;
