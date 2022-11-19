import React, {PropsWithChildren} from 'react';
import {BuyButton} from "../../BuyButton/BuyButton";
import CSS from "csstype";

interface BuyContentProps {
    tokenId: number,
    type?: 'default'
}

export const BuyContent: React.FC<PropsWithChildren<BuyContentProps>> = ({
    tokenId,
    type = 'default'
}) => {

    return(
        <div style={styles[type].button}>
            <BuyButton tokenId={tokenId} />
        </div>
    )
};

const styles: Record<string, Record<string, CSS.Properties>> = {
    default: {
        button:{
            display: 'flex',
            alignItems: 'center'
        },
    }
};