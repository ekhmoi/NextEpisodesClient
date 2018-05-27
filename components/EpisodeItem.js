import React from 'react';
import {Text, View, WebView} from 'react-native';
import Colors from "../constants/Colors";
import {Body, Thumbnail, ListItem, Right} from "native-base";
import {Counter} from "./Counter";

export default class EpisodeItem extends React.Component {
    render() {
        const {item} = this.props;
        const renderHeader = this.props.headerTitle && this.props.headerTitle !== '';

        return (
            <View>
                {renderHeader && <ListItem itemHeader first style={styles.header}><Text style={styles.headerText}>{this.props.headerTitle}</Text></ListItem>}
                <ListItem>
                    <Body>
                    <Text numberOfLines={1} style={{...styles.firstLine}}>{this.props.item.name}</Text>
                    {this.props.item.summary && <Text numberOfgiLines={1} style={styles.secondLine}
                                                      note>{this.getRidOfHTMLTags(this.props.item.summary)}</Text>}
                    </Body>
                    <Right style={{flexGrow: 1, flexBasis: 'auto', minWidth: 60, maxWidth: 80}}>

                        {this.props.item.airstamp &&
                        <Counter airstamp={this.props.item.airstamp} style={{width: 100}}/>}
                        <Text numberOfLines={1} style={{...styles.secondLine, marginTop: 5}}
                              note>{this.props.item.season}x{this.props.item.number}</Text>
                    </Right>
                </ListItem>
            </View>
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
    },
    firstLine: {
        color: Colors.dark(0.65),
        fontWeight: '600',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5
    },
    secondLine: {
        color: Colors.dark(0.5),
        fontSize: 12,
        marginBottom: 15
    },
    header: {
        borderBottomColor: Colors.white(1)
    },
    headerText: {
        color: Colors.dark(0.5),
        fontSize: 12,
        fontWeight: 'bold'
    }
};
