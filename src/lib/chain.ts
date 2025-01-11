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
    id: 20143,
    name: 'Monad Devnet',
    nativeCurrency: {
        name: 'DMonad',
        symbol: 'DMON',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc-devnet.monadinfra.com/rpc/3fe540e310bbb6ef0b9f16cd23073b0a'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Explorer',
            url: 'https://explorer.monad-devnet.devnet101.com/',
        },
    },
    testnet: true,
})    