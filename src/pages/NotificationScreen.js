import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


//Create Main Container
import MainContainer from "../components/MainContainer";
import MainHeader from "../components/MainHeader";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";

//Add Component 

//Utils
import  {Avatar,Text} from 'react-native-paper';


export default function NotificationScreen({navigation}){
    return(
        <MainContainer>
            <MainHeader>
                <View style={styles.mainheader}>
                    <TouchableOpacity >
                        <Icon name="md-arrow-back-outline" size={30} color={'white'} style={{ margin: 17 }} onPress={() => navigation.navigate('Home')} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Notification</Text>
                </View>
            </MainHeader>
            <MainContent>
                <View style={{marginTop:'70%', marginHorizontal:'35%', width:'100%'}}>
                    <Avatar.Icon size={100} icon="bell-alert"  />
                </View>
                 <Text style={{fontSize:14, fontWeight:'bold', marginLeft:'3%', marginTop:'1%'}}>No Notifications yet, wait Informationn from Tech.Control</Text>
                

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