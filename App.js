import React from 'react';
import {Platform, StatusBar, StyleSheet, View, AsyncStorage} from 'react-native';
import {AppLoading, Asset, Font} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import {Provider} from 'react-redux';
import store from './store';
import {API_TOKEN, API_DETAILS} from "./constants/Config";
import {loadFavorites} from './actions/favorites';
import Colors from "./constants/Colors";

import {
    AdMobBanner
} from "expo";

const BANNER_ID = `ca-app-pub-1064727486518319/7624280366`;

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    componentDidMount() {
        // AsyncStorage.removeItem('API_TOKEN');
    }

    getApiToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('API_TOKEN').then((token) => {
                if (!token) {
                    this.getNewApiToken().then((res) => resolve(res)).catch(err => reject(err));
                } else {
                    API_DETAILS.TOKEN = token;
                    this.getFavorites();
                    resolve({});
                }
            }).catch(() => {
                this.getNewApiToken().then((res) => resolve(res)).catch(err => reject(err));
            });
        });
    }

    getFavorites() {
        store.dispatch(loadFavorites());
    }

    getNewApiToken() {
        return new Promise((resolve, reject) => {
            fetch(`${API_DETAILS.URL}/init`, {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrer: 'no-referrer',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    device: 'Apple'
                })
            })
                .then((res) => {
                    res.json().then((json) => {
                        if (json.statusCode === 200 && json.data.token) {
                            API_DETAILS.TOKEN = json.data.token;
                            AsyncStorage.setItem('API_TOKEN', API_DETAILS.TOKEN);
                            this.getFavorites();
                        }
                    });
                })
                .catch(err => {
                    console.log('there was an error 1', err);
                });
        });
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (

                <Provider store={store}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <RootNavigation/>
                        <AdMobBanner
                            bannerSize="fullBanner"
                            adUnitID={BANNER_ID}
                        />
                    </View>

                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/gradient-bg.png'),
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
            this.getApiToken()
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white(1),
    },
});
