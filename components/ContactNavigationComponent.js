import React, { Component } from 'react';
import Contact from './ContactComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { View, Platform, Text } from 'react-native';

class ContactNavigation extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        const ContactNavigator = createStackNavigator({
            Home: { screen: Contact,navigationOptions: ({ navigation }) => ({
                headerLeft: ()=><View style={{ marginLeft: 15 }}><Icon name="menu" 
                size={24} 
                color= 'white'
                onPress={ () => this.props.navigation.toggleDrawer()} /></View>,
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerTintColor: "#fff"            
            }) }
          });
        const ContactComponent = createAppContainer(ContactNavigator);
        return (
            <View style={{flex:1, 
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <ContactComponent/>
            </View>
        );
    }
}

export default ContactNavigation;