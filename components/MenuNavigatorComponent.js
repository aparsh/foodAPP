import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer  } from 'react-navigation';
import { Icon } from 'react-native-elements';

class MenuNavigatorComponent extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        const MenuNavigator = createStackNavigator({
            Menu : { screen : Menu,
                    navigationOptions: ({ navigation }) => ({
                        headerLeft: ()=><View style={{ marginLeft: 15 }}><Icon name="menu" 
                        size={24} 
                        color= 'white'
                        onPress={ () => this.props.navigation.toggleDrawer()} /></View>,
                        headerStyle: {
                            backgroundColor: '#512DA8'
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            color: '#fff'
                        }          
                    })
                },
            Dishdetail : { screen : Dishdetail,
                navigationOptions: ({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#512DA8'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff'
                    }          
                })}
        },{
            initialRouteName: 'Menu'
        });
        const MenuComponent = createAppContainer(MenuNavigator);
        return (
            <View style={{flex:1, 
            paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MenuComponent/>
            </View>
        );
    }
}

export default MenuNavigatorComponent;