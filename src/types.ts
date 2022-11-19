import {Web3Provider} from "@ethersproject/providers";
import {Signer} from "ethers";

export type Provider = {
    web3Provider: Web3Provider,
    isConnected: boolean,
    signer: Signer,
}

export type AudioTrack = {
    tokenId: number,
    artistAddress: string,
    name: string,
    seller: string,
    royalty: number,
    price: number,
    uri: string
}

export type Artist = {
    artistAddress: string,
    name: string
}

export type TokenAction = 'buy' | 'relist'