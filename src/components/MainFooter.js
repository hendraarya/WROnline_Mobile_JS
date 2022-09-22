import React from "react";
import { View, StyleSheet } from "react-native";

export default function MainFooter({ children }) {
    return (
        <View style={styles.footer}>
            {children}
        </View>


    );
}

const styles = StyleSheet.create({
    footer: {
        flex: 0.1,
        backgroundColor: '#4c9ba5',
    },
});