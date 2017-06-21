import React from "react";
import {Image, Text, ScrollView, View, KeyboardAvoidingView} from "react-native";
import {Button, Card, FormInput, FormLabel, FormValidationMessage} from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {onRegister} from "./auth";

class RegisterView extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailValidationError: '',
            password: '',
            passwordValidationError: '',
            confirmPassword: '',
            confirmPasswordValidationError: '',
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

        if(name === 'password') {
            this.setState({'password': value}, () => {
                setValidate();
            })
        }

        if(name === 'confirmPassword') {
            this.setState({'confirmPassword': value}, () => {
                setValidate();
                if(value !== this.state.password) {
                    this.setState({confirmPasswordValidationError:'Passwords don\'t match',
                        passwordValidationError:'Passwords don\'t match'})
                } else {
                    this.setState({confirmPasswordValidationError:'',
                        passwordValidationError:''})
                }
            })
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView style={{paddingVertical: 30}}>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('../../assets/icons/app-icon.png')} style={{width: 75, height: 75}}/>
                </View>
                { this.getErrorDisplay() &&
                    <View style={{alignItems: 'center'}}>
                        <Text style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 30,
                            color: 'red',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>{this.getErrorDisplay()}</Text>
                    </View>
                }
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..." value={this.state.email} onChangeText={(text) => this.setFieldState('email', text)}/>
                    <FormValidationMessage>{this.state.emailValidationError}</FormValidationMessage>
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..." value={this.state.password} onChangeText={(text) => this.setFieldState('password', text)}/>
                    <FormValidationMessage>{this.state.passwordValidationError}</FormValidationMessage>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Confirm Password..." value={this.state.confirmPassword} onChangeText={(text) => this.setFieldState('confirmPassword', text)}/>
                    <FormValidationMessage>{this.state.confirmPasswordValidationError}</FormValidationMessage>

                    <Button
                        disabled={!this.getButtonState()}
                        buttonStyle={{marginTop: 10}}
                        backgroundColor="#03A9F4"
                        title="Register"
                        loading={this.state.loading}
                        onPress={() => {
                            onRegister(this.state.email, this.state.password, (err) => {
                                if (err) {
                                    this.setState({loading:false, 'error': err.message}, () => {
                                        this.render();
                                    });
                                } else {
                                    let action = {
                                        type: 'Navigation/RESET',
                                        index: 0,
                                        actions: [{ type: 'Navigate', routeName:'Verify', params: this.state.email}]};
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
            this.state.passwordValidationError ||
            this.state.confirmPasswordValidationError ||
            this.state.email.length === 0 ||
            this.state.password.length === 0 ||
            this.state.confirmPassword.length === 0 ||
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

export default RegisterView