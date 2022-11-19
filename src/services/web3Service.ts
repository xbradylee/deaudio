import {ExternalProvider, Web3Provider} from "@ethersproject/providers";
import {ethers} from "ethers";
import {memoize} from "lodash";
import {config} from "../config";
import Web3Modal from "web3modal";
import deAudio from "../hardhat/artifacts/src/hardhat/contracts/DeAudio.sol/DeAudio.json";
import {DeAudio} from "../../typechain-types";


export const newWeb3Provider = memoize((externalProvider: ExternalProvider) =>
    new ethers.providers.Web3Provider(externalProvider, "any")
);


export const web3Modal = (): Web3Modal => new Web3Modal({
    cacheProvider: false,
    providerOptions: {}
});


export const withDeAudioContract = <T>(provider: Web3Provider, fn: (contract: DeAudio) => Promise<T>) =>
    getDeAudioContract(provider)
        .then(contract => fn(contract));


const getDeAudioContract = memoize((provider: Web3Provider): Promise<DeAudio> =>
    Promise.resolve(new ethers.Contract(config().contractAddress, deAudio.abi, provider) as DeAudio)
        .then(contract => contract.connect(provider.getSigner()))
);


export const retrievePropFromContract = (contract: DeAudio, propName: 'artists' | 'audioTracks', count: number) =>
    Promise.all([...Array(count).keys()]
        .reduce((props: unknown[], idx: number) =>
            [...props, contract[`${propName}`](idx)], []
        ));