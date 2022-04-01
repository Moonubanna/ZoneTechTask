import React, { useState, useContext, useEffect, createRef } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { BookContext } from '../../contexts';
import styles from './styles';

import * as Utils from '../../utils';
import {
    storeData,
    retrieveData,
    clearData,
} from './../../common/AsyncStorage';
// Api calling
import * as ApiService from './../../apicall/ApiService';
import { API, HEIGHT } from '../../apicall/constants';

import headerComponent from './components/HeaderComponent';
import childComponent from './components/ChildComponent';
import { colors } from '../../common/theme';

// passenger pagination
let onEndReachedCalledDuringMomentum = true;
let currentPage = 0;

const Passenger = ({ }) => {
    const { navigation, route } = useContext(BookContext);
    const [passengerList, setPassengerList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [loaderPagination, setLoaderPagination] = useState(false);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        currentPage = 0;
        setIsLoader(true);
        callPassengerListApi();
    }, [])
    const pressBack = () => {
        navigation.goBack();
    }

    const callPassengerListApi = async () => {
        let apiURL = API.APP_PASSENGER_REQUEST + 'page=' + currentPage + '&size=10'
        let response = await ApiService.getApiWithoutAuthCall(apiURL);
        setIsLoader(false);
        setLoaderPagination(false);
        if (response !== undefined) {
            if (currentPage === 0) {
                setPassengerList(response?.data);
                currentPage = currentPage + 1;
            } else {
                setPassengerList([...passengerList, ...response?.data]);
                currentPage = currentPage + 1;
            }
        } else {
            setEnded(true);
        }
    }

    const callPageLoadingApi = () => {
        if (!ended) {
            setLoaderPagination(true);
            callPassengerListApi()
        }
    }
    return (
        <View style={styles.container}>
            {headerComponent(pressBack)}
            <View style={{ 
                flex: 1,
            //marginBottom: 10 
            }}>
                <FlatList
                key={'passengerFlatList'}
                    data={passengerList}
                    renderItem={({ item, index }) => childComponent(item, index)}
                    keyExtractor={(item, index) => item.id}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter(loaderPagination)}
                    scrollEventThrottle={400}
                    onMomentumScrollBegin={() => {
                        onEndReachedCalledDuringMomentum = false;
                    }}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            if (!onEndReachedCalledDuringMomentum) {
                                if (!loaderPagination) {
                                    if (currentPage !== 0) {
                                        callPageLoadingApi();
                                    }
                                }
                                onEndReachedCalledDuringMomentum = true;
                            }
                        }
                    }}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    showsVerticalScrollIndicator={false}
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

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 50;

    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};

function renderFooter(loaderPagination) {
    if (!loaderPagination) return null;
    return <ActivityIndicator color={colors.green500} size={'large'} />;
}

export default Passenger;