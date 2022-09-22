import React from "react";
import { View, StyleSheet } from "react-native";

export default function MainContainer({ children }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cdd8d4'
    },
    header: {
        flex: 0.1,
        backgroundColor: '#4c9ba5',
    },
    content: {
        flex: 1,
        backgroundColor: '#fefefe',
    },
    footer: {
        flex: 0.1,
        backgroundColor: '#4c9ba5',
    },
});