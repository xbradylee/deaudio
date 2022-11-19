/**
 * @jest-environment node
 */
import {ethers} from "hardhat";
import {getArtists} from "./artistService";
import {DeAudio} from "../../typechain-types";
import {expect} from "chai";


describe('artist service', () => {

    it('should retrieve artists from smart contract', () =>
        ethers.getContractFactory("DeAudio")
            .then(contractFactory => contractFactory.deploy())
            .then(contract => contract.addArtist('0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', 'some-name')
                .then(() => contract))
            .then(getArtists)
            .then(artists => expect(artists).to.deep.equal([["0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", "some-name"]]))
    );

});