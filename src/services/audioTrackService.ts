import {AudioTrack} from "../types";
import {DeAudio} from "../../typechain-types";
import {formatEther, parseBigNumber} from "../utils";


export const getAudioTracksOnSale = (contract: DeAudio): Promise<AudioTrack[]> =>
    contract.getAudioTracksOnSale()
        .then(tokens => tokens.map(parseAudioTrack));


export const getMyAudioTracks = (contract: DeAudio): Promise<AudioTrack[]> =>
    contract.getMyAudioTracks()
        .then(tokens => tokens.map(parseAudioTrack));


export const getAudioTracksByArtist = (artistAddress: string) => (contract: DeAudio): Promise<AudioTrack[]> =>
    contract.getAudioTracksByArtist(artistAddress)
        .then(tokens => tokens.map(parseAudioTrack));


export const buyAudioTrack = (tokenId: number) => (contract: DeAudio) =>
    contract.audioTracks(tokenId)
        .then(audioTrack => contract.buyAudioTrack(tokenId, {value: audioTrack.price}));


export const relistAudioTrack = (tokenId: number, relistPrice: number) => (contract: DeAudio) =>
    contract.relistAudioTrack(tokenId, parseBigNumber(relistPrice));


export const parseAudioTrack = (audioTrack: DeAudio.AudioTrackStructOutput): AudioTrack => ({
    tokenId: audioTrack.tokenId.toNumber(),
    artistAddress: audioTrack.artistAddress,
    name: audioTrack.name,
    seller: audioTrack.seller,
    royalty: +formatEther(audioTrack.royalty),
    price: +formatEther(audioTrack.price),
    uri: audioTrack.uri
});


