/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../themes/theme';

const HomeScreen = ({navigation} : any) => {
  return (
    <View>
      <TouchableOpacity onPress={() => {
        navigation.push('MovieDetail');
      }}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
