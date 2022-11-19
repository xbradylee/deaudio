import {IonIcon, IonItem, IonLabel, IonMenuToggle} from "@ionic/react";
import React from "react";

export interface MenuItemProps {
    title: string;
    routerLink: string;
    iosIcon?: string;
    mdIcon?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({title, routerLink, iosIcon, mdIcon}) => {

    return (
        <IonMenuToggle autoHide={false}>

            <IonItem
                color="transparent"
                style={menuItemStyle}
                routerDirection="none"
                lines="none"
                detail={false}
                routerLink={routerLink}
                className={'selected'}
            >

                {(iosIcon && mdIcon) &&
                    <IonIcon slot="start" style={menuItemStyle} ios={iosIcon} md={mdIcon} />
                }
                <IonLabel>{title}</IonLabel>

            </IonItem>

        </IonMenuToggle>
    )
};

const menuItemStyle = {
    color: '#c9d1d9'
};