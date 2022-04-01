import React, { useState, useContext, useEffect, createRef } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { colors } from '../../common/theme';
import { BookContext } from '../../contexts';
import styles from './styles';
import commonButton from './../../common/CommonButton';
import * as Utils from '../../utils';
import {
    storeData,
    retrieveData,
    clearData,
} from './../../common/AsyncStorage';
// Api calling
import * as ApiService from './../../apicall/ApiService';
import { API, HEIGHT } from '../../apicall/constants';
const Home = ({ }) => {
    const { navigation, route } = useContext(BookContext);
    const [isLoader, setIsLoader] = useState(false);

    const pressDrivers = () => {
        Utils.navigateWithParams(navigation, 'Drivers', {});
    }
    const pressPassenger = () => {
        Utils.navigateWithParams(navigation, 'Passenger', {});
    }
    const pressLogout = () => {
        retrieveData('USERDATA', result => {
            if (result) {
                callLogoutApi(result)
            }
        });
    }

    const callLogoutApi = async (result) => {
        setIsLoader(true);
        let requestData = {
            user: 'zonetechteask'
        }
        let response = await ApiService.postApiCall(requestData, result?.token, API.APP_LOGOUT_REQUEST);
        if (response !== undefined) {
            await clearData('USERDATA', response);
            setIsLoader(false);
            Utils.clearStack(navigation, 'Login');
        } else {
            await clearData('USERDATA', response);
            setIsLoader(false);
            Utils.clearStack(navigation, 'Login');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>{'HOME'}</Text>
            <View
                style={{
                    width: '100%',
                }}>
                {commonButton(pressDrivers, 'Drivers', '70%', 20)}
            </View>
            <View
                style={{
                    width: '100%',
                }}>
                {commonButton(pressPassenger, 'Passenger', '70%', 20)}
            </View>
            <View
                style={{
                    width: '100%',
                }}>
                {commonButton(pressLogout, 'Logout', '70%', 20)}
            </View>
            {isLoader &&
                <View style={{
                    flex: 1,
                    marginTop: HEIGHT / 2,
                    position: 'absolute',
                    backgroundColor: colors.transparent,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator
                        animating={isLoader}
                        color={colors.orange600}
                        size={'large'}
                    />
                </View>
            }
        </View>
    )
}

export default Home;