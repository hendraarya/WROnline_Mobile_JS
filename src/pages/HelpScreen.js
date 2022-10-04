import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


//Create Main Container
import MainContainer from "../components/MainContainer";
import MainHeader from "../components/MainHeader";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";

//Add Component 
import { MenuHeader } from "../components/MenuHeader";
import { MenuFooter } from "../components/MenuFooter";


export default function HelpScreen({navigation}){
    return(
          <MainContainer>
            <MainHeader>
                <View style={styles.mainheader}>
                    <TouchableOpacity >
                        <Icon name="md-arrow-back-outline" size={30} color={'white'} style={{ margin: 17 }} onPress={() => navigation.navigate('Home')} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Info Center</Text>
                </View>
            </MainHeader>
            <MainContent>
                <Text>Halaman Info Account</Text>

            </MainContent>

        </MainContainer>
    );
}


const styles = StyleSheet.create({
    mainheader: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    maincontent: {
        width: '100%',
        margin: 10,
        backgroundColor: 'red'
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        color: 'white',
        margin: 20
    },
    button: {
        backgroundColor: '#2a4858',
        marginHorizontal: 20,
        marginTop: 2,
        width: '90%',
        borderRadius: 40
    },
    textnik: {
        width: '40%'
    }
})