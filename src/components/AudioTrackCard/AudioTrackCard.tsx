import React, {PropsWithChildren} from 'react';
import {Card} from "../Card";
import {IonCol, IonRow} from "@ionic/react";
import {AudioTrack, TokenAction} from "../../types";
import {AudioTrackInfo} from "./AudioTrackInfo/AudioTrackInfo";
import {AudioTrackActionContent} from "./AudioTrackActionContent/AudioTrackActionContent";
import CSS from "csstype";

interface AudioTrackCardProps {
    audioTrack: AudioTrack,
    action?: TokenAction,
    type?: 'default'
}

export const AudioTrackCard: React.FC<PropsWithChildren<AudioTrackCardProps>> = ({
    audioTrack,
    action,
    type = 'default'
}) => {

    return(
        <Card>
            <IonRow>
                <IonCol size-sm={"12"} size-md={"4"}>
                    <AudioTrackInfo action={action} name={audioTrack.name} price={audioTrack.price} />
                </IonCol>
                <IonCol size-sm={"12"} size-md={"4"} style={styles[type].audio}>
                    <audio src={audioTrack.uri} controls />
                </IonCol>
                <IonCol size-sm={"12"} size-md={"4"}>
                    <AudioTrackActionContent tokenId={audioTrack.tokenId} action={action} />
                </IonCol>
            </IonRow>
        </Card>
    )
};

const styles: Record<string, Record<string, CSS.Properties>> = {
    default: {
        audio:{
            display: 'flex',
            alignItems: 'center'
        },
    }
};