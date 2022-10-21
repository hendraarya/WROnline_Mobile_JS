import React, { Fragment,useState, useEffect,useRef, useContext} from "react";
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';

//Add UseContext for create variable global
import AuthContext from "../context/AuthContext";

//QR CODE Scanner
import QRCodeScanner from 'react-native-qrcode-scanner';

//For setting Size screen
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

//Start Function
export default function QRcode ({navigation,route}) { 

    //Variable set showing QRCode
    const scanner = useRef(null); //useRef itu fungsinya seperti id
    const [scan, setScan] = useState(true);
    const [scanResult, setScanResult] = useState(false);
    const [result, setResult] = useState(null);

    //Variable get data from useContext
    const {value} = useContext(AuthContext);
    console.log('Context qrmachineid:',value.qrmachineid);
    console.log('Context qrnik:',value.qrnik);

    //Function, set data if scan,QR Code Success
    const onSuccess = async (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data ' + check);
        setResult(e);
        setScan(false);
        setScanResult(true);
        
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            if(route.params.fill === 'fillnik')
            {
                setResult(e);
                console.log('hasil QRcode.js nik:', e.data);
                setScan(false);
                setScanResult(true);
                await value.setQrnik(e.data)
                await navigation.navigate('InputWr',{paramKey:value.qrmachineid,paramKey2: e.data});
            }
            else if(route.params.fill === 'fillmachineid')
            {
                setResult(e);
                console.log('hasil QRcode.js machine id:', e.data);
            
                setScan(false);
                setScanResult(true);
                await value.setQrmachineid(e.data);
                await navigation.navigate('InputWr',{paramKey:e.data,paramKey2: value.qrnik});     
            }  
      }
   };

    const activeQR = () => {
        setScan(true);
    }
    const scanAgain = () => {
        setScan(true);
        setScanResult(false);
    }

    //useEffect for Re render Component , even first running
        useEffect(() => {
            setResult(null);
        }, []);

    //Start Return
    return (
        <View style={styles.scrollViewStyle}>
            <Fragment>
                {/* Strat Show camera to scan Barcode */}
                {scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={scanner}
                        onRead={onSuccess}
                        topContent={
                            <Text style={styles.centerText}>
                                Please move your camera {"\n"} over the QR Code
                            </Text>
                        }
                    bottomContent={
                        <View>
                            <ImageBackground source={require('../assets/images/bottom-panel.png')} style={styles.bottomContent}>
                                <TouchableOpacity style={styles.buttonScan2}
                                    onPress={() => scanner.current.reactivate()}
                                    onLongPress={() => setScan(false)}>
                                    <Image source={require('../assets/images/camera2.png')}></Image>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    }
                    />
                }
                {/* End Show camera to scan Barcode */}
            </Fragment>
        </View>
    );
     //End Return
}
//End Function

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#2196f3'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '10%',
        paddingLeft: 15,
        paddingTop: 10,
        width: deviceWidth,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight - 350,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: '10%',
        backgroundColor: 'white'
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonScan: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#258ce3',
        paddingTop: 5,
        paddingRight: 25,
        paddingBottom: 5,
        paddingLeft: 25,
        marginTop: 20
    },
    buttonScan2: {
        marginLeft: deviceWidth / 2 - 50,
        width: 100,
        height: 100,
    },
    descText: {
        padding: 16,
        textAlign: 'center',
        fontSize: 16
    },
    highlight: {
        fontWeight: '700',
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        padding: 32,
        color: 'white',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    bottomContent: {
        width: deviceWidth,
        height: 120,
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: 'white',
        marginTop: 32,
        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 'bold',
    }
});