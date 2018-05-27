import React from 'react';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';
import OverviewScreen from "../screens/OverviewScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Overview: OverviewScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'md-flame'}
        />
    ),
};

const LinksStack = createStackNavigator({
    Links: LinksScreen,
    Overview: OverviewScreen
});

LinksStack.navigationOptions = {
    tabBarLabel: 'Links',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'md-bookmarks'}
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Overview: OverviewScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'md-search'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack,
}, {
    tabBarOptions: {
        activeTintColor: Colors.primary(1),
        activeBackgroundColor: Colors.white(1),
        inactiveTintColor: Colors.primary(0.5),
        inactiveBackgroundColor: Colors.white(1),
        showLabel: false,
        showIcon: true,
        style: {
            borderTopColor: 'transparent',
            shadowColor: Colors.primary(1),
            backgroundColor: Colors.white(1),
            shadowOffset: {
                width: 0,
                height: -3
            },
            shadowRadius: 5,
            shadowOpacity: 0.1
        }
    }
});
