import {ExternalProvider, Web3Provider} from "@ethersproject/providers";
import {bind} from "@react-rxjs/core";
import {combineLatest, filter, map, mergeMap, of, tap} from "rxjs";
import {newWeb3Provider, web3Modal} from "../services/web3Service";
import {debounce} from "lodash";
import {Signer} from "ethers";
import {eventListener, sendEvent} from "./centralMsgBus";
import {config} from "../config";
import {Provider} from "../types";
import {
    EthereumNetworkConnectedMsg,
    EthereumNetworkConnectionErrorMsg,
    ModalConnectedMsg,
    ModalNotFoundMsg,
    ProviderMsg,
    Web3ProviderMsg
} from "./msg";



export const provider$ = eventListener<ProviderMsg>('provider');

export const [useProvider] = bind<Provider>(provider$, {
    web3Provider: {} as Web3Provider,
    isConnected: false,
    signer: {} as Signer,
});


eventListener<ModalConnectedMsg>('modal-connected').pipe(
    map(modal => newWeb3Provider(modal as ExternalProvider)),
    tap((provider) => sendEvent<Web3ProviderMsg>('web-3-provider', provider)),
).subscribe();


eventListener<Web3ProviderMsg>('web-3-provider').pipe(
    mergeMap(web3Provider =>  combineLatest([of(web3Provider), web3Provider.getNetwork()])),
    filter(([_, network]) => network.chainId !== config().networkId),
    tap(([web3Provider, _]) => sendEvent<ProviderMsg>('provider', {
        web3Provider: web3Provider,
        signer: web3Provider.getSigner(),
        isConnected: false,
    })),
    tap(() => sendEvent<EthereumNetworkConnectionErrorMsg>('ethereum-network-connection-error'))
).subscribe();


eventListener<Web3ProviderMsg>('web-3-provider').pipe(
    mergeMap(web3Provider =>  combineLatest([of(web3Provider), web3Provider.getNetwork()])),
    filter(([_, network]) => network.chainId === config().networkId),
    tap(([web3Provider, _]) => sendEvent<ProviderMsg>('provider', {
        web3Provider: web3Provider,
        signer: web3Provider.getSigner(),
        isConnected: true,
    })),
    tap(() => sendEvent<EthereumNetworkConnectedMsg>('ethereum-network-connected'))
).subscribe();


export const doConnectWeb3Modal = debounce(() =>
    web3Modal()
        .connect()
        .then(modal => sendEvent<ModalConnectedMsg>('modal-connected', modal))
        .catch(() => sendEvent<ModalNotFoundMsg>('modal-not-found')), 1_000, {leading: true});
