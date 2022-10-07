import React, {useState} from "react";
import { StyleSheet, View, Text, Image } from "react-native";

//Add Component
import { FilledButton } from "../components/FilledButton";
import Input from "../components/Input";

//Add Additional Library
import {TextInput} from 'react-native-paper';

//Library API
import axios from "axios";

export default function LoginScreen({navigation}) {

    //variable useState
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Function Login WR Online
    const submitwronline = () => {
        const data = {
            username2: username.toLowerCase(),
            password4: password,
        };
        axios
            .post('http://10.202.10.77:3000/api/login', data)
            /* localhost emulator harus diganti dengan ip local : 10.0.2.2, agar device tidak bingung, soalnya device use localhost */
            .then( async res => {
                await setUsername('');
                await setPassword('');
                await navigation.navigate('Home');
                
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/logonmaxsmall2.png')} />
            </View>
            <View style={styles.content}>
                 <TextInput label="Username" placeholder="Username" style={styles.input} value={username} onChangeText={(value) => setUsername(value)}/>
                 <TextInput label="Password" placeholder="Password" secureTextEntry={true} value={password} right={<TextInput.Icon icon="eye" />} style={styles.input} onChangeText={(value) => setPassword(value)}/>
                <FilledButton title='Masuk' style={styles.button} onPress={submitwronline} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.text1}> ────────────────   ©2022  ────────────────</Text>
                <Text style={styles.text2}>Manufacture Engineering Dept | Technology Control Sect</Text>
                <Text style={styles.text3}>Version 1.0.0</Text>
            </View>
        </View>
    );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00a2fc'
    },
    header: {
        flex: 2,
        // backgroundColor: 'red',
        alignSelf: 'center',
        paddingTop: '20%'
    },
    content: {
        flex: 3,
        // backgroundColor: 'darkorange',
        padding: 5,
    },
    footer: {
        flex: 1,
        // backgroundColor: 'green',
    },
    input: {
        marginVertical: 20,
    },
    button: {
        marginVertical: 32,
    },
    text1: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '300',
        paddingVertical: '2%'
    },
    text2: {
        paddingTop: '1%',
        textAlign: 'center',
        color: 'white',
        fontWeight: '300'

    },
    text3: {
        paddingVertical: '2%',
        textAlign: 'center',
        color: 'white',
        fontWeight: '300'

    },
});