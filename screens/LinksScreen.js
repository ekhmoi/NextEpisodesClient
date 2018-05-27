import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import Colors from "../constants/Colors";
import {connect} from "react-redux";
import FavoriteItem from "../components/FavoriteItem";

@connect((store) => {
    return {
        favorites: store.favorites
    }
})
export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Favorites',
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
        headerTintColor: Colors.dark(0.8),
        headerLeft: null
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    vertical
                    data={this.props.favorites.items}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <FavoriteItem item={item} onClicked={() => this.props.navigation.navigate('Overview', {show: item})}/>}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white(1),
    },
});