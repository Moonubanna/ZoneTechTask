import React, { useState, useContext, useEffect, createRef } from 'react';
import { View, TextInput, Text, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../../common/theme';
import { BookContext } from '../../contexts';
import styles from './styles';
import commonButton from './../../common/CommonButton';
import { HEIGHT, WIDTH } from '../../apicall/constants';
import * as Utils from '../../utils';
import {
    storeData,
    retrieveData,
  } from './../../common/AsyncStorage';
// Api calling
import * as ApiService from './../../apicall/ApiService';
import { API } from '../../apicall/constants';

const Register = ({ }) => {
    const { navigation, route } = useContext(BookContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [isLoader, setIsLoader] = useState(false);

    const emailRef = createRef();
    const passRef = createRef();
    const cPassRef = createRef();


    const pressRegister = async () => {
        if (name === '') {
            alert('name is empty')
        } else if (email === '') {
            alert('email is empty')
        } else if (password === '') {
            alert('password is empty')
        } else if (cPassword === '') {
            alert('confirm password is empty')
        } else if (password != cPassword) {
            alert('password not match')
        } else {
            let requestData = {
                name: name,
                email: email,
                password: password,
                password_confirmation: cPassword
            }
            setIsLoader(true);
            let response = await ApiService.postWithoutAuthApiCall(requestData, API.APP_REGISTER_REQUEST);
            if(response !== undefined){
            await storeData('USERDATA', response);
            setIsLoader(false);
            Utils.clearStack(navigation, 'Home');
            } else {
                alert('Already register or something wrong!')
            }
        }
    }
    const pressBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, width: WIDTH }}>
                    <Text style={styles.textHeader}>{'REGISTER'}</Text>
                    <View style={styles.textInputView}>
                        <TextInput
                            placeholder={'Enter name'}
                            placeholderTextColor={colors.white}
                            keyboardType={'default'}
                            onChangeText={txt => {
                                setName(txt);
                            }}
                            onSubmitEditing={() => emailRef.current.focus()}
                            returnKeyType="next"
                            value={name}
                            style={{
                                width: '90%',
                                minHeight: 45,
                                maxHeight: 45,
                                color: colors.white,
                                backgroundColor: colors.transparent,
                                fontSize: 14,
                                marginLeft: 10,
                            }}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            ref={emailRef}
                            placeholder={'Enter email'}
                            placeholderTextColor={colors.white}
                            keyboardType={'default'}
                            onChangeText={txt => {
                                setEmail(txt);
                            }}
                            onSubmitEditing={() => passRef.current.focus()}
                            returnKeyType="next"
                            value={email}
                            style={{
                                width: '90%',
                                minHeight: 45,
                                maxHeight: 45,
                                color: colors.white,
                                backgroundColor: colors.transparent,
                                fontSize: 14,
                                marginLeft: 10,
                            }}
                            autoCapitalize={'none'}
                        />
                    </View>

                    <View style={styles.textInputView}>
                        <TextInput
                            ref={passRef}
                            placeholder={'Enter password'}
                            placeholderTextColor={colors.white}
                            keyboardType={'default'}
                            onChangeText={txt => {
                                setPassword(txt);
                            }}
                            onSubmitEditing={() => cPassRef.current.focus()}
                            returnKeyType="next"
                            value={password}
                            style={{
                                width: '90%',
                                minHeight: 45,
                                maxHeight: 45,
                                color: colors.white,
                                backgroundColor: colors.transparent,
                                fontSize: 14,
                                marginLeft: 10,
                            }}
                            autoCapitalize={'none'}
                        />
                    </View>

                    <View style={styles.textInputView}>
                        <TextInput
                            ref={cPassRef}
                            placeholder={'Enter confirm password'}
                            placeholderTextColor={colors.white}
                            keyboardType={'default'}
                            onChangeText={txt => {
                                setCPassword(txt);
                            }}
                            returnKeyType="done"
                            value={cPassword}
                            style={{
                                width: '90%',
                                minHeight: 45,
                                maxHeight: 45,
                                color: colors.white,
                                backgroundColor: colors.transparent,
                                fontSize: 14,
                                marginLeft: 10,
                            }}
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                        />
                    </View>
                    <View
                        style={{
                            width: '100%',
                        }}>
                        {commonButton(pressRegister, 'Regiter', '70%', 20)}
                    </View>
                    <View
                        style={{
                            width: '100%',
                        }}>
                        {commonButton(pressBack, 'BACK', '50%', 20)}
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
        </View>
    )
}

export default Register;