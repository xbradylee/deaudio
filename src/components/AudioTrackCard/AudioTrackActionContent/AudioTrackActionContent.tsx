import React, {PropsWithChildren} from 'react';
import {TokenAction} from "../../../types";
import {BuyContent} from "./BuyContent";
import {RelistContent} from "./RelistContent";

interface AudioTrackActionContentProps {
    tokenId: number,
    action?: TokenAction,
}

export const AudioTrackActionContent: React.FC<PropsWithChildren<AudioTrackActionContentProps>> = ({ tokenId, action }) => {

    return(
        <>
            {action === 'buy' &&
                <BuyContent tokenId={tokenId} />
            }
            {action === 'relist' &&
                <RelistContent tokenId={tokenId} />
            }
        </>
    )
};