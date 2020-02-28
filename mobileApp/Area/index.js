/*----Import React----*/
import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Alert,
    Text,
    AsyncStorage,
} from 'react-native';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Feather';

/*----Import Screens----*/
import CreateAccount from './screens/CreateAccount';
import Home from './screens/Home';
import Profil from './screens/Profil';
import AppletShow from './screens/AppletShow';
import Login from './screens/Login';
import Service from './screens/Service';
import LoginService from './screens/LoginService';
import Applet from './screens/Applet';
import Action from './screens/Action';
import Reaction from './screens/Reaction';
import NewApplet from './screens/NewApplet';
import AppletDescription from './screens/AppletDescription';

/*----Import Components----*/
import Drawer from './components/Drawer';

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
        [config.service]: Service,
        [config.loginService]: LoginService,
        [config.applet]: Applet,
        [config.appletShow]: AppletShow,
        [config.action]: Action,
        [config.reaction]: Reaction,
        [config.newApplet]: NewApplet,
        [config.appletDescription]: AppletDescription
    },
    {
        defaultNavigationOptions: ({ navigation }) => 
            navigation.state.routeName == config.home
                ? headerNavigation({ navigation })
                : null
    }
);

const AppletShowStackNavigator = createStackNavigator(
    {
        [config.appletShow]: AppletShow
    },
    {
        defaultNavigationOptions: ({ navigation }) =>
            headerNavigation({ navigation })
    }
);

const ProfileStackNavigator = createStackNavigator(
    {
        [config.profile]: Profil
    },
    {
        defaultNavigationOptions: ({ navigation }) =>
            headerNavigation({ navigation })
    }
);

const AppDrawerNavigator = createDrawerNavigator({
    [config.home]: HomeStackNavigator,
    [config.appletShow]: AppletShowStackNavigator,
    [config.profile]: ProfileStackNavigator,
}, {
    contentOptions: {
        activeTintColor: 'orange'
    },
    drawerType: 'slide',
    contentComponent: (props) => ( <Drawer {...props} />),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
    
});

const AppSwitchNavigator = createSwitchNavigator({
    Login: { screen: AreaIndexNav },
    Area: { screen: AppDrawerNavigator }
});

export default createAppContainer(AppSwitchNavigator);