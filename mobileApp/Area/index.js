/*----Import React----*/
import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Feather';

/*----Import Screens----*/
import CreateAccount from './screens/CreateAccount';
import Home from './screens/Home';
import Login from './screens/Login';
import Service from './screens/Service';

/*----Import Configs----*/
const config = require('./config/index.json');

const AreaIndexNav = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                headerShown: false
            }
        },

        CreateAccount: {
            screen: CreateAccount,
            navigationOptions: {
                headerShown: false
            }
        }
    }
);

const headerNavigation = ({ navigation }) => {
    return {
        headerLeft: () => (
            <Icon
                style={{ paddingLeft: 10 }}
                onPress={() => navigation.openDrawer()}
                name={'menu'}
                size={30}
            />
        )
    };
};

const HomeStackNavigator = createStackNavigator(
    {
        [config.home]: Home,
        [config.service]: Service
    },
    {
        defaultNavigationOptions: ({ navigation }) => 
            navigation.state.routeName == config.home
                ? headerNavigation({ navigation })
                : null
    }
);

const NotificationsStackNavigator = createStackNavigator(
    {
        [config.notifications]: Home
    },
    {
        defaultNavigationOptions: ({ navigation }) =>
            headerNavigation({ navigation })
    }
);

const ProfileStackNavigator = createStackNavigator(
    {
        [config.profile]: Home
    },
    {
        defaultNavigationOptions: ({ navigation }) =>
            headerNavigation({ navigation })
    }
);

const AppDrawerNavigator = createDrawerNavigator({
    [config.home]: HomeStackNavigator,
    [config.notifications]: NotificationsStackNavigator,
    [config.profile]: ProfileStackNavigator
});

const AppSwitchNavigator = createSwitchNavigator({
    Login: { screen: AreaIndexNav },
    Area: { screen: AppDrawerNavigator }
});

export default createAppContainer(AppSwitchNavigator);