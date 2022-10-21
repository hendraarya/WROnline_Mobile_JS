import React, { useState, useEffect, useContext} from "react";
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

//Create Main Container
import MainContainer from "../components/MainContainer";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";

//Add UseContext for create variable global
import AuthContext from "../context/AuthContext";
import { QRcodeContext } from "../context/QRcodeContext";

//Add Component 
import { FilledButton } from "../components/FilledButton";

//Add Additional Library
import { RadioButton, TextInput, Divider, Dialog, Portal, Provider, Button } from "react-native-paper";
import moment from "moment";
import DatePicker from 'react-native-date-picker';

//Add Library Icon
import Icon from 'react-native-vector-icons/Ionicons';

//Utils
import {sleep} from '../Utils/sleep';
import AwesomeAlert from 'react-native-awesome-alerts';

//Library API
import axios from "axios";

//Import config URL API
import { BASE_URLAPI } from '../config/URLAPI';

//QR CODE Scanner
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

//Start Function
export default function InputWrScreen({navigation,route}) {

    // Variable for get data sending Request WR Online
    const [nik, setNik] = useState('');
    const [machineid, setMachineId] = useState('');

    //Access Function use Context(Variable Global)
    const {value} = useContext(AuthContext);

    //Variable for datepicker
    const [date3, setDate3] = useState(new Date());
    const [opendate, setOpendate] = useState(false);
    const [time3, setTime3] = useState(new Date());
    const [opentime, setOpentime] = useState(false);

    //Variable for set value from combo box problem
    const [problem, setProblem] = useState('');
    const [valueproblem, setValueProblem] = React.useState('');
    const [visibleproblem, setVisibleProblem] = React.useState(false);
    const showDialog = () => setVisibleProblem(true);
    const hideDialog = () => setVisibleProblem(false);

    //Variable for set value from combo box Urgency
    const [valueurgency, setValueUrgency] = React.useState('');
    const [visibleurgency, setVisibleUrgency] = React.useState(false);
    const showDialogUrgency = () => setVisibleUrgency(true);
    const hideDialogUrgency = () => setVisibleUrgency(false);
    
    //Variable for Show message of Send WR
    const [showAlert, setShowAlert] = useState(false);
    let disableurgent = valueproblem;

    //Variable for convert data date & time use moment js
    var convertmoment_date = moment(new Date(date3)).format('YYYY-MM-DD');
    var convertmoment_time = moment(new Date(time3)).format('HH:mm:ss');

    //Function for set Show message of Send WR
    const showAlert2 = () => {
        setShowAlert(true);
    };

    const hideAlert = () => {
        setShowAlert(false);
     };

    //Functon Back to menu before
    const backmenu = async () => {
        await value.setQrnik("");
        await value.setQrmachineid("");
        navigation.navigate('RequestWr')
    }

    //Start Get Data with AXIOS

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
          /* localhost emulator harus diganti dengan ip local : 10.0.2.2, agar device tidak bingung, soalnya device use localhost */
        .post(`${BASE_URLAPI}/api/getnikname`, data)
        .then( async res => {               
            await value.setQrnik("");
            await value.setQrmachineid("");
            console.log('WR Berhasil Terkirim!');
            // await dialogIcons();
            showAlert2();
            await sleep(2000);
            await navigation.navigate('RequestWr');
        })
        .catch(err => {
                console.log(err.response.data)
        })
    }

    //End Get Data with AXIOS

    //useEffect for Re render Component , even first running
    useEffect(() => {
        console.log('Date Selection:', date3);
        console.log('Time Selection:', time3);
        console.log('Date Convert Momentjs:', convertmoment_date);
        console.log('Time Convert Momentjs:', convertmoment_time);
        console.log('nilai QR Code:', );
        console.log('nilai QR Code Textbox:', );
    }, [date3, time3, convertmoment_date, convertmoment_time]);


    //Start Return
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

                {/* This function datepicker mode:date */}
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

                {/* This function datepicker mode:time */}
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

                {/* This function Show message, if Send WR Success */}
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Message"
                    message="Sending Work Request Successfully !!"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                />

            </MainContent>

            <MainFooter>
                <FilledButton title="Send WR to Maintenance" style={styles.button} onPress={submitwronline} />
            </MainFooter>

        </MainContainer>

    )
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