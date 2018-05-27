import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../constants/Colors';

export class Header extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{this.props.title}</Text>
        </View>
    )
  }
}


const styles = {
    container: {
        paddingLeft: 10
    },
    text: {
        color: Colors.dark(0.8),
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}