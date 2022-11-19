import React, {HTMLAttributes, MouseEventHandler, PropsWithChildren} from 'react';
import {IonButton} from "@ionic/react";
import CSS from 'csstype';
import {sendEvent} from "../store/centralMsgBus";
import {ButtonClickedMsg} from "../store/msg";

interface ButtonProps extends HTMLAttributes<HTMLIonButtonElement> {
    name: string,
    btnType?: 'default'
    disabled?: boolean
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    children,
    btnType = 'default',
    name,
    disabled = false,
    onClick,
    ...props
}) => {
    const onBtnClick: MouseEventHandler<HTMLIonButtonElement> = (ev) => {
        onClick?.(ev)
        sendEvent<ButtonClickedMsg>('component.button.clicked', {buttonName: name});
    }

    return (
        <IonButton onClick={onBtnClick} fill="clear" style={buttonStyles[btnType]} disabled={disabled} {...props}>
            {children}
        </IonButton>
    )
};


const buttonStyles: Record<string, CSS.Properties> = {
    default: {
        color: 'white',
        borderRadius: '2em',
        width: '100%',
        border: 'solid 0.2em white',
        fontSize: '1em',
    }
};