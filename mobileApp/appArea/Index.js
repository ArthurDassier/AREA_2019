import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from "./screens/Login"

const AreaIndexNav = createStackNavigator( {
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    }
    // FilmDetail: {
    //     screen: Logged,
    //     navigationOptions: {
    //         title: "Welcome to Area"
    //     }
    // }
})

export default createAppContainer(AreaIndexNav)