import React from 'react';
import {AsyncStorage} from "react-native";
import SignInView from './SignInView';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class SignOutView extends SignInView {

    static navigationOptions = ({ navigation }) => {
        return ({
            drawerIcon: ({ tintColor, focused }) => (
                <FAIcon name={'sign-out'} size={20} color={tintColor}/>
            )
        })
    };

    constructor(props) {
        props.signout = true;
        super(props)
    }

    
	componentDidMount() {
        AsyncStorage.removeItem('USER_ID');
    }
}

export default SignOutView
