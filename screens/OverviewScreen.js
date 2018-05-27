import React from 'react';
import {
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
import {TV_MAZE_URL} from "../constants/Config";
import {Body, Button, Left, ListItem} from "native-base";
import EpisodeItem from '../components/EpisodeItem';

const {width, height} = Dimensions.get('window');

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
        headerTintColor: Colors.dark(0.65),
        headerLeft: (
            <Ionicons
                name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
                size={Platform.OS === "ios" ? 25 : 24}
                color={Platform.OS === "ios" ? Colors.dark(0.65) : Colors.dark(0.65)}
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
        segment: 0,
        show: this.props.navigation.state.params.show,
        details: null,
        nextEpisodeLoading: false,
        nextEpisodeDetails: null,
        previousEpisodeLoading: false,
        previousEpisodeDetails: null
    };

    componentWillMount() {
        this.loadEpisodes();
    }

    loadEpisodes() {
        this.setState({
            nextEpisodeLoading: true,
            previousEpisodeLoading: true
        });

        fetch(`${TV_MAZE_URL}shows/${this.state.show.id}?embed[]=nextepisode&embed[]=previousepisode`, {
            cache: 'no-cache',
            credentials: 'same-origin',
            method: 'GET',
            redirect: 'follow',
            referrer: 'no-referrer'
        }).then((res) => {
            res.json().then((json) => {
                this.setState({
                    nextEpisodeLoading: false,
                    previousEpisodeLoading: false,
                    details: json,
                    nextEpisodeDetails: json._embedded && json._embedded.nextepisode ? json._embedded.nextepisode : null,
                    previousEpisodeDetails: json._embedded && json._embedded.previousepisode ? json._embedded.previousepisode : null,
                });
            });
        })
    }

    getSegmentBottomBorder(segment) {
        return {borderBottomColor: this.state.segment === segment ? Colors.primary(1) : Colors.white(1)};
    }

    getSegmentTextColor(segment) {
        return {color: this.state.segment === segment ? Colors.primary(1) : Colors.primary(0.5)};
    }

    renderSegmentBar() {
        return (
            <View style={styles.segmentBar}>
                <Button style={{...styles.segmentButtonStyle, ...this.getSegmentBottomBorder(0)}} transparent
                        onPress={() => this.setState({segment: 0})}>
                    <Text style={this.getSegmentTextColor(0)}>Episodes</Text>
                </Button>

                <Button style={{...styles.segmentButtonStyle, ...this.getSegmentBottomBorder(1)}} transparent
                        onPress={() => this.setState({segment: 1})}>
                    <Text style={this.getSegmentTextColor(1)}>Details</Text>
                </Button>

                <Button style={{...styles.segmentButtonStyle, ...this.getSegmentBottomBorder(2)}} transparent
                        onPress={() => this.setState({segment: 2})}>
                    <Text style={this.getSegmentTextColor(2)}>More</Text>
                </Button>
            </View>
        );
    }

    renderSegmentContent() {
        switch (this.state.segment) {
            case 0: {
                return this.renderEpisodesSegment();
            }
            case 1: {
                return this.renderDetailsSegment();
            }
            case 2: {
                return this.renderMoreSegment();
            }
        }
    }

    renderEpisodesSegment = () => {

        const showNext = this.state.nextEpisodeDetails !== null;
        const showPrev = this.state.previousEpisodeDetails !== null;
        return (
            <View style={styles.segmentContent}>
                {showNext && <EpisodeItem headerTitle={'Next Episode:'} item={this.state.nextEpisodeDetails}/>}
                {showPrev && <EpisodeItem headerTitle={'Previous Episode:'} item={this.state.previousEpisodeDetails}/>}
            </View>
        );
    };

    renderDetailsSegment = () => (
        <View style={{...styles.segmentContent, margin: 20}}>
            <Text style={styles.textTitle}>Description:</Text>
            <Text style={styles.textValue}>{this.getRidOfHTMLTags(this.state.details.summary)}</Text>

            <Text style={styles.textTitle}>Premiered:</Text>
            <Text style={styles.textValue}>{this.state.details.premiered}</Text>

            <Text style={styles.textTitle}>Runtime:</Text>
            <Text style={styles.textValue}>{this.state.details.runtime} minutes</Text>

            <Text style={styles.textTitle}>Channel:</Text>
            <Text style={styles.textValue}>{this.state.details.network.name}</Text>

            <Text style={styles.textTitle}>Schedule:</Text>
            <Text style={styles.textValue}>Every {this.state.details.schedule.days.join(', ')} at {this.state.details.schedule.time} ({this.state.details.network.country.timezone})</Text>

        </View>
    );

    renderMoreSegment = () => (
        <View style={{...styles.segmentContent, margin: 20}}>
            <Text>More</Text>
        </View>
    );

    renderBasicDetails = () => (
        <View style={{margin: 10}}>
            <Text style={styles.textTitle}>{this.state.show.name}</Text>
            <Text style={styles.textValue}>Status: {this.state.show.status}</Text>

            <Text style={styles.textTitle}>Language</Text>
            <Text style={styles.textValue}>{this.state.show.language}</Text>

            {this.state.show.genres && this.state.show.genres.length > 0 ? (
                <Text style={styles.textTitle}>Genres:</Text>
            ) : null}
            {this.state.show.genres && this.state.show.genres.length > 0 ? (
                <Text style={styles.textValue}>{this.state.show.genres.join(', ')}</Text>
            ) : null}
        </View>
    );

    renderPosterImage = () => (
        <View style={styles.posterImageContainer}>
            <Image source={{uri: this.state.show.image.original}} style={{
                width: width * 0.3,
                height: width * 0.5,
                borderRadius: 5,
            }}/>
        </View>
    );

    renderGradient = () => (
        <LinearGradient
            colors={[Colors.white(0), Colors.white(1), Colors.white(1)]}
            locations={[0, 0.2, 1]}
            style={styles.gradientStyles}
        />
    );

    getRidOfHTMLTags(str) {
        if (!str) {
            return '';
        }
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.show.image.original}} style={styles.posterImage}/>
                <ScrollView style={styles.scrollView}>
                    {this.renderGradient()}
                    <View style={{zIndex: 2}}>
                        <View style={styles.basicDetailsContainer}>
                            {this.renderPosterImage()}
                            {this.renderBasicDetails()}
                        </View>
                        {this.renderSegmentBar()}
                        {this.renderSegmentContent()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    contentContainer: {
        paddingTop: 30,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white(1)
    },
    posterImageContainer: {
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 7,
        elevation: 3,
        marginTop: -50,
        marginLeft: 10
    },
    posterImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: height / 5,
        zIndex: 1
    },
    segmentButtonStyle: {
        flex: 1,
        borderBottomWidth: 2,
        justifyContent: 'center',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    segmentContent: {
        backgroundColor: Colors.white(1)
    },
    segmentBar: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: Colors.white(1)
    },
    textTitle: {
        color: Colors.dark(0.65),
        fontWeight: '600',
        fontSize: 14,
        marginTop: 10
    },
    textValue: {
        color: Colors.dark(0.5),
        fontSize: 12
    },
    basicDetailsContainer: {
        marginTop: 200,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: Colors.white(1),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flexDirection: 'row'
    },
    gradientStyles: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height * 2,
        zIndex: 1
    },
    scrollView: {
        zIndex: 1,
    }
};