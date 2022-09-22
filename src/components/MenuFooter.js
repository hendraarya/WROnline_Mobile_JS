import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

// fungsi dari {...props} untuk membawa key beserta valuenya ke dalam suatu function
export function MenuFooter({ color1, color2, style1, style2 }) {
    return (
        <View style={styles.containermenu}>
            <View >
                <TouchableOpacity>
                    <Icon name="md-home" size={30} color={color1} style={{ marginLeft: 7 }} />
                    <Text style={[style1]}> Home </Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity>
                    <Icon name="md-create" size={30} color={color2} style={{ marginLeft: 16 }} />
                    <Text style={[style2]}>WR Online</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity>
                    <Icon name="md-people" size={30} color={color1} style={{ marginLeft: 12 }} />
                    <Text style={[style1]}>Account </Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    containermenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: '2%'
    },
    menuhome: {
        marginLeft: '5%',
        padding: 10,
    },
    iconhome: {
        paddingLeft: 10,
    },
});