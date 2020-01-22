import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from "./screens/Login"
import CreateAccount from "./screens/CreateAccount"
import Home from "./screens/Home"

const AreaIndexNav = createStackNavigator( {
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
    },

    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false
        }
    }
})

export default createAppContainer(AreaIndexNav)