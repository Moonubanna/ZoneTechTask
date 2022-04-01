import React, { useState, useContext, useEffect, createRef } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { BookContext } from '../../contexts';
import styles from './styles';

import headerComponent from './components/HeaderComponent';
import childComponent from './components/ChildComponent';

import * as Utils from '../../utils';
import {
    storeData,
    retrieveData,
    clearData,
} from './../../common/AsyncStorage';
// Api calling
import * as ApiService from './../../apicall/ApiService';
import { API, HEIGHT } from '../../apicall/constants';
import { colors } from '../../common/theme';
import {EventRegister} from 'react-native-event-listeners';
let listenerUpdateFeed = null;
const Drivers = ({ }) => {
    const { navigation, route } = useContext(BookContext);
    const [driverList, setDriverList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [token, setToken] = useState('');
    //Component did mount
    useEffect(()=>{
        retrieveData('USERDATA', result => {
            if (result) {
                setToken(result?.token);
                callDriverListApi(result);
            }
        });
        listenerUpdateFeed = EventRegister.addEventListener(
            'refresh_driverdata',
            data => {
                retrieveData('USERDATA', result => {
                    if (result) {
                        setToken(result?.token);
                        callDriverListApi(result);
                    }
                });
            },
          );
          return () => {
            if (listenerUpdateFeed !== null)
              EventRegister.removeEventListener(listenerUpdateFeed);
          };
      
    },[])
    const pressBack = () => {
        navigation.goBack();
    }
    const pressAdd = () => {
        Utils.navigateWithParams(navigation, 'CreateEditDriver', {data:{}, type: 'create'});
    }
    const pressEdit = (item, index) => {
        Utils.navigateWithParams(navigation, 'CreateEditDriver', {data:item, type: 'edit'});
    }
    const pressDelete = (item, index) => {
        callDeleteApi(item, index)
    }

    const callDriverListApi = async (result) => {
        setIsLoader(true);
        let response = await ApiService.getApiWithAuthCall(result?.token, API.APP_DRIVERS_REQUEST);
        setIsLoader(false);
        if (response !== undefined) {
            setDriverList(response);
        } else {
            setDriverList([])
        }
    }
    const callDeleteApi = async (item, index) => {
        setIsLoader(true);
        let response = await ApiService.deleteApiWithAuthCall(token, API.APP_DRIVERS_REQUEST +item?.id);
        setIsLoader(false);
        if (response !== undefined) {
            let copyDriverArray = [...driverList];
            copyDriverArray.splice(index, 1)
            setDriverList([...copyDriverArray])
        } else {
            setDriverList([])
        }
    }
    return (
        <View style={styles.container}>
            {headerComponent(pressBack, pressAdd)}
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    data={driverList}
                    renderItem={({ item, index }) => childComponent(item, index, pressEdit, pressDelete)}
                    keyExtractor={(item, index) => item.id}
                />
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
export default Drivers;