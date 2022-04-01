import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';
import { WIDTH } from '../../../apicall/constants';
import { colors } from '../../../common/theme';

const HeaderComponent = (pressBack, pressAdd) => {
    return (
        <View style={styles.headerComponent}>
            <Pressable
                onPress={() => {
                    pressBack()
                }}
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.5 : 1,
                    },
                ]}>
                <Text style={styles.textBack}>{'< Back'}</Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    pressAdd()
                }}
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.5 : 1,
                    },
                ]}>
                <Text style={styles.textBack}>{'+ ADD'}</Text>
            </Pressable>
        </View>
    );
};

export default HeaderComponent;

const styles = StyleSheet.create({
    textBack: {
        color: colors.green900,
        fontSize: 16,
        textAlign: 'center',
    },
    headerComponent: {
        flexDirection: 'row',
        width: WIDTH,
        padding: 10,
        backgroundColor: colors.green500,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
