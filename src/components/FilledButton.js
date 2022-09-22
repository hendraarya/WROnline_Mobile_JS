import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export function FilledButton({ title, style, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.text}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0044ff',
        width: '100%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
});