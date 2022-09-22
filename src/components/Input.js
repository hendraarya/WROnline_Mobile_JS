import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Input({ style, ...props }) {
    return (
        <View>
            <TextInput {...props} style={[style, styles.columnBox]} />
        </View>
    );
}

const styles = StyleSheet.create({
    columnBox: {
        backgroundColor: '#e8e8e8',
        width: '95%',
        padding: 20,
        borderRadius: 8,
        margin: 10,
        // textDecorationLine: 'underline'
    }
});