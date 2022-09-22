import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import SplashScreen from '../pages/SplashScreen';
// import RegistrationUser from '../pages/RegistrationUser';
// import LoginUser from '../pages/LoginUser';
import LoginScreen from '../pages/LoginScreen';
import RequestWrScreen from '../pages/RequestWrScreen';
import InputWrScreen from '../pages/InputWrScreen';

const AuthStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

export function AuthStackNavigator() {
    return (
        <AuthStack.Navigator
            // mode={'modal'}
            // initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}>
            {/* <AuthStack.Screen name={'SplashName'} component={SplashScreen} /> */}
            <AuthStack.Screen name={'LoginStack'}>
                {() => (
                    <LoginStack.Navigator

                        initialRouteName="SplashScreen"
                        screenOptions={{ headerShown: false }}>
                        {/* <LoginStack.Screen name={'Screen'} component={SplashScreen} /> */}
                        <LoginStack.Screen name={'Login'} component={LoginScreen} />
                    </LoginStack.Navigator>
                )}
            </AuthStack.Screen>
            <AuthStack.Screen
                name={'InputWrScreen'}
                component={InputWrScreen}
            />
            <AuthStack.Screen
                name={'RequestWrScreen'}
                component={RequestWrScreen}
            />
        </AuthStack.Navigator>
    );
}
export default AuthStackNavigator;
