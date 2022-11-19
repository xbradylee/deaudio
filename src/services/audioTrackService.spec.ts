/**
 * @jest-environment node
 */
import {ethers} from "hardhat";
import {DeAudio} from "../../typechain-types";
import {expect} from "chai";
import {BigNumber} from "ethers";
import {
    buyAudioTrack,
    getAudioTracksByArtist,
    getAudioTracksOnSale,
    getMyAudioTracks,
    parseAudioTrack, relistAudioTrack
} from "./audioTrackService";
import {AudioTrack} from "../types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {passThroughAwait} from "promise-passthrough";
import {parseBigNumber} from "../utils";


describe('audio track service', () => {

    let contract: DeAudio;
    let deployer: SignerWithAddress;
    let artist1: SignerWithAddress;
    let user: SignerWithAddress;

    beforeEach(async () => {
        const contractFactory = await ethers.getContractFactory("DeAudio");
        [deployer, artist1, user] = await ethers.getSigners();
        contract = await contractFactory.deploy();
        await contract.connect(deployer).addArtist(artist1.address, 'Ardie Son');
        await contract.connect(deployer).mint(
            artist1.address,
            'Wildfires',
            parseBigNumber(0.01),
            parseBigNumber(1),
            'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/'
        )
    });


    it('should retrieve audio tracks that are on sale', () =>
        getAudioTracksOnSale(contract)
            .then(audioTracks => expect(audioTracks).to.deep.equal([{
                artistAddress: artist1.address,
                name: "Wildfires",
                price: 1,
                royalty: 0.01,
                seller: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                tokenId: 0,
                uri: "https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/"
            }]))
    );


    it('should retrieve the audio tracks that are owned by a user', () =>
        contract.connect(deployer).buyAudioTrack(0, {value: parseBigNumber(1)})
            .then(() => getMyAudioTracks(contract))
            .then(audioTracks => expect(audioTracks).to.deep.equal([{
                artistAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                name: "Wildfires",
                price: 1,
                royalty: 0.01,
                seller: "0x0000000000000000000000000000000000000000",
                tokenId: 0,
                uri: "https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/"
            }]))
    );


    it('should retrieve audio tracks of an artist', () =>
        getAudioTracksByArtist(artist1.address)(contract)
            .then(audioTracks => expect(audioTracks).to.deep.equal([{
                artistAddress: artist1.address,
                name: "Wildfires",
                price: 1,
                royalty: 0.01,
                seller: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                tokenId: 0,
                uri: "https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/"
            }]))
    );


    it('should be able to buy audio track and transfer the ownership of the audio track to the buyer', () =>
        Promise.resolve(contract.connect(user))
            .then(passThroughAwait(buyAudioTrack(0)))
            .then(contract => contract.ownerOf(0))
            .then(owner => expect(owner).to.equal(user.address))
    );


    it('should be able to relist an audio track for sale', () =>
        Promise.resolve(contract.connect(user))
            .then(passThroughAwait(buyAudioTrack(0)))
            .then(passThroughAwait(relistAudioTrack(0, 2)))
            .then(contract => contract.audioTracks(0))
            .then(audioTrack => expect(audioTrack.price).to.equal(parseBigNumber(2)))
    );


    it('should parse audio track returned from the smart contract', () =>
        Promise.resolve({
            tokenId: BigNumber.from([1]),
            artistAddress: 'some-artist-address',
            name: 'some-track-name',
            seller: 'some-seller-address',
            royalty: parseBigNumber(2),
            price: parseBigNumber(3),
            uri: 'some uri'
        } as DeAudio.AudioTrackStructOutput)
            .then(parseAudioTrack)
            .then(audioTrack => expect(audioTrack).to.deep.equal({
                tokenId: 1,
                artistAddress: 'some-artist-address',
                name: 'some-track-name',
                seller: 'some-seller-address',
                royalty: 2,
                price: 3,
                uri: 'some uri'
            } as AudioTrack))
    );

});