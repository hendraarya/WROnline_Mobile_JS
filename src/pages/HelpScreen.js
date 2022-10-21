import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

//Add Library Icon
import Icon from 'react-native-vector-icons/Ionicons';

//Create Main Container
import MainContainer from "../components/MainContainer";
import MainHeader from "../components/MainHeader";
import MainContent from "../components/MainContent";

//Utils
import  {Avatar} from 'react-native-paper';

//Start Function
export default function HelpScreen({navigation}){

    //Start Return
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
                <View style={{marginVertical:'50%', marginHorizontal:'20%', width:'100%'}}>
                    <Avatar.Icon size={100} icon="alert-rhombus" style={{marginLeft:'15%'}} />
                    <Text style={{fontSize:24, fontWeight:'bold', color:'#dd2f2f'}}>Under Construction...</Text>
                    <Text style={{fontSize:17, fontWeight:'bold', color:'#003366', marginLeft:'5%'}}>Feature Coming Soon!!</Text>
                </View>
            </MainContent>
            
        </MainContainer>
    );
    //End Return
}
//End Function


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