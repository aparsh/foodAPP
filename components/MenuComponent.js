import React, {Component} from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }

class Menu extends Component{
      static navigationOptions= {
          title : 'Menu'
      };

    render(){
        const renderMenuItem = ({item, index}) => {
            const { navigate } = this.props.navigation;
            
            return (
                <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={()=>navigate('Dishdetail', { dishId : item.id })}
                        leftAvatar={{ source : {uri : baseUrl + item.image}}}
                        />
                );
            };            
            
            if (this.props.dishes.isLoading) {
                return(
                    <Loading />
                );
            }
            else if (this.props.dishes.errMess) {
                return(
                    <View>            
                        <Text>{this.props.dishes.errMess}</Text>
                    </View>            
                );
            }
            else {
                return (
                    <FlatList 
                        data={this.props.dishes.dishes}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                        />
                );
            }
    }
    
}


export default connect(mapStateToProps)(Menu);