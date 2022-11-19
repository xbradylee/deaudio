import React, {Suspense} from 'react';
import {Subscribe} from "@react-rxjs/core";
import {IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react'
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Route} from "react-router";
import {BasePage} from "./pages/BasePage";
import {Menu} from "./components/Menu/Menu";
import {Artists} from "./pages/artists/Artists";
import {Profile} from "./pages/profile/Profile";
import {Market} from "./pages/market/Market";
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import './theme/variables.css';


setupIonicReact();

export const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <Subscribe>
                    <IonSplitPane content-id="main">
                        <Menu/>
                        <AppBody/>
                    </IonSplitPane>
                </Subscribe>
            </IonReactRouter>
        </IonApp>
    );
}


const AppBody: React.FC = () => {

    return (
        <IonRouterOutlet id="main">
            <BasePage>
                <Suspense>
                    <Route path='/market' component={Market}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/artists' component={Artists}/>
                    <Redirect from="*" to="/market"/>
                </Suspense>
            </BasePage>
        </IonRouterOutlet>
    )

};
export default App;
