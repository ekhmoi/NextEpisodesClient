import React from 'react';
import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import Colors from "../constants/Colors";
import {Counter} from "./Counter";
import {Body, Icon, Button, List, ListItem, Right} from "native-base";
import {connect} from "react-redux";
import { addFavorite, removeFavorite } from '../actions/favorites';

@connect((store) => {
    return {
        favorites: store.favorites
    }
})
export default class UpcomingItem extends React.Component {

    componentDidMount() {

    }

    isFavorite() {
        return typeof this.props.favorites.items.find(f => f.id === this.props.upcoming.show.id) !== 'undefined';
    }

    toggleFavorite() {
        if (this.isFavorite()) {
            // Remove from favorite
            // this.dis
            this.props.dispatch(removeFavorite(this.props.upcoming.show));
        } else {
            // Add to favorite
            this.props.dispatch(addFavorite(this.props.upcoming.show));
        }
    }

    render() {
        const {upcoming} = this.props;
        const image = upcoming && upcoming.show && upcoming.show.image && upcoming.show.image.original ? {uri: upcoming.show.image.original} : require('../assets/images/robot-prod.png');
        let {width} = Dimensions.get('window');
        width = width * 0.6;
        return (
            <TouchableOpacity style={{margin: 5}} onPress={() => this.props.onClicked()}>
                <View style={styles.thumbnailHolder}>
                    <Image size={width} square source={image}
                           style={{...styles.thumbnail, width: width, height: width * 1.5}}/>
                    <Button iconOnly transparent style={{position: 'absolute', top: -18, right: 10, height: 'auto'}} onPress={() => {this.toggleFavorite()}}>
                        <Icon name='md-bookmark' style={{fontSize: 50, color: Colors.primary(1)}}/>
                        <Icon name={this.isFavorite() ? 'md-heart' : 'md-heart-outline'} style={{fontSize: 17, color: Colors.white(1), position: 'absolute', right: 8}}/>
                    </Button>
                </View>
                <ListItem onPress={() => this.props.onClicked()} style={{borderBottomColor: 'transparent', marginLeft: 0, paddingLeft: 0, marginRight: 0, paddingRight: 0, width: width}}>
                    <Body>
                        <Text numberOfLines={1} style={{
                            ...styles.firstLine,
                        }}>{upcoming.show.name}</Text>
                        <Text numberOfgiLines={1} style={styles.secondLine} note>{upcoming.name}</Text>
                    </Body>
                    <Right style={{ flexGrow: 1, flexBasis: 'auto', minWidth: 60, maxWidth: 80}}>
                        <Counter airstamp={upcoming.airstamp} style={{width: 100}}/>
                        <Text numberOfLines={1} style={{...styles.secondLine, marginTop: 5}} note>{upcoming.season}x{upcoming.number}</Text>
                    </Right>
                </ListItem>
            </TouchableOpacity>
        )
    }

}

const styles = {
    thumbnail: {
        borderRadius: 5,
    },
    thumbnailHolder: {
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 7,
        elevation: 3
    },
    firstLine: {
        color: Colors.dark(0.8),
        fontWeight: '600',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5
    },
    secondLine: {
        color: Colors.dark(0.5),
        fontSize: 12,
        marginBottom: 15
    }
};