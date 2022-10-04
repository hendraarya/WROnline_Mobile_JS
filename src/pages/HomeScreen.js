import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';

//Create Main Container
import MainContainer from "../components/MainContainer";
import MainHeader from "../components/MainHeader";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";

//Add Component 
import { MenuHeader } from "../components/MenuHeader";
import { MenuFooter } from "../components/MenuFooter";


export default function HomeScreen({navigation}){
    return(
        <MainContainer>
            <MainHeader>
                <MenuHeader onPress1={() => navigation.navigate('notif')} onPress2={() => navigation.navigate('help')}/>
            </MainHeader>
            <MainContent>
                <View style={styles.maincontent}>
                <Text style={styles.textwelcome}>Welcome <Text style={{color:'#d66493', fontSize: 21, fontVariant: ['oldstyle-nums'], fontStyle: 'italic', fontWeight:'bold' }}>Production 3</Text></Text>
                <Image source={require('../assets/images/logonmaxsmall2.png')} />
                </View>

            </MainContent>

            <MainFooter>
                 <MenuFooter color1='#92dc7e' color2='white' color3='white' style1={{ color: '#92dc7e' }} style2={{ color: 'white' }} style3={{ color: 'white' }} onPress1={() => navigation.navigate('Home')} onPress2={() => navigation.navigate('RequestWr')} onPress3={() => navigation.navigate('InfoAccount')}/>
            </MainFooter>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    maincontent:{
        marginVertical: '50%',
        marginHorizontal: '25%',
        flexDirection:'column',
        alignItems:'center',
        width: '50%',
        
    },
    textwelcome:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    imagestyle: {
        width: '50',
        height: '50'
    }
})