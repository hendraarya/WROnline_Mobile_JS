import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';


import { ImageBackground, Text, Image, View } from 'react-native';
import tailwind from 'twrnc'; //library tailwindcss for react-native
import { AuthContext } from './context/AuthContext';


import Heading from './components/Heading';
import SplashScreen from './pages/Splashscreen';
import LoginScreen from './pages/LoginScreen';
import RequestWrScreen from './pages/RequestWrScreen';
import MyComponent from './pages/fabstyle';
import InputWrScreen from './pages/InputWrScreen';
import MainContainer from './components/MainContainer';
import BarcodeScanner from './components/QRcodescanner';
import { TimePickerExample } from './pages/TimePickerExample';
import QRcode from './pages/QRcode';


const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
export default function App() {

  return (
    // <AuthContext.Provider value={}>
    //   <NavigationContainer>
    //     <RootStack.Navigator screenOptions={{ headerShown: false }}>
    //       <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
    //     </RootStack.Navigator>
    //   </NavigationContainer>
    // </AuthContext.Provider>
    // <View >

    //   <Heading> Welcome NMAX Mobile</Heading>

    // </View>
    // <SplashScreen/>
    // <LoginScreen />
    // <RequestWrScreen />
    // <MyComponent />
    // <InputWrScreen />
    // <BarcodeScanner />
    // <AxiosScreen />
    // <TimePickerExample />

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


  );
};

