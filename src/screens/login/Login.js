import React, { useState, useContext, useEffect, createRef } from 'react';
import { View, TextInput, Text, ActivityIndicator } from 'react-native';
import { colors } from '../../common/theme';
import { BookContext } from '../../contexts';
import styles from './styles';
import commonButton from './../../common/CommonButton';
import * as Utils from '../../utils';
import {
    storeData,
    retrieveData,
} from './../../common/AsyncStorage';
// Api calling
import * as ApiService from './../../apicall/ApiService';
import { API, HEIGHT } from '../../apicall/constants';
const Login = ({ }) => {
    const { navigation, route } = useContext(BookContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoader, setIsLoader] = useState(false);

    const emailRef = createRef();
    const passRef = createRef();


    const pressLogin = async () => {
        if (email === '') {
            alert('email is empty')
        } else if (password === '') {
            alert('password is empty')
        } else {
            let requestData = {
                email: email,
                password: password,
            }
            setIsLoader(true);
            let response = await ApiService.postWithoutAuthApiCall(requestData, API.APP_LOGIN_REQUEST);
            if (response !== undefined) {
                await storeData('USERDATA', response);
                setIsLoader(false);
                Utils.clearStack(navigation, 'Home');
            } else {
                alert('Already register or something wrong!')
            }
        }
    }
    const pressRegister = () => {
        Utils.navigateWithParams(navigation, 'Register', {});
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>{'LOGIN'}</Text>
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
                    returnKeyType="done"
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
                    secureTextEntry={true}
                />
            </View>
            <View
                style={{
                    width: '100%',
                }}>
                {commonButton(pressLogin, 'Login', '70%', 20)}
            </View>
            <View
                style={{
                    width: '100%',
                }}>
                {commonButton(pressRegister, 'Register', '70%', 20)}
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

export default Login;