import React from 'react';
import {IonGrid} from "@ionic/react";
import CSS from 'csstype';
import {Web3AuthGuard} from "../../components/Web3AuthGuard";
import {useMyAudioTracks} from "../../store/audioTrackStore";
import {AudioTrackList} from "../../components/AudioTrackList/AudioTrackList";


export const Profile: React.FC = () => {

    const audioTracks = useMyAudioTracks();

    return (
        <Web3AuthGuard>
            <IonGrid style={style.grid}>
                <AudioTrackList audioTracks={audioTracks} action={'relist'} />
            </IonGrid>
        </Web3AuthGuard>
    )
};

const style: Record<string, CSS.Properties> = {
    grid: {
        padding: '1em'
    }
};