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
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
    },
    textEmail: {
        color: colors.grey100,
        fontSize: 11,
        textAlign: 'center',
    },
    mainComponent: {
        flexDirection: 'column',
        width: WIDTH,
        padding: 15,
        backgroundColor: colors.grey500,
        marginTop: 10,
        alignItems: 'flex-start'
    },
});
