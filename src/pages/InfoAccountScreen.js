import React, {useState, useContext} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

//Create Main Container
import MainContainer from "../components/MainContainer";
import MainHeader from "../components/MainHeader";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";

//Add Library Icon
import Icon from 'react-native-vector-icons/Ionicons';

//Add Additional Library
import  {Avatar} from 'react-native-paper';

//Add UseContext for create variable global
import AuthContext from "../context/AuthContext";

//Add Component 
import { FilledButton } from "../components/FilledButton";

//Add Utils
import AwesomeAlert from 'react-native-awesome-alerts';

//Start Function
export default function InfoAccountScreen({navigation}){

    //get data from variable global useContext
    const {datglobaluserlogin} = useContext(AuthContext);

    //Declare useState
    const [showAlert, setShowAlert] = useState(false);

    //Start Function for showing alert, if will logout
    const logoutconfirm = () => {
        showAlert2();            
    };

    const showAlert2 = () => {
        setShowAlert(true);
    };

    const hideAlert = () => {
        setShowAlert(false);
    };
    //End Function for showing alert, if will logout

    //Start Return
    return(
        <MainContainer>

            <MainHeader>
                <View style={styles.mainheader}>
                    <TouchableOpacity >
                        <Icon name="md-arrow-back-outline" size={30} color={'white'} style={{ margin: 17 }} onPress={() => navigation.navigate('Home')} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Info Account</Text>
                </View>
            </MainHeader>

            <MainContent>

                <View style={{backgroundColor:'#4c9ba5', height:'18%', padding: '6%' ,flexDirection:'row', marginTop:'1%'}}>
                    <Avatar.Text size={80} label={datglobaluserlogin.datauserlogin.code_user} />
                    <View style={{margin:'5%'}}>
                        <Text style={{color: 'white', fontWeight:'bold', fontSize:16}}>{datglobaluserlogin.datauserlogin.sname}</Text>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:14}}>{datglobaluserlogin.datauserlogin.ssection} <Text style={{color:'#fcd25d', fontSize:16}}>{datglobaluserlogin.datauserlogin.ssectdesc}</Text></Text> 
                    </View>
                </View>

                {/* Start Function to showing alert if will logout */}
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Confirmation"
                    message="Do you want Logout ?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Yes, logout"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        hideAlert();
                    }}
                    onConfirmPressed={
                        () => navigation.navigate('Login')
                    }
                />
                {/* End Function to showing alert if will logout */}
            
            </MainContent>

            <MainFooter>
                <FilledButton title="Logout" style={styles.button} onPress={logoutconfirm} />
            </MainFooter>

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
    },
    title: {
    textAlign: 'center',
  },
})