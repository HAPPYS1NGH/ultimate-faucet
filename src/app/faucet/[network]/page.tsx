"use client";
import { useState, useEffect } from "react"; // Import useState and useEffect for state and effects management
import { useParams, useRouter } from "next/navigation";
import { networkData, NetworkName } from "@/constants/faucet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cannotDripTokens, dripTokensToAddress } from "@/helpers/contract";
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
  console.log(errorMessage + "error");

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
    async function check() {
      if (isValidEvmAddress(walletAddress) && isNetworkValid) {
        setIsLoading(true); // Set loading when checking the drip status
        const result = await cannotDripTokens(
          walletAddress,
          telegramUsername,
          network as NetworkName
        );

        if (result !== false) {
          setErrorMessage(result as string);
        }
        setIsLoading(false);
      }
    }
  }, [walletAddress, telegramUsername, network, isNetworkValid]);

  // Handle button click for dripping tokens
  const handleButtonClick = async () => {
    if (!isValidEvmAddress(walletAddress)) {
      setErrorMessage("Please enter a valid EVM address.");
      return;
    }

    setIsLoading(true); // Start loading state
    setErrorMessage(""); // Clear any previous errors
    const candrip = await cannotDripTokens(
      walletAddress,
      telegramUsername,
      network as NetworkName
    );
    console.log(candrip + "candrip");

    if (candrip !== false) {
      setErrorMessage(candrip as string);
      setIsLoading(false);
      return;
    }

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

      if (dripResult.success) {
        setFundsDripped(true);
        setErrorMessage(""); // Clear any errors if successful
        // Assuming `dripResult` contains the transaction hash
        setErrorMessage(`Transaction successful! Hash: ${dripResult.hash}`);
      }
      if (!dripResult.success) {
        setErrorMessage(dripResult.hash);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error?.message ||
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
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
      >
        ← Back
      </button>
      <Image
        src={`/${network}2.svg`}
        width={85}
        height={85}
        alt={`${networkInfo?.name} Logo`}
        className="mb-8"
      />
      <h1 className="text-2xl font-bold mb-4">Hey @{telegramUsername}!</h1>
      <p className="text-xl mb-8">
        {fundsDripped
          ? "Your Funds are on the way!"
          : "You can claim your tokens below:"}
      </p>
      <Input
        type="text"
        placeholder="Place your EVM address"
        value={walletAddress}
        onChange={handleInputChange} // Handle input change
        className="px-4 py-4 rounded-lg text-center mb-4 bg-white"
        disabled={isLoading || fundsDripped} // Disable while loading or after successful claim
      />
      {/* Error Message */}
      {errorMessage && (
        <p className={`text-${fundsDripped ? "green" : "red"}-500 mb-4`}>
          {errorMessage}
        </p>
      )}

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
