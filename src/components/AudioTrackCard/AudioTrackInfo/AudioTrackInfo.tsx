import React, {PropsWithChildren} from 'react';
import {IonRow} from "@ionic/react";
import {TokenAction} from "../../../types";

interface AudioTrackInfoProps {
    name: string,
    action?: TokenAction,
    price?: number
}

export const AudioTrackInfo: React.FC<PropsWithChildren<AudioTrackInfoProps>> = ({ name, action, price }) => {

    return(
        <>
            <IonRow>
                {name}
            </IonRow>
            {action === 'buy' &&
                <IonRow>
                    Price: {price} ETH
                </IonRow>
            }
        </>
    )
};