import React, {useState} from "react";
import {ArtistListView} from "./ArtistListView/ArtistListView";
import {AudioTracksView} from "./AudioTracksView/AudioTracksView";


export const Artists: React.FC = () => {

    const [view, setView] = useState<'artist-list' | 'audio-tracks'>('artist-list');

    return (
        <>
            {(view === 'artist-list') &&
                <ArtistListView onClick={() => setView('audio-tracks')} />
            }
            {(view === 'audio-tracks') &&
                <AudioTracksView onReturn={() => setView('artist-list')} />
            }
        </>
    )
};