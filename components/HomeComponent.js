import React, { Component } from 'react';
import { Text, ScrollView, View,  Animated, Easing} from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }


function RenderItem(props){
    const item = props.item;
    if (props.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View> 
                <Text>{props.erreMess}</Text>
            </View>
        );
    }
    else {        
        if (item != null) {
            return(
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{uri: baseUrl + item.image}}>
                    <Text
                        style={{margin: 10}}>
                        {item.description}</Text>
                </Card>
            );
        }
        else {
            return(<View><Text>Item is null</Text></View>);
        }
    }
}



class Home extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);        
    }

    static navigationOptions = {
        title: 'Home'
    };
    
    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 5,
            duration: 5000,
            useNativeDriver: true,
            easing: Easing.linear
          }
        ).start()
    }
    componentDidMount () {
        this.animate()
    }
    render(){
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 2, 3, 4, 5],
            outputRange: [1200, 1000, 800, 650, 300, 0]
        })
        return (
        <ScrollView>
            <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}]}}>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    erreMess={this.props.dishes.erreMess} 
                    />
            </Animated.View>
            <Animated.View style={{ width: '100%',  transform: [{translateX: xpos1}]}}>
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    erreMess={this.props.promotions.erreMess} 
                    />
            </Animated.View>
            <Animated.View style={{ width: '100%',  transform: [{translateX: xpos1}]}}>
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    erreMess={this.props.leaders.erreMess} 
                    />
                </Animated.View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);