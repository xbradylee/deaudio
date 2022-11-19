import React, {PropsWithChildren} from 'react';
import {ReturnIcon} from "../../../components/ReturnIcon";
import {AudioTrackList} from "../../../components/AudioTrackList/AudioTrackList";
import {useAudioTracksByArtist} from "../../../store/audioTrackStore";


interface AudioTracksViewProps {
    onReturn: () => void
}

export const AudioTracksView: React.FC<PropsWithChildren<AudioTracksViewProps>> = ({ onReturn }) => {

    const audioTracksByArtist = useAudioTracksByArtist();

    return(
        <>
            <ReturnIcon onReturn={onReturn} />
            <AudioTrackList audioTracks={audioTracksByArtist} />
        </>
    )
};