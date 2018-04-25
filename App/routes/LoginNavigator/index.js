// @flow

import { StackNavigator } from 'react-navigation'

import ScreenLogin from '../../screens/ScreenLogin'
import ScreenRegister from '../../screens/ScreenRegister'
import ScreenForgot from '../../screens/ScreenForgot'
import ScreenForgotConfirm from '../../screens/ScreenForgotConfirm'
import ScreenForgotReset from '../../screens/ScreenForgotReset'

const CURRENT_ROUTE_NAME = 'login';

const LoginNavigatorUtils : {
    getCurrentRouteName: () => string,
    getNavigation: () => StackNavigation
} = {
    getCurrentRouteName: () => CURRENT_ROUTE_NAME
}

const LoginNavigator = StackNavigator(
    {
        login   : { screen:ScreenLogin    },
        register: { screen:ScreenRegister },
        forgot: { screen:ScreenForgot },
        forgot_confirm: { screen:ScreenForgotConfirm }
    },
    {
        initialRouteName: CURRENT_ROUTE_NAME,
        headerMode: 'none'
    }
)

function getCurrentRouteName() {

}

export { LoginNavigatorUtils }
export default LoginNavigator
