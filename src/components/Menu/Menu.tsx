import React from 'react';
import {IonContent, IonList, IonMenu} from '@ionic/react';
import {musicalNotes, musicalNoteSharp, person, personSharp, star, starSharp} from 'ionicons/icons';
import "./Menu.css";
import {MenuHeader} from './MenuHeader';
import {MenuDivider} from "./MenuDivider";
import {MenuItem} from "./MenuItem";

export const Menu: React.FC = () => {
    return (
        <IonMenu content-id="main">
            <IonContent>
                <IonList>

                    <MenuHeader />

                    <MenuItem title={'Market'} routerLink={'/market'} iosIcon={musicalNotes} mdIcon={musicalNoteSharp} />
                    <MenuItem title={'Profile'} routerLink={'/profile'} iosIcon={person} mdIcon={personSharp} />
                    <MenuItem title={'Artists'} routerLink={'/artists'} iosIcon={star} mdIcon={starSharp} />

                    <MenuDivider />

                </IonList>
            </IonContent>
        </IonMenu>
    )
};