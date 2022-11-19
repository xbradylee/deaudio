import {retrievePropFromContract} from "./web3Service";
import {DeAudio} from "../../typechain-types";
import {Artist} from "../types";


export const getArtists = (contract: DeAudio): Promise<Artist[]> =>
    contract.artistCount()
        .then(count => retrievePropFromContract(contract, 'artists', count.toNumber()) as Promise<Artist[]>);