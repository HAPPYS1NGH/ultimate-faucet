export type NetworkName = "morph" | "kakarot" | "base" | "movement";

export const networks: NetworkName[] = ["morph", "kakarot", "base", "movement"];

export const networkData: Record<NetworkName, { name: string; color: string; description: string }> = {
    morph: {
        name: "Morph",
        color: "bg-morph", // Tailwind class name
        description: "Morph is consumer.",
    },
    kakarot: {
        name: "Kakarot",
        color: "bg-kakarot", // Tailwind class name
        description: "Kakarot is optimized for high-speed transactions.",
    },
    base: {
        name: "Base",
        color: "bg-base", // Tailwind class name
        description: "Base is for everyone.",
    },
    movement: {
        name: "Movement",
        color: "bg-black", // Tailwind class name
        description: "Movement is moved Based.",
    },
};
