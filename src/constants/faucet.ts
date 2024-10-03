export type NetworkName = "morph" | "kakarot" | "base" | "movement";

export const networks: NetworkName[] = ["morph", "kakarot", "base", "movement"];

export const networkData: Record<NetworkName, { name: string; color: string; description: string, dripAmount: string, token: string, explorer: string }> = {
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
        dripAmount: "0.025",
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
};
