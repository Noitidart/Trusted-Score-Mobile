import { StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'

import ScreenLanding from '../../screens/ScreenLanding'
import ScreenHome from '../../screens/ScreenHome'
import ScreenProfile from '../../screens/ScreenProfile'

const CURRENT_ROUTE_NAME = 'landing';

const AppNavigatorUtils : {
    getCurrentRouteName: () => string,
    getNavigation: () => StackNavigation
} = {
    getCurrentRouteName: () => CURRENT_ROUTE_NAME
}

const AppNavigator = StackNavigator(
    {
        landing: { screen:ScreenLanding },
        home   : { screen:ScreenHome    },
        profile: { screen:ScreenProfile }
    },
    {
        initialRouteName: CURRENT_ROUTE_NAME
    }
)

export { AppNavigatorUtils }
export default AppNavigator
