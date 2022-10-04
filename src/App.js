import React, { useState, useMemo } from 'react';

import { NavigationContainer, DefaultTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import AuthContext from './context/AuthContext';


import SplashScreen from './pages/Splashscreen';
import LoginScreen from './pages/LoginScreen';
import RequestWrScreen from './pages/RequestWrScreen';
import InputWrScreen from './pages/InputWrScreen';
import QRcode from './pages/QRcodeScreen';
import HomeScreen from './pages/HomeScreen';
import InfoAccountScreen from './pages/InfoAccountScreen';
import HelpScreen from './pages/HelpScreen';
import NotificationScreen from './pages/NotificationScreen';


const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {

  const [qrnik, setQrnik] = useState("");
  const [qrmachineid, setQrmachineid] = useState("");
  const value = {qrnik, setQrnik, qrmachineid,setQrmachineid};
  // const auth = useMemo(() => ({
  //     qrnik: 'Data Awal NIK',
  //     qrmachineid : 'Data Awal MachineID',
  //     qrcode: async data => {
  //         qrnik: data.qrnik
  //         qrmachineid: data.qrmachineid
  //     },
     
  // }));

   const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

  return (
   
    <AuthContext.Provider value={{value}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Splash">
          {(props) => <SplashScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} />}
        </Stack.Screen>
        </Stack.Group>

        <Stack.Group>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} screenOptions={horizontalAnimation}/>}
        </Stack.Screen>
         <Stack.Screen name="InfoAccount">
          {(props) => <InfoAccountScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RequestWr">
          {(props) => <RequestWrScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="InputWr">
          {(props) => <InputWrScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Qrcode">
          {(props) => <QRcode {...props} />}
        </Stack.Screen>
        </Stack.Group>

        <Stack.Screen name="help">
          {(props) => <HelpScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="notif">
          {(props) => <NotificationScreen {...props} />}
        </Stack.Screen>


        

        {/* Menggunakan penulisan stack screen seperti dibawah ini akan menyebabkan muncul Warning "React Component must start with Upper Letter" */}
        {/* <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RequestWr" component={RequestWrScreen} />
        <Stack.Screen name="InputWr" component={InputWrScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
</AuthContext.Provider>

  );
};

