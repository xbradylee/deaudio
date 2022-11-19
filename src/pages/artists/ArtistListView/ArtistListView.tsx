import React, {PropsWithChildren} from 'react';
import {ArtistButton} from "../../../components/ArtistButton/ArtistButton";
import {IonGrid} from "@ionic/react";
import CSS from "csstype";
import {gridStyle} from "../../commonStyles";
import {useArtists} from "../../../store/artistStore";


interface ArtistListViewProps {
    onClick: () => unknown
}

export const ArtistListView: React.FC<PropsWithChildren<ArtistListViewProps>> = ({ onClick }) => {

    const artists = useArtists();

    return(
        <IonGrid style={style.grid}>
            {(artists) &&
                artists.map(artist =>
                    <ArtistButton key={artist.artistAddress} artist={artist} onClick={onClick} />
                )
            }
        </IonGrid>
    )
};

const style: Record<string, CSS.Properties> = {
    grid: {
        ...gridStyle,
        width: '70%',
        paddingTop: '4em',
    }
};