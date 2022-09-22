import React from "react";
import { Text, ImageBackground } from "react-native";
import tailwind from "twrnc";

export default function Heading({ children, style, ...props }) {
    return (
        <ImageBackground source={require('../assets/images/icon_tc.png')} resizeMode="cover" style={tailwind`h-full`}>
            <Text {...props} style={[style, tailwind`text-xl text-red-800`]}>
                {children}
            </Text>
        </ImageBackground>

    );
}