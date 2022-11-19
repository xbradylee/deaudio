import {Msg} from "./centralMsgBus";
import {Artist, AudioTrack, Provider} from "../types";
import Web3Modal from "web3modal";
import {Web3Provider} from "@ethersproject/providers";


export type ProviderMsg = Msg<'provider', Provider>
export type Web3ProviderMsg = Msg<'web-3-provider', Web3Provider>
export type ModalConnectedMsg = Msg<'modal-connected', Web3Modal>
export type ModalNotFoundMsg = Msg<'modal-not-found'>
export type EthereumNetworkConnectedMsg = Msg<'ethereum-network-connected'>
export type EthereumNetworkConnectionErrorMsg = Msg<'ethereum-network-connection-error'>
export type ButtonClickedMsg =  Msg<'component.button.clicked', {buttonName: string}>
export type ArtistsMsg = Msg<'artists', Artist[]>
export type ArtistButtonClickedMsg = Msg<'artist-button-clicked', { artistAddress: string }>
export type AudioTracksMsg = Msg<'audio-tracks', AudioTrack[]>
export type AudioTracksOnSaleMsg = Msg<'audio-tracks-on-sale', AudioTrack[]>
export type MyAudioTracksMsg = Msg<'my-audio-tracks', AudioTrack[]>
export type AudioTracksByArtistMsg = Msg<'audio-tracks-by-artist', AudioTrack[]>
export type BuyAudioTrackMsg = Msg<'buy-audio-track', { tokenId: number }>
export type BuyAudioTrackCompletedMsg = Msg<'buy-audio-track-completed'>
export type BuyAudioTrackErrorMsg = Msg<'buy-audio-track-error'>
export type RelistAudioTrackMsg = Msg<'relist-audio-track', { tokenId: number, price: number }>
export type RelistAudioTrackCompletedMsg = Msg<'relist-audio-track-completed'>
export type RelistAudioTrackErrorMsg = Msg<'relist-audio-track-error'>
