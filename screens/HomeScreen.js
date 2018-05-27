import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';
import UpcomingsList from '../components/UpcomingsList';
import {connect} from 'react-redux';
import {upcomingsToday, upcomingsTomorrow} from "../actions/upcomings";

@connect((store) => {
    return {
        upcomingsToday: store.upcomingsToday,
        upcomingsTomorrow: store.upcomingsTomorrow
    }
})
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Upcomings',
        headerStyle: {
            backgroundColor: Colors.white(1),
            borderBottomColor: Colors.white(2),
            shadowColor: Colors.primary(1),
            shadowOffset: {
                x: 3,
                y: 0
            },
            shadowRadius: 5,
            shadowOpacity: 0.1
        },
        headerTintColor: Colors.dark(0.65),
        headerLeft: null
    };

    componentWillMount() {
        this.props.dispatch(upcomingsToday());
        this.props.dispatch(upcomingsTomorrow());
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <UpcomingsList navigate={this.props.navigation.navigate} upcomings={this.props.upcomingsToday.items}
                                   title={'Today'}/>
                    <UpcomingsList navigate={this.props.navigation.navigate}
                                   upcomings={this.props.upcomingsTomorrow.items} title={'Tomorrow'}/>
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
    }
});