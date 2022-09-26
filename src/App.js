import React, { useState, useMemo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
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

  return (
    <AuthContext.Provider value={{value}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash">
          {(props) => <SplashScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} />}
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

