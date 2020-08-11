import React, {Component} from 'react';
import { Text, View , ScrollView, FlatList, StyleSheet, Modal, Button, Alert,
    TextInput, PanResponder, Share } from 'react-native';
import {Card, Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment} from '../redux/ActionCreators';
import { Rating, AirbnbRating } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})

function RenderDish(props) {

    const dish = props.dish;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return 1;
        else if(dx>200)
            return 2;    
        else
            return 0;
    }

    handleViewRef = ref => this.view = ref;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)==1)
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.markFavorite()}},
                    ],
                    { cancelable: false }
                );
            else if(recognizeDrag(gestureState)==2)
                    props.toggleModal();
    
            return true;
        }
    })
    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                
                    <View style={{flexDirection:'row', justifyContent: 'center'}}>
                        <Icon
                            raised
                            reverse
                            style={{flex: 1}}
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.markFavorite()}
                            />
                        <Icon
                            raised
                            reverse
                            style={{flex: 1}}
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={()=>props.toggleModal()}
                            />
                        <Icon
                            raised
                            reverse
                            style={{flex: 1}}
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, 
                                dish.description, baseUrl + dish.image)}
                            />
                    </View>    
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
    
    const renderCommentItem = ({item, index}) => {
        
        return (
            
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating imageSize={20}
                        readonly
                        startingValue={item.rating}
                    />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component{
    constructor(props) {
        super(props);

        this.state = {
            author:'',
            comment:'',
            rating:'',
            showModal: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    static navigationOptions= {
        title : 'Dish Details'
    };
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    changeAuthor(author) {
        this.setState({author:author});
    }
    changeComment(comment) {
        this.setState({comment:comment});
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
    submitForm(dishID) {
        this.props.postComment({dishId: dishID,
                                rating: this.state.rating,
                                comment: this.state.comment,
                                author: this.state.author});
    }
    resetForm() {
        this.setState({
            author:'',
            comment:'',
            rating:'',
            showModal: false
        });
    }
    ratingCompleted(rating) {
        this.setState({
            rating: rating
        });
        console.log("Rating is: " + rating);
      }
    render(){
        const dishId = this.props.navigation.getParam('dishId','');
    
        return(
            <ScrollView>
                <Modal animationType = {"fade"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <AirbnbRating
                            count={5}
                            reviews={["Bad","OK", "Good", "Very Good","Excellent"]}
                            onFinishRating={rating => this.ratingCompleted(rating)}
                            defaultRating={5}
                            size={30}
                        />
                        <TextInput  placeholder="author"
                                    //inlineImageLeft={<Icon name='user' type='font-awesome'/>}
                                    onChangeText={(author)=>this.changeAuthor(author)}
                                    value={this.state.author}
                                    style={{paddingBottom:5,fontSize:25}}
                                    underlineColorAndroid="black"/>
                        <TextInput  placeholder="comment"
                                    style={{paddingBottom:5,fontSize:25}}
                                    onChangeText={(comment)=>this.changeComment(comment)}
                                    value={this.state.comment}
                                    underlineColorAndroid="black"/>
                    </View>
                    
                    <View style={{padding:10}}>
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.submitForm(dishId); this.resetForm();}}
                            color="#512DA8"
                            title="Submit"
                            />
                    </View>
                    <View style={{padding:10}}>
                    <   Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="grey"
                            title="Cancel" 
                            />
                    </View>
                </Modal>
                <RenderDish dish={this.props.dishes.dishes.filter((dish)=>dish.id === dishId)[0]} 
                            favorite={this.props.favorites.some(el => el === dishId)}
                            markFavorite={() => this.markFavorite(dishId)}
                            toggleModal={()=>this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }  
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);