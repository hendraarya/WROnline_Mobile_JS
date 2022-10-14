import React, {useContext, useState} from "react";
import { StyleSheet, View, Text, Image } from "react-native";

//Add UseContext for create variable global
import AuthContext from "../context/AuthContext";

//Add Component
import { FilledButton } from "../components/FilledButton";
import {MessageLogin} from "../components/MessageLogin";

//Add Additional Library
import {TextInput} from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';

//Library API
import axios from "axios";

export default function LoginScreen({navigation}) {

    const [showAlert, setShowAlert] = useState(false);
    const [messagelogin, setMessagelogin] = useState('');

    const {datglobaluserlogin} = useContext(AuthContext);

    const showAlert2 = () => {
    setShowAlert(true);

  };

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
                setUsername('');
                setPassword('');
                setMessagelogin('');
                await datglobaluserlogin.setDatauserlogin(res.data.data[0]);
                await navigation.navigate('Home');
            })
            .catch(async err => {
                console.log(err);
                setMessagelogin(err.response.data.message);
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/logonmaxsmall2.png')} />
            </View>
            <View style={styles.content}>
                 <MessageLogin message={messagelogin} />
                 <TextInput label="Username" placeholder="Username" style={styles.input} value={username} onChangeText={(value) => setUsername(value)}/>
                 <TextInput label="Password" placeholder="Password" secureTextEntry={true} value={password} right={<TextInput.Icon icon="eye" />} style={styles.input} onChangeText={(value) => setPassword(value)}/>
                <FilledButton title='Masuk' style={styles.button} onPress={submitwronline} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.text1}> ────────────────   ©2022  ────────────────</Text>
                <Text style={styles.text2}>Manufacture Engineering Dept | Technology Control Sect</Text>
                <Text style={styles.text3}>Version 1.0.0</Text>
            </View>
            <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Message"
          message= {messagelogin}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
        />
        </View>

        
    );
}

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