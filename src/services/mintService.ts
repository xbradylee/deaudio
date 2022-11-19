import {Contract} from "ethers";
import {parseBigNumber} from "../utils";


export const mintToken = (contract: Contract, artistAddress: string, tokenName: string, royalty: number, price: number, uri: string) =>
    contract.mint(artistAddress, tokenName, parseBigNumber(royalty), parseBigNumber(price), uri);