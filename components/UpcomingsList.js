import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {View, Text, FlatList} from 'react-native';
import UpcomingItem from './UpcomingItem';

export default class UpcomingsList extends React.Component {
  render() {
    return (
        <View>
            <Text style={styles.title}>{this.props.title}</Text>
            <FlatList
                    horizontal
                    data={this.props.upcomings}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <UpcomingItem  onClicked={() => {this.props.navigate('Overview', { show: item.show })}} upcoming={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    />
        </View>
    );
  }
  
}

const styles = {
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 10,
        color: Colors.dark(0.8)
    }
};

{/* <TrackHorizontalListItem track={item} onPlay={(t) => this.onClickPlay(t)}/> */}