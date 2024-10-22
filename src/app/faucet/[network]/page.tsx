"use client";
import { useState, useEffect } from "react"; // Import useState and useEffect for state and effects management
import { useParams, useRouter } from "next/navigation";
import { networkData, NetworkName } from "@/constants/faucet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cannotDripTokens, dripTokensToAddress } from "@/helpers/contract";
import { useTelegramUsername } from "@/hooks/useTelegramUsername";
import { useAccount } from "wagmi";

// Regex for EVM address validation
const isValidEvmAddress: (address: string) => boolean = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);

function FaucetPage() {
  const { network } = useParams();
  const router = useRouter();
  const telegramUsername = useTelegramUsername();
  const { address } = useAccount();
  // State for wallet address, loading status, and feedback messages
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fundsDripped, setFundsDripped] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNetworkValid, setIsNetworkValid] = useState(true); // New state for network validation
  const [transactionHash, setTransactionHash] = useState<string | null>(null); // State for transaction hash

  console.log("error mesaage" + errorMessage);

  // Ensure that the network exists in networkData and is a valid NetworkName
  useEffect(() => {
    if (typeof network !== "string" || !isValidNetwork(network)) {
      setIsNetworkValid(false); // Set network as invalid
    } else {
      setIsNetworkValid(true); // Set network as valid
    }
  }, [network]);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

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
    check();
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
        BigInt(
          1000000000000000000 *
            parseFloat(
              networkInfo?.dripAmount ? networkInfo?.dripAmount : "0.5"
            )
        ), // Adjust the amount as per your contract
        network as NetworkName
      );
      console.log(dripResult);
      console.log("dripResult");

      if (dripResult.success) {
        setFundsDripped(true);
        setErrorMessage(""); // Clear any errors if successful
        // Store transaction hash for display
        setTransactionHash(dripResult.hash);
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
      className={`mt-10 text-black flex flex-col items-center justify-center bg-[${networkInfo?.color}] mb-40 `}
    >
      {/* <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
      >
        ← Back
      </button> */}
      <Image
        src={`/${network}2.svg`}
        width={85}
        height={85}
        alt={`${networkInfo?.name} Logo`}
        className="mb-8"
      />
      <h1 className="text-2xl font-bold mb-4">
        Hey <span className="text-[#E33D26]">@{telegramUsername}</span>
      </h1>
      <p className="text-xl mb-8">
        {fundsDripped
          ? "Your Funds are on the way!"
          : `Claim your ${networkInfo?.dripAmount} ${networkInfo?.token} on ${networkInfo?.name}:`}
      </p>
      <Input
        type="text"
        placeholder="Place your EVM address"
        value={walletAddress}
        onChange={handleInputChange} // Handle input change
        className="px-4 py-6 rounded-lg text-center mb-4 bg-white"
        disabled={isLoading || fundsDripped} // Disable while loading or after successful claim
      />

      {fundsDripped ? (
        <Button className={`font-semibold w-full py-6 ${networkInfo?.color} `}>
          <Link href="/">Go Back</Link>
        </Button>
      ) : (
        <Button
          className={`font-semibold w-full py-6 ${networkInfo?.color} `}
          onClick={handleButtonClick}
          disabled={
            isLoading || fundsDripped || !isValidEvmAddress(walletAddress)
          } // Disable under these conditions
        >
          {isLoading ? "Processing..." : `Get your ${networkInfo?.name} token`}
        </Button>
      )}
      {errorMessage && (
        <p className={`text-red-500 mt-4 text-sm`}>{errorMessage}</p>
      )}

      {/* Transaction Hash Link */}
      {transactionHash && (
        <Button
          className={`font-semibold w-full py-6 bg-white text-black hover:bg-gray-200 mt-3 border-black border-2`}
        >
          <Link
            href={`${networkInfo?.explorer}tx/${transactionHash}`}
            className="flex justify-center align-middle gap-2 "
          >
            View Transaction
            <Image src="/link.png" alt="link" width={20} height={20} />
          </Link>
        </Button>
      )}
    </div>
  );
}

// Type guard to check if network is a valid NetworkName
function isValidNetwork(network: string): network is NetworkName {
  return (network as NetworkName) in networkData;
}

export default FaucetPage;
