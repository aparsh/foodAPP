import React, { Component } from 'react';
import About from './AboutComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { View, Platform, Text } from 'react-native';

class AboutNavigation extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        const AboutNavigator = createStackNavigator({
            Home: { screen: About ,navigationOptions: ({ navigation }) => ({
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
            })}
          });
        const AboutComponent = createAppContainer(AboutNavigator);
        
        return (
            <View style={{flex:1, 
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <AboutComponent/>
            </View>
        );
    }
}

export default AboutNavigation;