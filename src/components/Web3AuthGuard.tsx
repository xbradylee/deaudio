import React, {PropsWithChildren, useEffect, useState} from "react";
import {IonGrid} from "@ionic/react";
import {Button} from "./Button";
import {doConnectWeb3Modal, useProvider} from "../store/web3Store";
import {eventListener} from "../store/centralMsgBus";
import {ModalConnectedMsg, ModalNotFoundMsg} from "../store/msg";
import {tap} from "rxjs";
import {Loader} from "./Loader";
import {gridStyle} from "../pages/commonStyles";


interface Web3AuthGuardProps {}

export const Web3AuthGuard: React.FC<PropsWithChildren<Web3AuthGuardProps>> = ({children}) => {

    const [isModalInstalled, setIsModalInstalled] = useState<boolean>(true);
    const provider = useProvider();

    provider.isConnected || doConnectWeb3Modal();

    useEffect(() => {
        const sub = eventListener<ModalNotFoundMsg>('modal-not-found').pipe(
            tap(() => setIsModalInstalled(false)),
        ).subscribe();
        return () => sub.unsubscribe();
    }, []);

    useEffect(() => {
        const sub = eventListener<ModalConnectedMsg>('modal-connected').pipe(
            tap(() => setIsModalInstalled(true)),
        ).subscribe();
        return () => sub.unsubscribe();
    }, []);

    return (
        <>
            <Loader loading={isModalInstalled && !provider.isConnected} />

            <IonGrid style={gridStyle} hidden={isModalInstalled || provider.isConnected}>
                <Button
                    name={'web-3-authguard.open-metamask-download-link'}
                    onClick={() => window.open("https://metamask.io/download/")}
                >
                    Install MetaMask
                </Button>
            </IonGrid>

            {provider.isConnected && isModalInstalled && children}
        </>
    )
};