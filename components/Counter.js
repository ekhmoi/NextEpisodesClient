import React from 'react';
import {Text, View} from 'react-native';
import Colors from "../constants/Colors";

export class Counter extends React.Component {
    timeDifference = 0;
    timeString = '';
    timerId;
    state = {
        text: ''
    };

    componentDidMount() {
        this.timeString = this.props.airstamp;
        this.setDifference();
        this.startCountDown();
    }

    componentWillUnmount() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
    }

    render() {
        return (
            <Text numberOfLines={1} style={styles.text}>{this.state.text}</Text>
        );
    }

    setText() {
        let duration = this.timeDifference;

        let text;
        if (!duration) {
            text =  '';
        } else if (duration <= 0) {
            text = 'Aired'
        } else {


            let seconds = parseInt((duration / 1000) % 60),
                minutes = parseInt((duration / (1000 * 60)) % 60),
                hours = parseInt((duration / (1000 * 60 * 60)) % 24);
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            text = hours + ":" + minutes + ":" + seconds;
        }

        this.setState({ text });
    }

    setDifference() {
        const now = new Date().getTime();
        const destination = new Date(this.timeString).getTime();
        this.timeDifference = destination - now;
        this.setText();
    }

    startCountDown() {
        this.timerId = setTimeout(() => {
            this.setDifference();
            this.startCountDown();
        }, 1000);
    }
}

const styles = {
    container: {
        // backgroundColor: Colors.primary(1),
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text: {
        // alignSelf: 'flex-end',
        backgroundColor: Colors.primary(1),
        color: Colors.white(1),
        padding: 3,
        borderRadius: 5,
        overflow: 'hidden',
        fontSize: 10
    }
};