import React, { Component } from 'react';
import MenuNavigatorComponent from './MenuNavigatorComponent'; 
import HomeNavigationComponent from './HomeNavigationComponent';
import ContactNavigationComponent from './ContactNavigationComponent';
import AboutNavigationComponent from './AboutNavigation';
import { View, Platform, Text, Image, StyleSheet, ScrollView,SafeAreaView } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView  } from '@react-navigation/drawer';
import AboutNavigation from './AboutNavigation';
import { Icon } from 'react-native-elements'


class CustomDrawer extends Component{
    constructor(props) {
        super(props);
      }
      
    render(){
  return (
    <DrawerContentScrollView >
       <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
         <View style={styles.drawerHeader}>
           <View style={{flex:1}}>
           <Image source={require('./images/logo.png')} style={styles.drawerImage} />
           </View>
           <View style={{flex: 2}}>
             <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
           </View>
         </View>
         <DrawerItemList { ...this.props } />
       </SafeAreaView>
     </DrawerContentScrollView >
     );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  
  
export default CustomDrawer;