import {eventListener, sendEvent} from "./centralMsgBus";
import {provider$} from "./web3Store";
import {switchMap, tap, withLatestFrom} from "rxjs";
import {bind} from "@react-rxjs/core";
import {getAudioTracksByArtist} from "../services/audioTrackService";
import {getArtists} from "../services/artistService";
import {withDeAudioContract} from "../services/web3Service";
import {Artist} from "../types";
import {ArtistButtonClickedMsg, ArtistsMsg, AudioTracksByArtistMsg, ProviderMsg} from "./msg";


export const [useArtists, artists] = bind<Artist[]>(eventListener<ArtistsMsg>('artists'), []);

artists.subscribe();


eventListener<ProviderMsg>('provider').pipe(
    switchMap(provider => withDeAudioContract(provider.web3Provider, getArtists)),
    tap(artists => sendEvent<ArtistsMsg>('artists', artists))
).subscribe();


eventListener<ArtistButtonClickedMsg>('artist-button-clicked').pipe(
    withLatestFrom(provider$),
    switchMap(([msg, provider]) => withDeAudioContract(provider.web3Provider, getAudioTracksByArtist(msg.artistAddress))),
    tap(tokensByArtist => sendEvent<AudioTracksByArtistMsg>('audio-tracks-by-artist', tokensByArtist))
).subscribe();