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
        callPassengerListApi();
    }, [])
    const pressBack = () => {
        navigation.goBack();
    }

    const callPassengerListApi = async () => {
        setIsLoader(true);
        let apiURL = API.APP_PASSENGER_REQUEST + 'page=' + currentPage + '@size=10'
        let response = await ApiService.getApiWithoutAuthCall(apiURL);
        setIsLoader(false);
        setLoaderPagination(false);
        if (response !== undefined) {
            if (currentPage === 0) {
                setPassengerList(response?.data);
            } else {
                setPassengerList([...passengerList, ...response?.data]);
            }
        } else {
            setEnded(true);
        }
    }

    const callPageLoadingApi = () => {
        if (!ended) {
            setLoaderPagination(true);
            currentPage = currentPage + 1;
            callPassengerListApi()
        }
    }
    return (
        <View style={styles.container}>
            {headerComponent(pressBack)}
            <View style={{ flex: 1,marginBottom: 10 }}>
                <FlatList
                    data={passengerList}
                    renderItem={({ item, index }) => childComponent(item, index)}
                    keyExtractor={(item, index) => item.id}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter(loaderPagination)}
                    scrollEventThrottle={400}
                    onMomentumScrollBegin={() => {
                        onEndReachedCalledDuringMomentum = false;
                    }}
                    // onEndReached={distanceFromEnd => {
                    //     if (!onEndReachedCalledDuringMomentum) {
                    //         if (!loaderPagination) {
                    //             console.warn(
                    //                 'loading__page',
                    //                 loaderPagination,
                    //                 '__',
                    //                 currentPage,
                    //                 '__',
                    //                 'end',
                    //                 ended,
                    //             );
                    //             if (currentPage !== 0) {
                    //                 console.warn('enter_1_call', currentPage);
                    //                 callPageLoadingApi();
                    //             }
                    //         }
                    //         onEndReachedCalledDuringMomentum = true;
                    //     }
                    // }}
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
                    maxToRenderPerBatch={10}

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
    return <ActivityIndicator color={'#9000FF'} size={'large'} />;
}

export default Passenger;