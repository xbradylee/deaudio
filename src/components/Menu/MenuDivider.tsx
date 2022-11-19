import React from "react";
import {IonItem} from "@ionic/react";


export const MenuDivider: React.FC = () => {

    return (
        <IonItem style={menuDividerStyles} color="transparent" />
    )
};

const menuDividerStyles = {
    color: 'white'
};