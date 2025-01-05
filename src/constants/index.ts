const BASE = "0x01bcB892d53902A5F902E7e589CdceC9651d18d6"
const MOVEMENT = "0x12AD3E396E2574bf7ADd2D4253Ab27C94B247C74";
const MORPH = "0x12AD3E396E2574bf7ADd2D4253Ab27C94B247C74";
const KAKAROT = "0x12AD3E396E2574bf7ADd2D4253Ab27C94B247C74";
const ARBITRUM = "0xE1418CFACF216346D2d318550e7109dFD979b4cB";
const MODE = "0x651f3652a26b3a9d62a6b2a022d754c63b385ff8";
const MONAD = "0x74e9868Ee687b8DCcaD6a9eBaeE1878db4798Fa0"


import { abi } from "./abi";

export const config = {
    "monad": {
        address: MONAD,
        abi,
    },
    "base": {
        address: BASE,
        abi,
    },
    "movement": {
        address: MOVEMENT,
        abi,
    },
    "morph": {
        address: MORPH,
        abi,
    },
    "kakarot": {
        address: KAKAROT,
        abi,
    },
    "arbitrum": {
        address: ARBITRUM,
        abi,
    },
    "mode": {
        address: MODE,
        abi,
    }
};