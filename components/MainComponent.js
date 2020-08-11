import React, { Component } from 'react';
import MenuNavigatorComponent from './MenuNavigatorComponent'; 
import HomeNavigationComponent from './HomeNavigationComponent';
import ContactNavigationComponent from './ContactNavigationComponent';
import CustomDrawer from './CustomDrawerContentComponent';
import AboutNavigationComponent from './AboutNavigation';
import FavoriteNavigationComponent from './FavoriteNavigationComponent';
import Login from './LoginNavigator';
import { View, Platform, Text, Image, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { NavigationContainer, SafeAreaView } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import RservationNavigatorComponent from './RservationNavigatorComponent';
import NetInfo from '@react-native-community/netinfo';
const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <NavigationContainer >
            <Drawer.Navigator initialRouteName="Home" 
              drawerContentOptions={{
                activeTintColor: '#512DA8'
              }}
              drawerContent = {props => <CustomDrawer {...props}/>}>
                <Drawer.Screen name="Login" component={Login} options={{
                      drawerIcon: config => <Icon name='sign-in' type='font-awesome' size={24} />
                    }} />
                <Drawer.Screen name="Home" component={HomeNavigationComponent} options={{
                      drawerIcon: config => <Icon name='home' type='font-awesome' size={24} />
                    }} /> 
                <Drawer.Screen name="About Us" component={AboutNavigationComponent} options={{
                      drawerIcon: config => <Icon name='info-circle' type='font-awesome' size={24} />
                    }}/>
                <Drawer.Screen name="Menu" component={MenuNavigatorComponent} options={{
                      drawerIcon: config => <Icon name='list' type='font-awesome' size={24} />
                    }}/>
                <Drawer.Screen name="Contact Us" component={ContactNavigationComponent} options={{
                      drawerIcon: config => <Icon name='address-card' type='font-awesome' size={24} />
                    }}/>
                <Drawer.Screen name="Favorites" component={FavoriteNavigationComponent} options={{
                      drawerIcon: config => <Icon name='heart' type='font-awesome' size={24} />
                    }}/>
                <Drawer.Screen name="Reserve Table" component={RservationNavigatorComponent} options={{
                      drawerIcon: config => <Icon name='cutlery' type='font-awesome' size={24} />
                    }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
  }
 
  const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })
    

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.fetch()
    .then(state => {
      ToastAndroid.show('Initial Network Connectivity Type: '
                +state.type,
                ToastAndroid.LONG)
    });

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  render() {
 
    return (
        <View style={{flex:1 , paddingTop : Platform.OS === 'ios' ? 0 : Expo.Constants.stausBarHeight}}>
            <MyDrawer />
        </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);