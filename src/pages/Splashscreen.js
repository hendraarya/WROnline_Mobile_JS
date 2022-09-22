import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';


class SplashScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('Login'));
    }, 3000);
  }
  render() {
    return (
      <View style={Styles.container}>

        <View style={Styles.flex1}>
          <Image source={require('../assets/images/logonmaxsmall2.png')} />
        </View>
        <View style={Styles.flex2}>
          <Text style={Styles.text1}>Powered By | Version 1.0 </Text>
          <Text style={Styles.text2}>Technology Control ©2022</Text>
        </View>
      </View>
    );
  }
}
export default SplashScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#004e92',
    alignItems: "center",
    height: '100%'
  },

  flex1: {
    flex: 1,
    paddingTop: '50%',
    alignSelf: 'center',
    // backgroundColor: 'yellow',
  },

  flex2: {
    flex: 0.11,
    flexDirection: 'column',
    // backgroundColor: 'green',
  },

  text1: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  text2: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },

});

