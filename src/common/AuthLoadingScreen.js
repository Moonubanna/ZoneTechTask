import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { colors } from './theme';
import * as Utils from './../utils';
import {
  storeData,
  retrieveData,
} from './AsyncStorage';
const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  // Fetch the token from storage then navigate to our appropriate place
  function _bootstrapAsync() {
    setTimeout(() => {
      retrieveData('USERDATA', result => {
        if (result) {
          Utils.clearStack(navigation, 'Home');
          
        } else {
          Utils.clearStack(navigation, 'Login');
        }
      });

    }, 2000);
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={colors.white}
        size="large"
        style={{ marginTop: 20 }}
      />
      <Text style={{
        color: colors.black,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20
      }}>{'Splash screen'}</Text>
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.green600,
  },
});
