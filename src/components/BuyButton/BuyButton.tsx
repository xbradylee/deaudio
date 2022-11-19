import React, {PropsWithChildren} from 'react';
import {Button} from "../Button";
import {sendEvent} from "../../store/centralMsgBus";
import {BuyAudioTrackMsg} from "../../store/msg";

interface BuyButtonProps {
    tokenId: number
}

export const BuyButton: React.FC<PropsWithChildren<BuyButtonProps>> = ({ tokenId }) => {

    return(
        <Button
            name={'buy-button'}
            onClick={() => sendEvent<BuyAudioTrackMsg>('buy-audio-track', { tokenId })}
        >
            Buy Now
        </Button>
    )
};