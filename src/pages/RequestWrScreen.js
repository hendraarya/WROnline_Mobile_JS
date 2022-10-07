import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform, ScrollView,FlatList,StatusBar } from "react-native";
import { Card, Title, Divider, AnimatedFAB,Paragraph, Dialog, Portal,Searchbar} from 'react-native-paper';

//Add Component 
import { MenuHeader } from "../components/MenuHeader";
import { MenuFooter } from "../components/MenuFooter";
import { SearchData } from "../components/SearchData";

//Create Main Container
import MainContainer from "../components/MainContainer";
import MainHeader from "../components/MainHeader";
import MainContent from "../components/MainContent";
import MainFooter from "../components/MainFooter";

//Library API
import axios from "axios";

export default function RequestWrScreen({animatedValue,visible,extended,label,animateFrom,style,iconMode, navigation}) {

    //Start variable for function search data wr online
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState("Data Not Found !");
    const [term, setTerm] = useState("");

    // const [searchQuery, setSearchQuery] = React.useState([]);
    const[filterData, setfilterData] = useState([]);
    const [search, setSearch] = useState('');
    
    // const onChangeSearch = query => setSearchQuery(query);
    //End variable for function search data wr online

    //Start variable for function pagination data wr online
    const [page, setPage] = useState(1);
    const [offpagging, setoffPagging] = useState();
    const resetData = useRef(false);
    //End variable for function pagination data wr online

    //Start Show Dialog Info WR Online
    const showDialog = () => setVisible2(true);
    const [visible2, setVisible2] = React.useState(false);
    const hideDialog = () => setVisible2(false);
    //End Show Dialog Info WR Online


    //Start Create Animated FAB Input WR Online
    const [isExtended, setIsExtended] = React.useState(true);
    const isIOS = Platform.OS === 'ios';
    const onScroll = ({ nativeEvent }) => 
    {
        const currentScrollPosition =
            Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
        setIsExtended(currentScrollPosition <= 0);
    };
    const fabStyle = { [animateFrom]: 16 };
    //End Create Animated FAB Input WR Online

    //Declare useState for get data AXIOS
    const [gettotalWrtoday, setGettotalWrtoday] = useState({count:''});
    const [gettotalallWr, setGettotalallWr] = useState({count: '',});
    const [getdatawr, setGetdatawr] = useState([]);

    //start Get Data with AXIOS
    const getData_totalwrtoday = () => {
    axios
    .get('http://10.202.10.77:3000/api/countdatawrtoday')
    .then(res => {
            // console.log("nilai count total WR Today:", res.data.data);
            setGettotalWrtoday(res.data.data[0]);
        });
    }

    const getData_totalallwr = () => {
    axios
    .get('http://10.202.10.77:3000/api/countdataallwr')
    .then(res => {
            // console.log("nilai count total all WR:", res.data.data);
            setGettotalallWr(res.data.data[0]);
        });
    }

    const getData_Wr = () => {
    axios
    .get(`http://10.202.10.77:3000/api/getalldata_wr/${page}`)
    .then(result => {
        setGetdatawr(result.data.data.dataresult);
        setfilterData(result.data.data.dataresult);
        // console.log("dat wr online:", result.data.data.dataresult[0]);
    });
    }

    const searchDataWr = (t) => {
        axios
        .get(`http://10.202.10.77:3000/api/searchdatawr/2022-09-29`)
        .then((res) => {
            if (res.data.data.length > 0){
                setPosts(res.data.data);
            }
            else {
                setPosts([]);
                setErr("Data not found");
            }
        });
    };
    //End Get Data with AXIOS

    const searchFilter = (text) => {
        
            if(text) {
                const newData = getdatawr.filter((item) => {
                    const itemData = item.date ? item.date : '';
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;                 
                });
                setfilterData(newData);
                setSearch(text);
                resetData.current = true;
            }
            else {
                setfilterData(getdatawr);
                setSearch(text);
                resetData.current = false;
            }
        
    }

    const ItemSeparatorView = () => {
        return (
            <View style={{height:0.5, width:'100%', backgroundColor:'#c8c8c8'}}/>
        )
    }

     const handleOnEnd = () => {
    if (search.length > 1) {
      return
    }
    
    setPage(page + 1);
    
  };




    //Start render data all dara wr online
    const renderAlldatawr = ({item}) => {
        return (
           <View>
            <Text style={[styles.textdatewr, {marginTop:'3%'}]}>{item.date}</Text>
            <Divider />
                <FlatList
                    data = {item.values}
                    renderItem={({ item }) => 
                    <View>
                    <View style={styles.styledatawr}>
                    <View style={{flexDirection:'column'}}>
                    <Text style={[styles.styletextdatawr,{fontWeight:'bold'}]}>{item.swr}</Text>
                    <Text style={styles.styletextdatawr}>{item.smach}</Text>
                    <Text style={styles.styletextdatawr}>{item.trepair}</Text>
                    <Text style={[styles.styletextdatawr,{width:80}]} ellipsizeMode='tail' numberOfLines={1} >{item.sproblem}</Text>
                    </View>
                    <Text style={[styles.styletextdatawr, {paddingTop:'8%', marginLeft: '25%'}]}>{item.spriority}</Text>
                    {
                        item.sstatus === 'RECEIVED'
                        ?<Text style={[styles.styletextdatawr, {paddingTop:'8%',marginLeft: '25%',color:'green'}]}>{item.sstatus}</Text>
                        :<Text style={[styles.styletextdatawr, {paddingTop:'8%',marginLeft: '25%',color:'red'}]}>{item.sstatus}</Text>
                    }     
                    </View>
                    <Divider style={{borderWidth:0.3, borderColor:'#c7c4c4'}}/>
                </View>
                    }
                        
                />
            </View>
        );
    }
    //End render data all dara wr online

    
    //useEffect for Re render Component , even first running
    React.useEffect(() => {
        getData_totalwrtoday();
        getData_totalallwr();
        getData_Wr();
        searchDataWr(term);
    },[term,page,search]);

    return (
        <MainContainer>
            <MainHeader>
                <MenuHeader onPress1={() => navigation.navigate('notif')} onPress2={() => navigation.navigate('help')} />
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
                                    <Text style={{ fontWeight: 'bold', color: '#08737f', fontSize: 16 }}>{gettotalWrtoday.count}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f' }}>Total All WR Online</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#08737f', fontSize: 16 }}>{gettotalallWr.count}</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </View>
                <Divider />

                <Searchbar
                    placeholder="Search"                  
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                    />

                {/* <SearchData onSearchEnter={(newTerm) => {
               setTerm(newTerm);
               setErr("");
                }}/> */}

                <View style={styles.headerdatawr}>
                    <Text style={styles.textdatawr}>Date</Text>
                    <Text style={styles.textdatawr}>Priority</Text>
                    <Text style={styles.textdatawr}>Status WR</Text>
                </View>

                <FlatList
                    data = {filterData}
                    onEndReachedThreshold={2}
                    onEndReached={handleOnEnd}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem = {renderAlldatawr}
                />
                
                    
                    {/* {
                        getdatawr.map((value,index) => {
                            return (
                                <View key={index}>
                                    <Text style={[styles.textdatewr, {marginTop:'3%'}]}>{value.date}</Text>
                                    <Divider />
                                    
                                    {
                                        value.values.map((value2,index2) => {
                                            return (
                        
                                            <View key={index2}>
                                              <View style={styles.styledatawr}>
                                                <View style={{flexDirection:'column'}}>
                                                <Text style={[styles.styletextdatawr,{fontWeight:'bold'}]}>{value2.swr}</Text>
                                                <Text style={styles.styletextdatawr}>{value2.smach}</Text>
                                                <Text style={styles.styletextdatawr}>{value2.trepair}</Text>
                                                <Text style={[styles.styletextdatawr,{width:80}]} ellipsizeMode='tail' numberOfLines={1} >{value2.sproblem}</Text>
                                                </View>
                                                <Text style={[styles.styletextdatawr, {paddingTop:'8%', marginLeft: '25%'}]}>{value2.spriority}</Text>
                                                {
                                                 value2.sstatus === 'RECEIVED'
                                                 ?<Text style={[styles.styletextdatawr, {paddingTop:'8%',marginLeft: '25%',color:'green'}]}>{value2.sstatus}</Text>
                                                 :<Text style={[styles.styletextdatawr, {paddingTop:'8%',marginLeft: '25%',color:'red'}]}>{value2.sstatus}</Text>
                                                }     
                                              </View>
                                                <Divider style={{borderWidth:0.3, borderColor:'#c7c4c4'}}/>
                                            </View>
                                    
                                            );
                                        })
                                    }
                                    
                                    
                                </View>
                            )
                        }) 
                    } */}

                <AnimatedFAB
                    icon={'plus'}
                    label={'Input WR Online'}
                    extended={isExtended}
                    onPress={() => navigation.navigate('InputWr',{paramKey: "", paramKey2: ""})}
                    visible={visible}
                    animateFrom={'right'}
                    iconMode={'static'}
                    style={[styles.fabStyle, style, fabStyle]}
                />
         {/* <View>    
        <Portal>
          <Dialog visible={visible2} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
            <TouchableOpacity onPress={hideDialog}>Done</TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        </View>    */}

            </MainContent>

            <MainFooter>
                 <MenuFooter color1='white' color2='#92dc7e' color3='white' style1={{ color: 'white' }} style2={{ color: '#92dc7e' }} style3={{ color: 'white' }} onPress1={() => navigation.navigate('Home')} onPress2={() => navigation.navigate('RequestWr')} onPress3={() => navigation.navigate('InfoAccount')}/>
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
    headerdatawr: {
        backgroundColor: '#f8f8ed',
        flexDirection: 'row',
        justifyContent:"space-between",
        padding:'3%'
        
    },
    styledatawr:{
        flexDirection: 'row',
        justifyContent:"space-between",
        width: '75%'
        
        
    },
    styletextdatawr:{
        fontSize:14,
        color: 'black',
        textAlign: 'left'
    },
    textdatawr:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#08737f',
        textAlign: 'center'
    },
    textdatewr:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#342a2a',
        backgroundColor:'#d0d7d2',
    },
});