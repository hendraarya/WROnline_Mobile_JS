import React from "react";
import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export function MenuHeader({onPress1, onPress2}) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logonmaxsmaller.png')} />
            <View style={styles.containericon}>
                <View>
                    <TouchableOpacity style={styles.notificationicon} onPress={onPress1}>
                        <Icon name="md-notifications" size={25} color="white" />
                        <Text style={{ color: 'white' }}>Notification </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.helpicon} onPress={onPress2}>
                        <Icon name="md-help-circle" size={25} color="white" />
                        <Text style={{ color: 'white' }}>Help </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    containericon: {
        flexDirection: "row",
        margin: 5

    },
    notificationicon: {
        marginLeft: 12,
        alignItems: 'center'
    },
    helpicon: {
        alignItems: 'center'
    },


});