/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar
} from 'react-native';
import { colors } from './src/common/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Screens
import Splash from './src/common/AuthLoadingScreen';
import Login from './src/screens/login';
import Register from './src/screens/register';
import Home from './src/screens/home';
import Drivers from './src/screens/drivers';
import Passenger from './src/screens/passenger';
import CreateEditDriver from './src/screens/createeditdrivers';

const App = () => {

  const RootStack = createStackNavigator();
  return(
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.green500}
      />
      <NavigationContainer>
      <RootStack.Navigator
            //headerShown={false}
            screenOptions={{animationEnabled: false}}
            initialRouteName="Splash">
            <RootStack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Drivers"
              component={Drivers}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Passenger"
              component={Passenger}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="CreateEditDriver"
              component={CreateEditDriver}
              options={{headerShown: false}}
            />
          </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.color_primary,
  },
});
export default App;
