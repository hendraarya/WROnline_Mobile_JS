import React, {useState, useEffect, useContext} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';

//Create Main Container
import MainContainer from "../components/MainContainer";
import MainHeader from "../components/MainHeader";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";

//Add UseContext for create variable global
import AuthContext from "../context/AuthContext";

//Add Component 
import { MenuHeader } from "../components/MenuHeader";
import { MenuFooter } from "../components/MenuFooter";

//Add Additional Library
import {Card,Title,Divider} from 'react-native-paper';

//Library API
import axios from "axios";


export default function HomeScreen({navigation}){

    //Declare useState for get data AXIOS
    const [gettotalWrtoday, setGettotalWrtoday] = useState({count:''});
    const [getdatcountstatuswr, setGetdatcountstatuswr] = useState({count:''})

    const {datglobaluserlogin} = useContext(AuthContext);

    //start Get Data with AXIOS
    const getData_totalwrtoday = () => {
    axios
    .get('http://10.202.10.77:3000/api/countdatawrtoday')
    .then(res => {
            // console.log("nilai count total WR Today:", res.data.data);
            setGettotalWrtoday(res.data.data[0]);
        });
    }
    
    const getcountstatuswr = () => {
        axios
        .get('http://10.202.10.77:3000/api/getcountallstatuswr')
        .then(res => {
            setGetdatcountstatuswr(res.data.data.rows[0]);
        });
    }
    //End Get Data with AXIOS

    //useEffect for Re render Component , even first running
    useEffect(() => {
        getData_totalwrtoday();
        getcountstatuswr();   
    },[gettotalWrtoday]);

    return(
        <MainContainer>
            <MainHeader>
                <MenuHeader onPress1={() => navigation.navigate('notif')} onPress2={() => navigation.navigate('help')}/>
            </MainHeader>
            <MainContent>
                <View style={styles.maincontent}>
                    <Text style={styles.textwelcome}>Welcome <Text style={{color:'#d66493', fontSize: 21, fontVariant: ['oldstyle-nums'], fontStyle: 'italic', fontWeight:'bold' }}>{datglobaluserlogin.datauserlogin.sname}</Text></Text>
                </View>
                 <View>
                    <Card>
                        <Card.Content style={{ margin: 5, backgroundColor: '#f8f8ed', borderRadius: 10 }}>
                            <Title style={{ textAlign: 'center', color: '#08737f', fontStyle: 'italic' }}> WR ONLINE STATUS TODAY </Title>
                            <Divider />
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f' }}>Total WR Online</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f', fontSize: 16 }}>{gettotalWrtoday.count}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f' }}>WR Received</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f', fontSize: 16 }}>{getdatcountstatuswr.wr_received}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f' }}>WR In Progress</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f', fontSize: 16 }}>{getdatcountstatuswr.wr_inprogress}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f' }}>WR Finished</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f', fontSize: 16 }}>{getdatcountstatuswr.wr_finish}</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
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
        marginHorizontal: '25%',
        flexDirection:'column',
        alignItems:'center',
        width: '50%',
        
    },
    textwelcome:{
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical:'50%'
    },
    imagestyle: {
        width: '50',
        height: '50'
    }
})