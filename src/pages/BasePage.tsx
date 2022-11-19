import React, {PropsWithChildren} from 'react';
import {IonContent, IonGrid, IonPage} from "@ionic/react";

export const BasePage: React.FC<PropsWithChildren<{}>> = ({children}) => {

    return (
        <IonPage id="main">
            <IonContent fullscreen>
                <IonGrid>
                    {children}
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};