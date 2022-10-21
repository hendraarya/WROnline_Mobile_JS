import React from 'react';

//Import Pages
import LoginScreen from '../pages/LoginScreen';
import RequestWrScreen from '../pages/RequestWrScreen';
import InputWrScreen from '../pages/InputWrScreen';

//Declare for Navigator each pages in Apps
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const AuthStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

export function AuthStackNavigator() {
    return (
        <AuthStack.Navigator
            // mode={'modal'}
            // initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name={'LoginStack'}>
                {() => (
                    <LoginStack.Navigator

                        initialRouteName="SplashScreen"
                        screenOptions={{ headerShown: false }}>
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
