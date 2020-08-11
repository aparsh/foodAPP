import React, { Component } from 'react';
import Favorites from './FavoriteComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { View, Platform, Text } from 'react-native';

class FavoriteNavigationComponent extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        const FavoriteNavigator = createStackNavigator({
            Favorites : { screen: Favorites ,navigationOptions: ({ navigation }) => ({
                headerLeft: ()=><View style={{ marginLeft: 15 }}><Icon name="menu" 
                size={24} 
                color= 'white'
                onPress={ () => this.props.navigation.toggleDrawer()} /></View>,
                headerStyle: {
                    backgroundColor: '#512DA8'
                 },
                 headerTitleStyle: {
                     color: "#fff"            
                 },
                 headerTintColor: "#fff"          
            })}
          });
        const FavoriteComponent = createAppContainer(FavoriteNavigator);
        
        return (
            <View style={{flex:1, 
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <FavoriteComponent/>
            </View>
        );
    }
}

export default FavoriteNavigationComponent;