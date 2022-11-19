import {expect} from "chai";
import {newWeb3Provider, web3Modal, withDeAudioContract} from "./web3Service";
import {Contract} from "ethers";
import Web3Modal from "web3modal";
import {DeAudio} from "../../typechain-types";
import {ExternalProvider} from "@ethersproject/providers";

describe('web 3 service', () => {

    it('should get web 3 provider', () => {
        expect(newWeb3Provider(externalProvider)._isProvider).to.be.true
    });

    it('should get web 3 modal', () => {
        expect(web3Modal()).to.be.instanceOf(Web3Modal)
    });

    it('should use DeAudio contract in a wrapper', () =>
        Promise.resolve(externalProvider)
            .then(newWeb3Provider)
            .then(provider => withDeAudioContract(provider, (contract: DeAudio) => Promise.resolve(contract)))
            .then(contract => expect(contract).to.be.instanceOf(Contract))
    );

});

const externalProvider = ({
    request: (_: { method: string; params?: unknown[]; }) => Promise.resolve([])
} as ExternalProvider);