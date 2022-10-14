import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export function MessageLogin({message}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingVertical: 1},
  text: {color: '#f40101', fontWeight: 'bold'},
});
