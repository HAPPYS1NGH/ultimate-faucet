import {
    createPublicClient,
    http,
    fallback,
    createWalletClient,
    publicActions,
} from "viem";
import {
    baseSepolia,
    kakarotSepolia,
} from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { movementSepolia, morphHolesky } from "./chain";

const baseSepoliaRPC = process.env.BASE_SEPOLIA_RPC;
const kakarotSepoliaRPC = process.env.KAKAROT_SEPOLIA_RPC; // RPC for Kakarot
const movementSepoliaRPC = process.env.MOVEMENT_SEPOLIA_RPC; // RPC for Movement
const morphSepoliaRPC = process.env.MORPH_SEPOLIA_RPC; // RPC for Morph

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

// Base Clients
export const baseSepoliaClient = createPublicClient({
    chain: baseSepolia,
    transport: http(baseSepoliaRPC, {
        batch: true,
    }),
});

export const walletBaseClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(baseSepoliaRPC),
}).extend(publicActions);

// Kakarot Clients
export const kakarotSepoliaClient = createPublicClient({
    chain: kakarotSepolia,
    transport: http(kakarotSepoliaRPC, {
        batch: true,
    }),
});

export const walletKakarotClient = createWalletClient({
    account,
    chain: kakarotSepolia,
    transport: http(kakarotSepoliaRPC),
}).extend(publicActions);

// Movement Clients
export const movementSepoliaClient = createPublicClient({
    chain: movementSepolia,
    transport: http(movementSepoliaRPC, {
        batch: true,
    }),
});

export const walletMovementClient = createWalletClient({
    account,
    chain: movementSepolia,
    transport: http(movementSepoliaRPC),
}).extend(publicActions);

// Morph Clients
export const morphHoleskyClient = createPublicClient({
    chain: morphHolesky,
    transport: http(morphSepoliaRPC, {
        batch: true,
    }),
});

export const walletMorphClient = createWalletClient({
    account,
    chain: morphHolesky,
    transport: http(morphSepoliaRPC),
}).extend(publicActions);

// Function to get the client based on the chain name
export function getChainClient(chain: string, isWallet = false): any {
    switch (chain) {
        case "base":
            return isWallet ? walletBaseClient : baseSepoliaClient;
        case "kakarot":
            return isWallet ? walletKakarotClient : kakarotSepoliaClient;
        case "movement":
            return isWallet ? walletMovementClient : movementSepoliaClient;
        case "morph":
            return isWallet ? walletMorphClient : morphHoleskyClient;
        default:
            throw new Error(`Unsupported chain ${chain}`);
    }
}
