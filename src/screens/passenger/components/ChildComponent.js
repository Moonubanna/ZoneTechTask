import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';
import { WIDTH } from '../../../apicall/constants';
import { colors } from '../../../common/theme';

const ChildComponent = (item, index) => {
    return (
        <View style={styles.mainComponent}>
            <Text style={styles.textName}>{`${item.name}`}</Text>
            <Text style={[styles.textEmail,{marginTop: 10}]}>{`${item?.airline[0]?.name} (${item?.airline[0]?.country})`}</Text>
        </View>
    );
};

export default ChildComponent;

const styles = StyleSheet.create({
    textName: {
        color: colors.green900,
        fontSize: 16,
        textAlign: 'center',
    },
    textEmail: {
        color: colors.green500,
        fontSize: 11,
        textAlign: 'center',
    },
    mainComponent: {
        flexDirection: 'column',
        width: WIDTH,
        padding: 15,
        backgroundColor: colors.green100,
        marginTop: 10,
        alignItems: 'flex-start'
    },
});
