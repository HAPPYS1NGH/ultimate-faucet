export type NetworkName = "monad" | "morph" | "kakarot" | "base" | "movement" | "arbitrum" | "mode";

export const networks: NetworkName[] = ["monad", "arbitrum", "base", "kakarot", "mode", "movement", "morph"];

export const networkData: Record<NetworkName, { name: string; color: string; description: string, dripAmount: string, token: string, explorer: string }> = {
    monad: {
        name: "Monad",
        color: "bg-monad",
        description: "Speed without sacrifice.",
        dripAmount: "1",
        token: "DMON",
        explorer: "https://brightstar-884.devnet1.monad.xyz/"
    },
    arbitrum: {
        name: "Arbitrum",
        color: "bg-arbitrum",
        description: "Arbitrum is Stylish.",
        dripAmount: "0.01",
        token: "ETH",
        explorer: "https://sepolia.arbiscan.io/"
    },
    morph: {
        name: "Morph",
        color: "bg-morph",
        description: "Morph is consumer.",
        dripAmount: "0.05",
        token: "ETH",
        explorer: "https://explorer-holesky.morphl2.io/"
    },
    kakarot: {
        name: "Kakarot",
        color: "bg-kakarot",
        description: "Kakarot is optimized for high-speed transactions.",
        dripAmount: "0.05",
        token: "ETH",
        explorer: "https://sepolia.kakarotscan.org/"
    },
    base: {
        name: "Base",
        color: "bg-base",
        description: "Base is for everyone.",
        dripAmount: "0.01",
        token: "ETH",
        explorer: "https://sepolia.basescan.org/"
    },
    movement: {
        name: "Movement",
        color: "bg-black",
        description: "Movement is moved Based.",
        dripAmount: "1",
        token: "MOVE",
        explorer: "https://explorer.devnet.imola.movementlabs.xyz/#/"
    },

    mode: {
        name: "MODE",
        color: "bg-mode",
        description: "Mode is for Consumer.",
        dripAmount: "0.01",
        token: "ETH",
        explorer: "https://sepolia.explorer.mode.network/"
    },
};
