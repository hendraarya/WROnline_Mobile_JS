import React from "react";
import { View, StyleSheet } from "react-native";

export default function MainContent({ children }) {
    return (
        <View style={styles.content}>
            {children}
        </View>


    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fefefe',
    },
});