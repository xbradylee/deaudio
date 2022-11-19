import React, {PropsWithChildren, useState} from 'react';
import {IonInput} from "@ionic/react";
import {RelistButton} from "../../RelistButton/RelistButton";

interface RelistContentProps {
    tokenId: number
}

export const RelistContent: React.FC<PropsWithChildren<RelistContentProps>> = ({
    tokenId,
}) => {

    const [relistPrice, setRelistPrice] = useState<number>(0);

    return(
        <>
            <IonInput
                type={'number'}
                value={relistPrice}
                onIonChange={(event) => setRelistPrice(event.detail.value as unknown as number)}
            />
            <RelistButton
                tokenId={tokenId}
                price={relistPrice}
            />
        </>
    )
};