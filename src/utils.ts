import {BigNumber, ethers} from "ethers";

export const parseBigNumber = (num: number): BigNumber => ethers.utils.parseEther(num.toString());

export const formatEther = (num: BigNumber): string => ethers.utils.formatEther(num);