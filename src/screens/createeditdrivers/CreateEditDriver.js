import React, { useState, useContext, useEffect, createRef } from 'react';
import { View, TextInput, Text, ScrollView, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '../../common/theme';
import { BookContext } from '../../contexts';
import styles from './styles';
import commonButton from './../../common/CommonButton';
import headerComponent from './components/HeaderComponent';
import { HEIGHT, WIDTH } from '../../apicall/constants';
import * as Utils from '../../utils';
import {
    storeData,
    retrieveData,
    clearData,
} from './../../common/AsyncStorage';
// Api calling
import * as ApiService from './../../apicall/ApiService';
import { API } from '../../apicall/constants';
//Library
import { EventRegister } from 'react-native-event-listeners';
import DateTimePicker from '@react-native-community/datetimepicker';

import dOBActionSheet from './components/DobIOSSheet'

const CreateEditDriver = ({ }) => {
    const { navigation, route } = useContext(BookContext);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [isTwoWheeler, setISTwoWheeler] = useState(true);
    const [isLoader, setIsLoader] = useState(false);
    const [token, setToken] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [date, setDate] = useState('');
    const [isAndroidDateTimeVisible, setIsAndroidDateTimeVisible] =
        useState(false);

    const actionDOBSheetRef = createRef();

    useEffect(() => {
        retrieveData('USERDATA', result => {
            if (result) {
                setToken(result?.token);
            }
        });
        if (route.params.type === 'edit') {
            setDataUiEditable(route.params?.data)
        }
    }, [])

    const setDataUiEditable = (data) => {
        if (data) {
            setName(data.name)
            setAge(data.age.toString())
            setPhone(data.phone)
            setDate(data.license_expiry)
            setISTwoWheeler(data.license_type === 'Two Wheeler' ? true : false)
        }
    }

    const pressBack = () => {
        navigation.goBack();
    }
    const pressSubmit = async () => {
        if (name === '') {
            alert('Name is empty')
        } else if (age === '') {
            alert('Age is empty')
        } else if (phone === '') {
            alert('Phone is empty')
        } else if (date === '') {
            alert('License expiry date is empty')
        } else {
            let requestData = {
                name: name,
                license_type: isTwoWheeler ? 'Two Wheeler' : 'Four Wheeler',
                age: age,
                license_expiry: date,
                phone: phone,
            }
            setIsLoader(true);
            let response = undefined;
            if (route.params.type === 'create') {
                response = await ApiService.postApiCall(requestData, token, API.APP_DRIVERS_REQUEST);
            } else {
                let apiURL = API.APP_DRIVERS_REQUEST + route.params?.data?.id;
                response = await ApiService.upateApiWithAuthCall(requestData, token, apiURL);
            }
            EventRegister.emit('refresh_driverdata', true)
            if (response !== undefined) {
                pressBack();
            } else {
                pressBack();
            }
        }
    }

    const pressDate = () => {
        if (Platform.OS === 'android') {
            setIsAndroidDateTimeVisible(true);
        } else {
            actionDOBSheetRef.current?.open();
        }
    };
    //handling date picker
    function onChange(event, selectedDate) {

        if (event?.type === 'set') {
            const selectedDateTime = selectedDate || currentDate;
            setDate(Utils.convertDateObjFormat(selectedDateTime, 'YYYY-MM-DD'));
        }
        // hide android datetime picker
        if (Platform.OS === 'android') {
            setIsAndroidDateTimeVisible(false);
        }
    }
    const pressSubmitBottomSheet = () => {
        actionDOBSheetRef.current?.close();
    };
    return (
        <View style={styles.container}>
            {headerComponent(pressBack)}
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, width: WIDTH, marginTop: HEIGHT / 6 }}>
                    <Text style={[styles.textHeader, { color: colors.green700 }]}>{'DELIVERY ZONE'}</Text>
                    <Text style={[styles.textHeader, { marginTop: 10 }]}>{route.params.type === 'create' ? 'Add Driver' : route.params?.data?.name}</Text>
                    <View style={styles.textInputView}>
                        <TextInput
                            placeholder={'Enter name'}
                            placeholderTextColor={colors.green900}
                            keyboardType={'default'}
                            onChangeText={txt => {
                                setName(txt);
                            }}
                            returnKeyType="next"
                            value={name}
                            style={{
                                minHeight: 45,
                                maxHeight: 45,
                                color: colors.green900,
                                backgroundColor: colors.transparent,
                                fontSize: 14,
                                marginLeft: 10,
                            }}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            placeholder={'Enter Age'}
                            placeholderTextColor={colors.green900}
                            keyboardType={'number-pad'}
                            onChangeText={txt => {
                                setAge(txt);
                            }}
                            returnKeyType="next"
                            value={age}
                            style={{
                                minHeight: 45,
                                maxHeight: 45,
                                color: colors.green900,
                                backgroundColor: colors.transparent,
                                fontSize: 14,
                                marginLeft: 10,
                            }}
                            autoCapitalize={'none'}
                            maxLength={3}
                        />
                    </View>

                    <View style={styles.textInputView}>
                        <TextInput
                            placeholder={'Enter phone'}
                            placeholderTextColor={colors.green900}
                            keyboardType={'number-pad'}
                            onChangeText={txt => {
                                setPhone(txt);
                            }}
                            returnKeyType="next"
                            value={phone}
                            style={{
                                minHeight: 45,
                                maxHeight: 45,
                                color: colors.green900,
                                backgroundColor: colors.transparent,
                                fontSize: 14,
                                marginLeft: 10,
                            }}
                            autoCapitalize={'none'}
                        />
                    </View>

                    <View style={styles.licenceComponent}>
                        <Pressable
                            onPress={() => {
                                setISTwoWheeler(true)
                            }}
                            style={({ pressed }) => [
                                styles.licencePreseble,
                                {
                                    backgroundColor: isTwoWheeler ? colors.green300 : colors.transparent,
                                    opacity: pressed ? 0.5 : 1,
                                },
                            ]}>
                            <Text style={[styles.textLicence]}>{'Two Wheeler'}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setISTwoWheeler(false)
                            }}
                            style={({ pressed }) => [
                                styles.licencePreseble,
                                {
                                    backgroundColor: !isTwoWheeler ? colors.green300 : colors.transparent,
                                    opacity: pressed ? 0.5 : 1,
                                },
                            ]}>
                            <Text style={[styles.textLicence]}>{'Four Wheeler'}</Text>
                        </Pressable>
                    </View>

                    <TouchableOpacity opacity={.5} style={styles.textInputView}
                        onPress={() => {
                            pressDate()
                        }}>
                        <TextInput
                            editable={false}
                            placeholder={'Select license expiry'}
                            placeholderTextColor={colors.green900}
                            keyboardType={'default'}
                            onChangeText={txt => {
                                setDate(txt);
                            }}
                            returnKeyType="next"
                            value={date}
                            style={{
                                minHeight: 45,
                                maxHeight: 45,
                                color: colors.green900,
                                backgroundColor: colors.transparent,
                                fontSize: 14,
                                marginLeft: 10,
                            }}
                            autoCapitalize={'none'}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            width: '100%',
                        }}>
                        {commonButton(pressSubmit, 'Submit', '70%', 20)}
                    </View>
                </View>
            </ScrollView>
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
            {/* Callender for DOB */}
            {dOBActionSheet(
                actionDOBSheetRef,
                pressSubmitBottomSheet,
                date,
                onChange,
            )}
            {isAndroidDateTimeVisible && (
                <DateTimePicker
                    testID="dataPicker"
                    minimumDate={new Date()}
                    value={new Date()}
                    mode={'date'}
                    display="default"
                    onChange={onChange}
                    themeVariant="dark"
                    //maximumDate={new Date()}
                    neutralButtonLabel="clear"
                />
            )}
        </View>
    )
}

export default CreateEditDriver;