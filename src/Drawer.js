import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import createRootNavigator from './MainNavStack';
import AboutView from './AboutView';
import SignOutView from './authentication/SignOutView';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
    <View style={{ flex: 1, backgroundColor: '#d4d4d4' }}>
        <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('../assets/icons/app-icon.png')}
                style={{width: 75, height: 75}}
                resizeMode="contain"
            />
        </View>
        <DrawerItems {...props} />
    </View>
);

const createDrawer = (signedIn) => {
    return DrawerNavigator(
        {
            Main: {
                screen: createRootNavigator(signedIn),
            },
            Logout: {
                screen: SignOutView,
            },
            About: {
                screen: AboutView,

            },
        },
        {
            initialRouteName: 'Main',
            contentOptions: {
                activeTintColor: '#03A9F4',
            },
            drawerWidth: SCREEN_WIDTH * 0.6,
            contentComponent: CustomDrawerContentComponent
        });
};

export default createDrawer;