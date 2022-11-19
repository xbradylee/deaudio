import React from 'react';
import {IonCard, IonCardContent} from "@ionic/react";
import CSS from "csstype";

interface LoaderProps {
    loading: boolean,
}

export const Loader: React.FC<LoaderProps> = ({loading}) => {

    return (
        <>
            {(loading) &&
                <IonCard style={cardStyle}>
                    <IonCardContent style={cardContentStyle}>
                        <strong>Loading...</strong>
                    </IonCardContent>
                </IonCard>
            }
        </>
    )
};

const cardStyle: CSS.Properties = {
    background: "transparent",
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
};

const cardContentStyle: CSS.Properties = {
    margin: 'auto',
    textAlign: 'center',
    color: 'white'
};