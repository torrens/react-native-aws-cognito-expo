import React from 'react';
import {Image, Text, View} from 'react-native';
import { Card, Button } from "react-native-elements";
import utils from './utils';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class AboutView extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return ({
            drawerIcon: ({ tintColor, focused }) => (
                <FAIcon name={'info'} size={20} color={tintColor}/>
            )
        })
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        utils.getEmailUserID((err, result) => {
            if(!err) {
                this.setState({userName: result.email});
            }
        })
    }

    render() {
        console.log('rendering about')
        return (
            <View style={{flex: 1, backgroundColor: '#D4D4D4', paddingVertical: 50, alignItems: 'center'}}>
                <Image source={require('../assets/icons/app-icon.png')} style={{width: 75, height: 75}}/>
                <Card title='About'>
                    <Text style={{marginBottom: 30}}>
                        User: {this.state.userName}
                    </Text>
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='OK'
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                </Card>
            </View>
        )
    }
}

export default AboutView;