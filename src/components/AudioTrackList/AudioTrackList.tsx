import React, {PropsWithChildren} from 'react';
import {AudioTrack, TokenAction} from "../../types";
import {AudioTrackCard} from "../AudioTrackCard/AudioTrackCard";


interface AudioTrackListProps {
    audioTracks: AudioTrack[],
    action?: TokenAction
}

export const AudioTrackList: React.FC<PropsWithChildren<AudioTrackListProps>> = ({ audioTracks, action }) => {

    return(
        <>
            {audioTracks.map(track =>
                <AudioTrackCard
                    key={track.tokenId}
                    audioTrack={track}
                    action={action}
                />
            )}
        </>
    )
};