import React, {PropsWithChildren} from 'react';
import {Button} from "../Button";
import {sendEvent} from "../../store/centralMsgBus";
import {RelistAudioTrackMsg} from "../../store/msg";

interface RelistButtonProps {
    tokenId: number,
    price: number
}

export const RelistButton: React.FC<PropsWithChildren<RelistButtonProps>> = ({ tokenId, price }) => {

    return(
        <Button
            name={'relist-button'}
            onClick={() => sendEvent<RelistAudioTrackMsg>('relist-audio-track', { tokenId, price })}
        >
            Relist
        </Button>
    )
};