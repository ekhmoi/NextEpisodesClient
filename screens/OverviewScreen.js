import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView, Dimensions,
    Platform
} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from "@expo/vector-icons";
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';

@connect((store) => {
    return {
        favorites: store.favorites,
    }
})
export default class OverviewScreen extends React.Component {
    static navigationOptions = (props) => ({
        headerStyle: {
            // backgroundColor: Colors.white(1),
            borderBottomColor: Colors.white(0),
            shadowColor: Colors.primary(1),
            shadowOffset: {
                x: 3,
                y: 0
            },
            shadowRadius: 5,
            shadowOpacity: 0.1,
            position: 'absolute', backgroundColor: Colors.white(0), zIndex: 100, top: 0, left: 0, right: 0
        },
        headerTintColor: Colors.dark(0.8),
        headerLeft: (
            <Ionicons
                name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
                size={Platform.OS === "ios" ? 25 : 24}
                color={Platform.OS === "ios" ? Colors.dark(0.8) : Colors.dark(0.8)}
                style={
                    Platform.OS === "ios"
                        ? {marginBottom: -4, width: 25, paddingLeft: 10, paddingRight: 10}
                        : {marginBottom: -4, width: 25, paddingLeft: 20, paddingRight: 20}
                }
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
        )
    });


    state = {
        show: this.props.navigation.state.params.show
    };

    componentWillMount() {
    }

    render() {
        const {width, height} = Dimensions.get('window');
        const bgImage = require('../assets/images/gradient-bg.png');
        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.show.image.original}} style={styles.posterImage}/>
                <LinearGradient
                    colors={[Colors.white(0), Colors.white(1), Colors.white(1)]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 1
                    }}
                />
                <ScrollView contentContainerStyle={{flex: 0}} style={{zIndex: 2}}>
                    <View style={{marginTop: 200, marginLeft: 10, marginRight: 10, backgroundColor: Colors.white(1), borderRadius: 5, flexDirection: 'row'}}>

                        {/*Image here*/}
                        <View style={
                            {
                                borderRadius: 5,
                                shadowColor: '#000',
                                shadowOffset: {width: 0, height: 5},
                                shadowOpacity: 0.3,
                                shadowRadius: 7,
                                elevation: 3,
                                marginTop: -50,
                                marginLeft: 10
                            }
                        }>
                            <Image source={{uri: this.state.show.image.original}} style={{
                                width: width * 0.3,
                                height: width * 0.5,
                                borderRadius: 5,
                            }}/>
                        </View>

                        <View style={{margin: 10}}>
                            <Text style={{fontSize: 'bold'}}>{this.state.show.name}</Text>
                            <Text>Season {this.state.show.rating.avarage}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 30,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white(1)
    },
    posterImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 1
        // borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 5},
        // shadowOpacity: 0.3,
        // shadowRadius: 7,
        // elevation: 3,
        // marginBottom: 20
    }
});