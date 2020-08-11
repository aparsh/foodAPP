import React, { Component } from 'react';
import Login from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { View, Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, SafeAreaView } from '@react-navigation/native';



const Tab = createBottomTabNavigator();

class LoginNavigation extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <View style={{flex:1, 
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                
                    <Tab.Navigator tabBarOptions={{
                        activeTintColor:'#f63854',
                        inactiveTintColor:'#222222',  
                        // activeBackgroundColor:'#f63854',
                        inactiveBackgroundColor:'white',
                        style:{height:60}
                        }}>
                        <Tab.Screen name="Login" component={Login} options={{
                            tabBarIcon: ({color}) => <Icon name='sign-in' type='font-awesome' size={40} color={color}/>
                            }}/>
                        <Tab.Screen name="Register" component={RegisterComponent} options={{
                            tabBarIcon: ({color}) => <Icon name='user-plus' type='font-awesome' size={35} color={color}/>
                            }}/>
                    </Tab.Navigator>
                
            </View>

        );
    }
}

export default LoginNavigation;