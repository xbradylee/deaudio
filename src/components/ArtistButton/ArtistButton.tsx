import React, {PropsWithChildren} from 'react';
import {Button} from "../Button";
import {sendEvent} from "../../store/centralMsgBus";
import {ArtistButtonClickedMsg} from "../../store/msg";
import {Artist} from "../../types";

interface ArtistButtonProps {
    artist: Artist,
    onClick?: () => void
}

export const ArtistButton: React.FC<PropsWithChildren<ArtistButtonProps>> = ({
    artist,
    onClick = () => {}
}) => {

    return(
        <Button
            key={artist.artistAddress}
            name={artist.name}
            onClick={() => {
                sendEvent<ArtistButtonClickedMsg>('artist-button-clicked', {artistAddress: artist.artistAddress });
                onClick();
            }}
        >
            {artist.name}
        </Button>
    )
};