import { useRouter } from "next/router";
import { networkData, NetworkName } from "@/constants/faucet";

function FaucetPage() {
  const router = useRouter();
  const { network } = router.query;

  // Ensure that the network exists in networkData and is a valid NetworkName
  if (typeof network !== "string" || !isValidNetwork(network)) {
    return <div>Network not found!</div>;
  }

  const networkInfo = networkData[network as NetworkName]; // Safe cast here

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-[${networkInfo.color}]`}
    >
      <h1 className="text-white text-6xl font-bold">
        {networkInfo.name} Faucet
      </h1>
      <p className="text-white text-xl mt-4">{networkInfo.description}</p>
    </div>
  );
}

// Type guard to check if network is a valid NetworkName
function isValidNetwork(network: string): network is NetworkName {
  return (network as NetworkName) in networkData;
}

export default FaucetPage;
