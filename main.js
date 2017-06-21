import Expo from 'expo';
import React from 'react';
import createDrawer from './src/Drawer';
import {isSignedIn} from './src/authentication/auth';

class App extends React.Component {

    constructor() {
        super();
        this.state = {ready: false}
    }

    componentDidMount() {
        isSignedIn((err, result) => {
            this.setState({signedIn: result, ready: true})
        })
    }

    render() {
        if(this.state.ready) {
            return this.renderApplication()
        } else {
            return this.renderWaiting();
        }
    }

    renderWaiting() {
        return null
    }

    renderApplication() {
        let Drawer = createDrawer(this.state.signedIn);
        return <Drawer/>
    }
}

Expo.registerRootComponent(App);

