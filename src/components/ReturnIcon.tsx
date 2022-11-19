import React from 'react';
import {IonIcon, IonItem} from "@ionic/react";
import {arrowBackOutline} from "ionicons/icons";
import CSS from "csstype";

interface ReturnIconProps {
    onReturn: () => void
}

export const ReturnIcon: React.FC<ReturnIconProps> = ({onReturn}) => {
    return (
        <IonItem style={style.item}>
            <IonIcon style={style.back} icon={arrowBackOutline} onClick={onReturn} />
        </IonItem>
    )
};

const style: Record<string, CSS.Properties> = {
    item: {
        fontWeight: '700',
        color: '#c9d1d9',
        marginBottom:'1em'
    },
    back:{
        cursor: 'pointer',
        color: '#c9d1d9'
    },
};