"use server"
import { config } from "../constants";
import { getChainClient } from "@/lib/client";
import { NetworkName, networks } from "@/constants/faucet";

export const isTokenDrippedToAddressInLast24Hours = async (
    address: string,
    network: NetworkName
) => {
    const contract = config[network];
    const client: any = getChainClient(network);
    const hasReceivedWithin24Hours = await client.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi,
        functionName: "isTokenDrippedToAddressInLast24Hours",
        args: [address],
    });
    return hasReceivedWithin24Hours;
};

export const isTokenDrippedToUsernameInLast24Hours = async (
    username: string,
    network: NetworkName
) => {
    const contract = config[network];
    const client: any = getChainClient(network);

    const usernameEncode = new TextEncoder().encode(username);
    const usernameBytes = `0x${usernameEncode.toString().replace(/,/g, "").replace(/ /g, "").replace(/0x/g, "")}`;

    const hasReceivedWithin24Hours = await client.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi,
        functionName: "isTokenDrippedToUsernameInLast24Hours",
        args: [usernameBytes],
    });
    return hasReceivedWithin24Hours;
};

export const isBalanceAboveThreshold = async (
    address: string,
    network: NetworkName
) => {
    const contract = config[network];
    const client: any = getChainClient(network);

    const hasEnoughFunds = await client.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi,
        functionName: "isBalanceAboveThreshold",
        args: [address],
    });
    return hasEnoughFunds;
};

export const dripTokensToAddress = async (
    to: string,
    username: string,
    amount: bigint,
    network: NetworkName
) => {
    try {
        const contract = config[network];
        const client: any = getChainClient(network, true);

        const usernameEncode = new TextEncoder().encode(username);
        const usernameBytes = `0x${usernameEncode.toString().replace(/,/g, "").replace(/ /g, "").replace(/0x/g, "")}`;

        const { request, response } = await client.simulateContract({
            address: contract.address as `0x${string}`,
            abi: contract.abi,
            functionName: "dripTokensToAddress",
            args: [to, usernameBytes, amount.toString()],
        });

        const hash = await client.writeContract(request);
        return hash;
    } catch (error: any) {
        return error?.metaMessages ? error?.metaMessages[0] : "Error in dripTokensToAddress: ";
    }
};

export const canDripTokens = async (
    address: string,
    username: string,
    network: NetworkName
): Promise<true | string> => {
    const usernameEncode = new TextEncoder().encode(username);
    const usernameBytes = `0x${usernameEncode.toString().replace(/,/g, "").replace(/ /g, "").replace(/0x/g, "")}`;

    try {
        // Check if the address has already received tokens in the last 24 hours on any network
        // for (const net of networks) {
        const net = network;
        const hasAddressReceived = await isTokenDrippedToAddressInLast24Hours(address, net);
        if (hasAddressReceived) {
            return "Tokens have already been dripped to this address within the last 24 hours.";
        }

        const hasUsernameReceived = await isTokenDrippedToUsernameInLast24Hours(usernameBytes, net);
        if (hasUsernameReceived) {
            return "Tokens have already been dripped to this username within the last 24 hours.";
        }
        // }
        // // Check if the address has a balance above the threshold
        // for (const net of networks) {
        const hasEnoughFunds = await isBalanceAboveThreshold(address, net);
        if (hasEnoughFunds) {
            return "The address balance is above the threshold.";
            //     }
        }
        return true;
    } catch (error) {
        return "An unknown error occurred.";
    }
};

// Function to return true if user Build Score less than 20
// export async function isNewAccount(address: string) {
//     try {
//         const response = await fetch(`https://api.talentprotocol.com/api/v2/passports/${address.toLowerCase()}`, {
//             method: 'GET',
//             headers: {},
//         });
//         const data = await response.json();
//         return data?.passport?.buildScore < 20;
//     } catch (error) {
//         return false;
//     }
// }