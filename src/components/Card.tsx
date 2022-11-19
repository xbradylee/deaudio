import {IonCard, IonCardContent} from '@ionic/react';
import React, {PropsWithChildren} from 'react';
import CSS from "csstype";

interface CardProps {
    cardType?: 'default'
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
    cardType = 'default',
    children
}) => {

    return(
        <IonCard style={styles[cardType].card}>
            <IonCardContent>
                {children}
            </IonCardContent>
        </IonCard>
    )
};

const styles: Record<string, Record<string, CSS.Properties>> = {
    default: {
        card:{
            borderRadius: '1em',
            border:'solid #30363d 0.2em',
            background: "#161b22",
            margin: '1em',
        },
    }
};