import React from 'react';
import {Text, WebView} from 'react-native';
import Colors from "../constants/Colors";
import {Body, Thumbnail, ListItem} from "native-base";

export default class FavoriteItem extends React.Component {
    render() {
        const {item} = this.props;
        const image = item && item.image && item.image.original ? {uri: item.image.original} : require('../assets/images/robot-prod.png');
        return (
            <ListItem button={true} style={styles.listItem} onPress={() => this.props.onClicked()} >
                <Thumbnail size={48} square source={image}
                           style={styles.thumbnail}/>
                <Body>
                <Text
                    style={styles.artistTitle}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.trackTitle} note>{this.getRidOfHTMLTags(item.summary)}</Text>
                </Body>
            </ListItem>
        )
    }

    getRidOfHTMLTags(str) {
        if (!str) {
            return '';
        }
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    }
}

const styles = {
    listItem: {
        paddingTop: 7,
        paddingBottom: 7
    },
    thumbnail: {
        borderRadius: 3,
        marginRight: 10,
        height: 48,
        width: 48,
    },
    artistTitle: {
        color: Colors.dark(1),
        fontWeight: '600',
        fontSize: 14
    },
    trackTitle: {
        color: Colors.dark(0.5),
        fontSize: 12
    }
};
