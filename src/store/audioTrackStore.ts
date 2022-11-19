import {eventListener, sendEvent} from "./centralMsgBus";
import {bind} from "@react-rxjs/core";
import {provider$} from "./web3Store";
import {filter, merge, switchMap, tap, timer, withLatestFrom} from "rxjs";
import {AudioTrack} from "../types";
import {buyAudioTrack, getAudioTracksOnSale, getMyAudioTracks, relistAudioTrack} from "../services/audioTrackService";
import {Web3Provider} from "@ethersproject/providers";
import {withDeAudioContract} from "../services/web3Service";
import {
    AudioTracksByArtistMsg,
    AudioTracksMsg,
    AudioTracksOnSaleMsg,
    BuyAudioTrackCompletedMsg,
    BuyAudioTrackErrorMsg,
    BuyAudioTrackMsg,
    MyAudioTracksMsg, ProviderMsg,
    RelistAudioTrackCompletedMsg,
    RelistAudioTrackErrorMsg,
    RelistAudioTrackMsg
} from "./msg";


export const [useAudioTracks, audioTracks] = bind<AudioTrack[]>(
    eventListener<AudioTracksMsg>('audio-tracks'), []
);

audioTracks.subscribe();



export const [useAudioTracksOnSale, audioTracksOnSale] = bind<AudioTrack[]>(
    eventListener<AudioTracksOnSaleMsg>('audio-tracks-on-sale'), []
);

audioTracksOnSale.subscribe();



export const [useMyAudioTracks, myAudioTracks] = bind<AudioTrack[]>(
    eventListener<MyAudioTracksMsg>('my-audio-tracks'), []
);

myAudioTracks.subscribe();


export const [useAudioTracksByArtist, audioTracksByArtist] = bind<AudioTrack[]>(
    eventListener<AudioTracksByArtistMsg>('audio-tracks-by-artist'), []
);


merge(
    timer(0, 10_000),
    eventListener<ProviderMsg>('provider')
).pipe(
    withLatestFrom(provider$),
    filter(([_, provider]) => provider.isConnected),
    switchMap(([_, provider]) => withDeAudioContract(provider.web3Provider, getAudioTracksOnSale)),
    tap(tokens => sendEvent<AudioTracksOnSaleMsg>('audio-tracks-on-sale', tokens))
).subscribe();


merge(
    timer(0, 10_000),
    eventListener<ProviderMsg>('provider')
).pipe(
    withLatestFrom(provider$),
    filter(([_, provider]) => provider.isConnected),
    switchMap(([_, provider]) => withDeAudioContract(provider.web3Provider, getMyAudioTracks)),
    tap(tokens => sendEvent<MyAudioTracksMsg>('my-audio-tracks', tokens))
).subscribe();


eventListener<BuyAudioTrackMsg>('buy-audio-track').pipe(
    withLatestFrom(provider$),
    tap(([msg, provider]) => doBuyAudioTrack(provider.web3Provider, msg.tokenId))
).subscribe();


eventListener<RelistAudioTrackMsg>('relist-audio-track').pipe(
    withLatestFrom(provider$),
    tap(([msg, provider]) => doRelistAudioTrack(provider.web3Provider, msg.tokenId, msg.price))
).subscribe();


const doBuyAudioTrack = (provider: Web3Provider, tokenId: number) =>
    withDeAudioContract(provider, buyAudioTrack(tokenId))
        .then(() => sendEvent<BuyAudioTrackCompletedMsg>('buy-audio-track-completed'))
        .catch(() => sendEvent<BuyAudioTrackErrorMsg>('buy-audio-track-error'));


const doRelistAudioTrack = (provider: Web3Provider, tokenId: number, price: number) =>
    withDeAudioContract(provider, relistAudioTrack(tokenId, price))
        .then(() => sendEvent<RelistAudioTrackCompletedMsg>('relist-audio-track-completed'))
        .catch(() => sendEvent<RelistAudioTrackErrorMsg>('relist-audio-track-error'));