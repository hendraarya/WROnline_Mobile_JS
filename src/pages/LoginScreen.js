import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet, View, Text, Image } from "react-native";
import { FilledButton } from "../components/FilledButton";
import Input from "../components/Input";

export default function LoginScreen({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/logonmaxsmall2.png')} />
            </View>
            <View style={styles.content}>
                <Input placeholder="Username" style={styles.input} />
                <Input placeholder="Password" style={styles.input} />
                <FilledButton title='Masuk' style={styles.button} onPress={() => navigation.navigate('RequestWr')} />
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