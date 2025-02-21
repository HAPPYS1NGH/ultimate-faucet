"use server"
import { config } from "../constants";
import { getChainClient } from "@/lib/client";
import { networkData, NetworkName, networks } from "@/constants/faucet";
import { parseUnits } from 'viem'

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
    usernameBytes: string,
    network: NetworkName
) => {
    const contract = config[network];
    const client: any = getChainClient(network);
    console.log(usernameBytes, network, "IN LAST 24 HOURS Username");

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

export const faucetBalance = async (network: NetworkName) => {
    const contract = config[network];
    const client: any = getChainClient(network);
    const balance = await client.getBalance({ address: contract.address as `0x${string}` });
    return balance;
}

export const isFaucetEmpty = async (network: NetworkName) => {
    const networkDetails = networkData[network];
    let balance = await faucetBalance(network);
    if (balance <= parseUnits(networkDetails.dripAmount, 18)) {
        return true;
    }
    return false;
}


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
        console.log("username, usernameEncode, usernameBytes", username, usernameEncode, usernameBytes);

        const { request, response } = await client.simulateContract({
            address: contract.address as `0x${string}`,
            abi: contract.abi,
            functionName: "dripTokensToAddress",
            args: [to, usernameBytes, amount.toString()],
        });

        console.log("Simulated request: ", request);
        console.log("Simulated response: ", response);


        const hash = await client.writeContract(request);
        console.log("Transaction hash: ", hash);

        return { success: true, hash };
    } catch (error: any) {
        return { success: false, hash: error?.metaMessages ? error?.metaMessages[0] : "Error in dripTokensToAddress: " };
    }
};

export const cannotDripTokens = async (
    address: string,
    username: string,
    network: NetworkName
): Promise<false | string> => {
    const usernameEncode = new TextEncoder().encode(username);
    const usernameBytes = `0x${usernameEncode.toString().replace(/,/g, "").replace(/ /g, "").replace(/0x/g, "")}`;

    try {
        // Check if the address has already received tokens in the last 24 hours on any network
        // for (const net of networks) {
        const net = network;
        const hasAddressReceived = await isTokenDrippedToAddressInLast24Hours(address, net);
        console.log(hasAddressReceived + "hasAddressReceived");
        if (hasAddressReceived) {
            return "Tokens have already been dripped to this address within the last 24 hours.";
        }
        console.log(usernameBytes, net);
        const hasUsernameReceived = await isTokenDrippedToUsernameInLast24Hours(usernameBytes, net);
        console.log(hasUsernameReceived + "hasUsernameReceived");

        if (hasUsernameReceived) {
            return "Tokens have already been dripped to this username within the last 24 hours.";
        }
        // }
        // Check if the address has a balance above the threshold
        // for (const net of networks) {
        const hasEnoughFunds = await isBalanceAboveThreshold(address, net);
        if (hasEnoughFunds) {
            return "The address balance is above the threshold.";
        }

        const faucetEmpty = await isFaucetEmpty(net);
        if (faucetEmpty) {
            return "The faucet is empty.";
        }

        //     }
        return false;
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