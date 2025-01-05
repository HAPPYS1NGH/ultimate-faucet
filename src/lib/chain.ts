import { defineChain } from 'viem'

export const movementSepolia = defineChain({
    id: 30732,
    name: 'movement-sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'MOVE',
        symbol: 'MOVE',
    },
    rpcUrls: {
        default: {
            http: ['https://mevm.devnet.imola.movementlabs.xyz'],
            //   webSocket: ['wss://rpc.zora.energy'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.devnet.imola.movementlabs.xyz' },
    },
    //   contracts: {
    //     multicall3: {
    //       address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    //       blockCreated: 5882,
    //     },
    //   },
})

export const morphHolesky = defineChain({
    id: 2810,
    name: 'morph-holesky',
    nativeCurrency: {
        decimals: 18,
        name: 'Morph Holesky ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc-quicknode-holesky.morphl2.io'],
            //   webSocket: ['wss://rpc.zora.energy'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.devnet.imola.movementlabs.xyz' },
    },
    //   contracts: {
    //     multicall3: {
    //       address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    //       blockCreated: 5882,
    //     },
    //   },
})


export const kakarotSepolia = defineChain({
    id: 920637907288165,
    name: 'Kakarot Sepolia',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://sepolia-rpc.kakarot.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Kakarot Scan',
            url: 'https://sepolia.kakarotscan.org',
        },
    },
    testnet: true,
})

export const monadDevnet = defineChain({
    id: 41454,
    name: 'Monad Devnet',
    nativeCurrency: {
        name: 'DMonad',
        symbol: 'DMON',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://devnet1.monad.xyz/rpc/8XQAiNSsPCrIdVttyeFLC6StgvRNTdf'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Explorer',
            url: 'https://brightstar-884.devnet1.monad.xyz',
        },
    },
    testnet: true,
})    