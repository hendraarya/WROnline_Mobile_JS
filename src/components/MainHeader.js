import React from "react";
import { View, StyleSheet } from "react-native";

export default function MainHeader({ children }) {
    return (
        <View style={styles.header}>
            {children}
        </View>


    );
}

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
        backgroundColor: '#4c9ba5',
    },
});