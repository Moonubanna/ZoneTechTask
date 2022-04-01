import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';
import { colors } from '../../../common/theme';

const ChildComponent = (item, index, pressEdit, pressDelete) => {
    return (
        <View style={styles.mainComponent}>
            <View style={styles.leftCompoent}>
            <Text style={styles.textName}>{`${item.name} (${item.gender})`}</Text>
            <Text style={[styles.textEmail,{marginTop: 10}]}>{item.license_type}</Text>
            </View>

            <View style={styles.rightCompoent}>
            <Pressable
                onPress={() => {
                    pressEdit(item, index)
                }}
                style={({ pressed }) => [
                    {
                        backgroundColor: colors.white,
                        padding: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: pressed ? 0.5 : 1,
                    },
                ]}>
                <Text style={styles.textButton}>{'Edit'}</Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    pressDelete(item, index)
                }}
                style={({ pressed }) => [
                    {
                        backgroundColor: colors.red400,
                        padding: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: pressed ? 0.5 : 1,
                        marginTop: 10
                    },
                ]}>
                <Text style={[styles.textButton, {}]}>{'Dlete'}</Text>
            </Pressable>
            </View>
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
    textButton: {
        color: colors.black,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    mainComponent: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        backgroundColor: colors.grey500,
        marginBottom: 10
    },
    leftCompoent: {
        width: '70%',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    rightCompoent: {
        width: '30%',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
});
