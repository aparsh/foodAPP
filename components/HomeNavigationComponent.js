import React, { Component } from 'react';
import Home from './HomeComponent';
import { View, Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'


class HomeNavigationComponent extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        const HomeNavigator = createStackNavigator({
            Home: { screen: Home, navigationOptions: ({ navigation }) => ({
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
        const HomeComponent = createAppContainer(HomeNavigator);
        
        return (
            <View style={{flex:1, 
            paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <HomeComponent/>
            </View>
        );
    }
}

export default HomeNavigationComponent;