import React, { useState, useEffect, useContext, useMemo } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import moment from "moment";
import { RadioButton, TextInput, Divider, Dialog, Portal, Provider, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import { FilledButton } from "../components/FilledButton";
import { QRcodeContext } from "../context/QRcodeContext";

//Library API
import axios from "axios";

//Utils
import {sleep} from '../Utils/sleep';
import { dialogIcons } from "../Utils/dialogIcons";
import AwesomeAlert from 'react-native-awesome-alerts';


//Create Container 
import MainContainer from "../components/MainContainer";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";

//use Context(Variable Global)
import { WROnlineContext } from "../context/WROnlineContext";
import AuthContext from "../context/AuthContext";

//QR CODE Scanner
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { async } from "rxjs";





export default function InputWrScreen({navigation,route}) {

    // let qrvalue = {route.param.paramKey};
    const valuehendra = useContext(QRcodeContext);
    // Variable for get data sending Request WR Online
    const [nik, setNik] = useState('');
    const [machineid, setMachineId] = useState('');
    const [date3, setDate3] = useState(new Date());
    const [opendate, setOpendate] = useState(false);
    const [time3, setTime3] = useState(new Date());
    const [opentime, setOpentime] = useState(false);
    const [problem, setProblem] = useState('');
    const [valueproblem, setValueProblem] = React.useState('');
    const [visibleproblem, setVisibleProblem] = React.useState(false);
    const showDialog = () => setVisibleProblem(true);
    const hideDialog = () => setVisibleProblem(false);
    const [valueurgency, setValueUrgency] = React.useState('');
    const [visibleurgency, setVisibleUrgency] = React.useState(false);
    const showDialogUrgency = () => setVisibleUrgency(true);
    const hideDialogUrgency = () => setVisibleUrgency(false);
    const [error, setError] = React.useState('');
    
    const [users, setUsers] = useState([]);
    let disableurgent = valueproblem;
    const [showAlert, setShowAlert] = useState(false);

    const showAlert2 = () => {
    setShowAlert(true);

  };

  const hideAlert = () => {
     setShowAlert(false);
  };

    //Access Function use Context(Variable Global)
    const {value} = useContext(AuthContext);
    // const { sendwr } = React.useContext(WROnlineContext);

    const backmenu = async () => {
        await value.setQrnik("");
        await value.setQrmachineid("");
        navigation.navigate('RequestWr')
    }

    //Function Submit WR Online
    const submitwronline = () => {
        const data = {
            snik: route.params.paramKey2,
            smach: route.params.paramKey,
            drepair: convertmoment_date,
            trepair: convertmoment_time,
            sproblem: problem.toUpperCase(),
            stype: valueproblem.toUpperCase(),
            surgency: valueurgency.toUpperCase(),
        };
        axios
            .post('http://10.202.10.77:3000/api/getnikname', data)
            /* localhost emulator harus diganti dengan ip local : 10.0.2.2, agar device tidak bingung, soalnya device use localhost */
            .then( async res => {
                // console.log('res:', res);
                
                await value.setQrnik("");
                await value.setQrmachineid("");
                console.log('WR Berhasil Terkirim!');
                // await dialogIcons();
                await showAlert2();
                await sleep(1000);
                await navigation.navigate('RequestWr');
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    const getData = () => {
        axios.get('http://10.202.10.77:3000/api/mesin').then(res => {
            // console.log('res get data:', res.data);
            setUsers(res.data.data);

        });
    };

    // convert data date & time use moment js
    var convertmoment_date = moment(new Date(date3)).format('YYYY-MM-DD');
    var convertmoment_time = moment(new Date(time3)).format('HH:mm:ss');
    // const [qrmachine,setQrmachine]=useState(qrvalue);

    useEffect(() => {
        getData();
        console.log('datalength ini :', users);
        console.log('Date Selection:', date3);
        console.log('Time Selection:', time3);
        console.log('Date Convert Momentjs:', convertmoment_date);
        console.log('Time Convert Momentjs:', convertmoment_time);
        console.log('nilai QR Code:', );
        console.log('nilai QR Code Textbox:', );
    }, [date3, time3, convertmoment_date, convertmoment_time]);


    return (
        <MainContainer>
            <MainHeader>
                <View style={styles.mainheader}>
                    <TouchableOpacity >
                        <Icon name="md-arrow-back-outline" size={30} color={'white'} style={{ margin: 17 }} onPress={backmenu} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Request WR Online</Text>
                </View>
            </MainHeader>
            <MainContent>
                <View style={{ flexDirection: 'row',alignContent:"flex-start", marginVertical:30 ,marginHorizontal:30}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Qrcode',{fill: "fillnik"})} style={{ width: '100%' }}>
                    <TextInput mode="flat" label="NIK" style={{ width: '40%' }} left={<TextInput.Icon icon="sticker-text-outline" />} value={route.params.paramKey2} onChangeText={(value) => setNik(value)} editable={false}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Qrcode',{fill: "fillmachineid"})} style={{ width: '90%', marginLeft:-175}}>
                    <TextInput
                        label="Machine ID"
                        left={<TextInput.Icon icon="factory" />}
                        style={{ width: '60%', marginLeft: 10 }}
                        value={route.params.paramKey} onChangeText={(value) => setMachineId(value)}
                        editable={false}
                    />
                    </TouchableOpacity>
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', margin: 30 }}>
                    <TouchableOpacity onPress={() => setOpendate(true)} style={{ width: '50%' }} >
                        <TextInput label="Failure Date" left={<TextInput.Icon icon="calendar-range" />}
                            editable={false}
                            pointerEvents="none"
                            value={moment(new Date(date3)).format('YYYY-MM-DD')}
                            onChangeText={(value) => setDate3(value)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpentime(true)} style={{ width: '50%', marginLeft: 10 }} >
                        <TextInput
                            label="Failure Time"
                            left={<TextInput.Icon icon="clock-outline" />}
                            editable={false} pointerEvents="none" value={moment(new Date(time3)).format('HH:mm:ss')} onChangeText={(value) => setTime3(value)}
                        />
                    </TouchableOpacity>
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', margin: 30 }}>
                    <TextInput mode="flat" label="Problem" style={{ width: '100%' }} left={<TextInput.Icon icon="alert-circle-outline" />} value={problem} onChangeText={(value) => setProblem(value)} />
                </View>
                <Divider />
                <Provider>
                    <View style={{ margin: 30, width: '85%' }}>
                        <TouchableOpacity onPress={showDialog} >
                            <TextInput mode="flat" label="Type Problem" style={{ width: '100%' }} left={<TextInput.Icon icon="tools" />} editable={false} value={valueproblem} onChangeText={(value) => setValueProblem(value)} />
                            {}
                        </TouchableOpacity>
                        <Portal>
                            <Dialog visible={visibleproblem} onDismiss={hideDialog}>
                                <Dialog.Title>Type Problem</Dialog.Title>
                                <Dialog.Content>
                                    <RadioButton.Group onValueChange={value => setValueProblem(value)} value={valueproblem}>
                                        <RadioButton.Item label="Emergency Stop" value="Emergency Stop" />
                                        <RadioButton.Item label="Machine Mulfunction" value="Machine Mulfunction" />
                                        <RadioButton.Item label="Plan" value="Plan" />
                                        <RadioButton.Item label="Other" value="Other" />
                                    </RadioButton.Group>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={hideDialog}>Done</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </View>
                </Provider>
                <Divider />
                <Provider>
                    <View style={{ margin: 30, width: '85%' }}>
                        <TouchableOpacity onPress={showDialogUrgency} disabled={disableurgent === 'Emergency Stop'? false:true} >
                            <TextInput mode="flat" label="Type Urgency" style={{ width: '100%' }} left={<TextInput.Icon icon="tools" />} editable={false} value={valueurgency} onChangeText={(value) => setValueUrgency(value)} />
                        </TouchableOpacity>
                        <Portal>
                            <Dialog visible={visibleurgency} onDismiss={hideDialogUrgency}>
                                <Dialog.Title>Type Urgency</Dialog.Title>
                                <Dialog.Content>
                                    <RadioButton.Group onValueChange={value => setValueUrgency(value)} value={valueurgency}>
                                        <RadioButton.Item label="Safety" value="Safety" />
                                        <RadioButton.Item label="Quality" value="Quality" />
                                        <RadioButton.Item label="Audit" value="Audit" />
                                        <RadioButton.Item label="Item Urgent" value="Item Urgent" />
                                    </RadioButton.Group>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={hideDialogUrgency}>Done</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </View>
                </Provider>
                {/* <Text>Values passed from First page: {route.params.paramKey}</Text> */}

                <DatePicker
                    androidVariant="iosClone"
                    locale="en"
                    textColor="red"
                    confirmText="set date"
                    theme="light"
                    mode="date"
                    modal
                    open={opendate}
                    date={date3}
                    onConfirm={(date) => {
                        setOpendate(false),
                            setDate3(date)

                    }}
                    onCancel={() => {
                        setOpendate(false)
                    }}
                />

                <DatePicker
                    androidVariant="iosClone"
                    locale="en"
                    textColor="red"
                    confirmText="set time"
                    theme="light"
                    mode="time"
                    modal
                    open={opentime}
                    date={time3}
                    is24hourSource={'device'}
                    onConfirm={(date) => {
                        setOpentime(false),
                            setTime3(date)

                    }}
                    onCancel={() => {
                        setOpentime(false)
                    }}
                />

                <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
          }}
        />

                {/* {

                    users.map((value, index) => {
                        return (
                            <View key={index}>
                                <Text>{value.id}</Text>
                                <Text>{value.name}</Text>
                            </View>
                        );
                    })

                } */}



            </MainContent>
            <MainFooter>
                <FilledButton title="Send WR to Maintenance" style={styles.button} onPress={submitwronline} />
                {/* async () => {
                    const data = {
                    snik: nik,
                smach: machineid,
                drepair: convertmoment_date,
                trepair: convertmoment_time,
                sproblem: problem,
                stype: valueproblem,
                surgency: valueurgency,
                    };
                try {
                    await sendwr(data);
                navigation.pop();

                    } catch (e) {
                    // setError(e.message);   
                }
                } */}
            </MainFooter>
        </MainContainer>

    )
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