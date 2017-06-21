import React from 'react';
import {Image, Text, View, KeyboardAvoidingView} from 'react-native';
import {Button, Card, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {onReset} from './auth';

class ResetPasswordView extends React.Component {

    static navigationOptions = ({navigation}) => {
        return ({
            header: null
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailValidationError: '',
            error: '',
            loading: false
        };
    }

    setFieldState(name, value) {
        const setValidate = () => {
            let state = {};
            state[name + 'ValidationError'] = null;
            if (value == '') {
                state[name + 'ValidationError'] = 'Required';
                this.setState(state)
            } else {
                state[name + 'ValidationError'] = '';
                this.setState(state)
            }
        }

        if(name === 'email') {
            this.setState({'email': value.toLowerCase()}, () => {
                setValidate();
            })
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView style={{paddingVertical: 30}}>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('../../assets/icons/app-icon.png')} style={{width: 75, height: 75}}/>
                </View>
                <View style={{alignItems: 'center'}}>
                    { this.getErrorDisplay() &&
                        <Text style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30, color:'red', fontSize:16, fontWeight: 'bold'}}>
                            {this.getErrorDisplay()}
                        </Text>
                    }
                </View>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..." value={this.state.email} onChangeText={(text) => this.setFieldState('email', text)}/>
                    <FormValidationMessage>{this.state.emailValidationError}</FormValidationMessage>

                    <Button
                        disabled={!this.getButtonState()}
                        buttonStyle={{marginTop: 10}}
                        backgroundColor="#03A9F4"
                        title="Reset Password"
                        loading={this.state.loading}
                        onPress={() => {
                            onReset(this.state.email, (err) => {
                                if (err) {
                                    this.setState({loading:false, 'error': err.message}, () => {
                                        this.render();
                                    });
                                } else {
                                    let action = {
                                        type: 'Navigation/RESET',
                                        index: 0,
                                        actions: [{ type: 'Navigate', routeName:'ChangePassword', params: this.state.email}]};
                                    this.props.navigation.dispatch(action);
                                }
                            });
                        }}
                    />
                    <Button
                        buttonStyle={{ marginTop: 0 }}
                        backgroundColor= 'transparent'
                        textStyle={{ color: '#03A9F4' }}
                        title="Sign In"
                        onPress={() => {
                            let action = {
                                type: 'Navigation/RESET',
                                index: 0,
                                actions: [{ type: 'Navigate', routeName:'SignIn'}]};
                            this.props.navigation.dispatch(action);
                        }}
                    />
                </Card>
            </KeyboardAwareScrollView>
        )
    }

    getButtonState() {
        if(this.state.emailValidationError ||
            this.state.email.length === 0 ||
            this.state.loading) {
            return false;
        } else {
            return true;
        }
    }

    getErrorDisplay() {
        if(this.state.error) {
            return <Text>{this.state.error}</Text>
        } else {
            return null
        }
    }
}


export default ResetPasswordView;