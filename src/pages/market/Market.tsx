import React from 'react';
import {IonGrid} from "@ionic/react";
import CSS from 'csstype';
import {useAudioTracksOnSale} from "../../store/audioTrackStore";
import {Web3AuthGuard} from "../../components/Web3AuthGuard";
import {AudioTrackList} from "../../components/AudioTrackList/AudioTrackList";

export const Market: React.FC = () => {

    const audioTracks = useAudioTracksOnSale();

    return (
        <Web3AuthGuard>
            <IonGrid style={style.grid}>
                <AudioTrackList audioTracks={audioTracks} action={'buy'} />
            </IonGrid>
        </Web3AuthGuard>
    )
};

const style: Record<string, CSS.Properties> = {
    grid: {
        padding: '1em'
    }
};