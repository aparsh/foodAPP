import React, { Component } from 'react';
import About from './AboutComponent';
import { View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import Reservation from './ReservationComponent';


class RservationNavigatorComponent extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        const ReservationNavigator = createStackNavigator({
            Reservation: { screen: Reservation, navigationOptions: ({ navigation }) => ({
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
          })
        } 
      })
        const ReservationComponent = createAppContainer(ReservationNavigator);
        
        return (
          <View style={{flex:1, 
            paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <ReservationComponent/>
          </View>
        );
    }
}

export default RservationNavigatorComponent;