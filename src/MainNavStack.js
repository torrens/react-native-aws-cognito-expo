import React from 'react';
import { StatusBar } from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeView from './HomeView';
import SignInView from './authentication/SignInView';
import RegisterView from './authentication/RegisterView';
import VerifyView from './authentication/VerifyView';
import ResetPasswordView from "./authentication/ResetPasswordView";
import ChangePasswordView from "./authentication/ChangePasswordView";

const createRootNavigator = (signedIn) => {
    // For some reason the statusBar is set to a light color, this overrides that.
    StatusBar.setBarStyle('dark-content');

    return StackNavigator({
            SignIn: {
                screen: SignInView,
            },
            Register: {
                screen: RegisterView,
            },
            Verify: {
                screen: VerifyView,
            },
            Reset: {
                screen: ResetPasswordView,
            },
            ChangePassword: {
                screen: ChangePasswordView,
            },
            Home: {
                screen: HomeView,
            }
        },
        {
            headerMode: 'screen',
            initialRouteName: signedIn ? 'Home' : 'SignIn'
        });
};


export default createRootNavigator;
