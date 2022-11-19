/**
 * @jest-environment node
 */
import {expect} from "chai";
import {mintToken} from "./mintService";
import {ethers} from "hardhat";
import {DeAudio} from "../../typechain-types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {passThroughAwait} from "promise-passthrough";
import {config} from "../config";
import {parseBigNumber} from "../utils";

describe('mint service', () => {

    it('should mint an audio track to the blockchain', () =>
        ethers.getContractFactory("DeAudio")
            .then(contractFactory => contractFactory.deploy()
                .then(contract => ethers.getSigners().then(signers => [contract, signers[0]] as [DeAudio, SignerWithAddress]))
            )
            .then(([contract, provider]) =>
                Promise.resolve(contract.connect(provider))
                    .then(contract => contract.addArtist('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', 'Artist Name'))
                    .then(() => contract)
            )
            .then(contract => Promise.resolve(mintToken(
                contract,
                '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
                'Some Arbitrary Name',
                0.2,
                1,
                'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/'))
                .then(() => contract)
            )
            .then(contract => contract.audioTracks(0))
            .then(passThroughAwait(audioTrack => expect(audioTrack.artistAddress).to.equal('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC')))
            .then(passThroughAwait(audioTrack => expect(audioTrack.name).to.equal('Some Arbitrary Name')))
            .then(passThroughAwait(audioTrack => expect(audioTrack.seller).to.equal(config().deployer)))
            .then(passThroughAwait(audioTrack => expect(audioTrack.royalty).to.equal(parseBigNumber(0.2))))
            .then(passThroughAwait(audioTrack => expect(audioTrack.price).to.equal(parseBigNumber(1))))
            .then(passThroughAwait(audioTrack => expect(audioTrack.uri).to.equal('https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/')))
    );

});