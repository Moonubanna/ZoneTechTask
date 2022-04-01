
import {Dimensions} from 'react-native';
export const BASE_URL = 'https://apptest.deliveryzone.ae/api/';
export const BASE_PAGINATION_URL = 'https://api.instantwebtools.net/v1/';

export const API = {
    APP_LOGIN_REQUEST: BASE_URL + 'login',
    APP_REGISTER_REQUEST: BASE_URL + 'register',
    APP_LOGOUT_REQUEST: BASE_URL + 'logout',
    APP_DRIVERS_REQUEST: BASE_URL + 'drivers/',
    APP_PASSENGER_REQUEST: BASE_PAGINATION_URL + 'passenger?',
  };

  //HEIGHT AND WIDTH
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;