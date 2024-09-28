const BASE = "0x01bcB892d53902A5F902E7e589CdceC9651d18d6"
const MOVEMENT = "0x12AD3E396E2574bf7ADd2D4253Ab27C94B247C74";
const MORPH = "0x12AD3E396E2574bf7ADd2D4253Ab27C94B247C74";
const KAKAROT = "0x12AD3E396E2574bf7ADd2D4253Ab27C94B247C74";


import { abi } from "./abi";

export const config = {
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
};