import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform, ScrollView } from "react-native";
import { Card, Title, DataTable, Divider, Searchbar, AnimatedFAB } from 'react-native-paper';
import { MenuHeader } from "../components/MenuHeader";
import { MenuFooter } from "../components/MenuFooter";
import Icon from 'react-native-vector-icons/Ionicons';

//Create Main Container
import MainContainer from "../components/MainContainer";
import MainHeader from "../components/MainHeader";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";


const wronline = [
    {
        wrid: 'WR220818-01',
        machine_no: 'HP-123-ID',
        date: '2022-03-10',
        time: '10:02:01',
        problem: 'Mold Abnormal',
        priority: 'Prioroty 1',
        status: 'Received'
    },
    {
        wrid: 'WR220818-02',
        machine_no: 'HP-124-ID',
        date: '2022-03-10',
        time: '10:02:01',
        problem: 'Mold Abnormal',
        priority: 'Prioroty 1',
        status: ''
    },
    {
        wrid: 'WR220818-03',
        machine_no: 'HP-125-ID',
        date: '2022-03-11',
        time: '12:02:01',
        problem: 'Emergency',
        priority: 'Prioroty 2',
        status: 'Received'
    },
    {
        wrid: 'WR220818-04',
        machine_no: 'HP-127-ID',
        date: '2022-03-17',
        time: '12:02:01',
        problem: 'Broken',
        priority: 'Prioroty 3',
        status: 'Received'
    },
    {
        wrid: 'WR220818-05',
        machine_no: 'HP-129-ID',
        date: '2022-03-19',
        time: '15:02:01',
        problem: 'Emergency',
        priority: 'Prioroty 1',
        status: 'Received'
    },


    // more users here
];

let finalObj = {}
wronline.forEach((games) => {
    const date = games.date.split('T')[0]
    if (finalObj[date]) {
        finalObj[date].push(games);
    } else {
        finalObj[date] = [games];
    }
})

const optionsPerPage = [2, 3, 4];

export default function RequestWrScreen({animatedValue,
    visible,
    extended,
    label,
    animateFrom,
    style,
    iconMode, navigation}) {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query) => setSearchQuery(query);


    const [isExtended, setIsExtended] = React.useState(true);

    const isIOS = Platform.OS === 'ios';

    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition =
            Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

        setIsExtended(currentScrollPosition <= 0);
    };

    const fabStyle = { [animateFrom]: 16 };

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <MainContainer>
            <MainHeader>
                <MenuHeader />
            </MainHeader>
            <MainContent>
                <View>
                    <Card>
                        <Card.Content style={{ margin: 5, backgroundColor: '#f8f8ed', borderRadius: 10 }}>
                            <Title style={{ textAlign: 'center', color: '#08737f', fontStyle: 'italic' }}> WR ONLINE STATUS </Title>
                            <Divider />
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f' }}>Total WR Online Today</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f', fontSize: 16 }}>40</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f' }}>Total All WR Online</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f', fontSize: 16 }}>2000</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </View>
                <Divider />

                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <ScrollView>
                    {

                        wronline.map((value, index) => {
                            return (
                                <View key={index}>
                                    <Text>{value.wrid}</Text>
                                </View>
                            );
                        })

                    }
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Qrcode')}><Text>Scan QRCode</Text></TouchableOpacity>
                    </View>
                </ScrollView>

                <AnimatedFAB
                    icon={'plus'}
                    label={'Input WR Online'}
                    extended={isExtended}
                    onPress={() => navigation.navigate('InputWr')}
                    visible={visible}
                    animateFrom={'right'}
                    iconMode={'static'}
                    style={[styles.fabStyle, style, fabStyle]}
                />

            </MainContent>

            <MainFooter>
                <MenuFooter color1='white' color2='#92dc7e' style1={{ color: 'white' }} style2={{ color: '#92dc7e' }} />
            </MainFooter>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
    datatable1: {
        fontSize: 5,
    },
});