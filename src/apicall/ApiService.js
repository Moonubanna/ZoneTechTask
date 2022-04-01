
import axios from 'axios';
import {
    API,
  } from './constants';

  export async function getApiWithoutAuthCall(apiURL) {
    console.log('request_data', apiURL);
    try {
      let response = axios.get(apiURL, 
        {headers: {
          'content-type': 'application/json',
        }});
  
      let responseJson = await (await response).data;
      console.log('response>>>>>>>>>>', responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  export async function getApiWithAuthCall(token, apiURL) {
    console.log('request_data', token, apiURL);
    try {
      const authstr = `Bearer `.concat(token);
      let response = axios.get(apiURL, 
        {headers: {
        'content-type': 'application/json',
          Authorization: authstr
      }});
  
      let responseJson = await (await response).data;
      console.log('response>>>>>>>>>>', responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  export async function deleteApiWithAuthCall(token, apiURL) {
    console.log('request_data', token, apiURL);
    try {
      const authstr = `Bearer `.concat(token);
      let response = axios.delete(apiURL, 
        {headers: {
        'content-type': 'application/json',
          Authorization: authstr
      }});
  
      let responseJson = await (await response).data;
      console.log('response>>>>>>>>>>', responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }


  export async function upateApiWithAuthCall(requestData, token, apiURL) {
    console.log('request_data', token, apiURL);
    try {
      const authstr = `Bearer `.concat(token);
      let response = axios.put(apiURL, JSON.stringify(requestData),
        {headers: {
        'content-type': 'application/json',
          Authorization: authstr
      }});
  
      let responseJson = await (await response).data;
      console.log('response>>>>>>>>>>', responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }


  export async function postWithoutAuthApiCall(requestData, apiURL) {
    console.log('request_data',apiURL, requestData);
    try {
      let response = axios.post(apiURL, JSON.stringify(requestData), {
        headers: {
          'content-type': 'application/json',
        },
      });
      let responseJson = await (await response).data;
      console.log('response>>>>>>>>>>', responseJson);
      return responseJson;
    } catch (error) {
      console.warn('RESPONSE_EXCEPTION', error);
    }
  }
  
  export async function postApiCall(requestData, token, apiURL) {
    console.log('request_data', requestData, token, apiURL);
    try {
      const authstr = `Bearer `.concat(token);
      let response = axios.post(apiURL, JSON.stringify(requestData), {
        headers: {
          'content-type': 'application/json',
          Authorization: authstr
        },
      });
      let responseJson = await (await response).data;
      console.log('response>>>>>>>>>>', responseJson);
      return responseJson;
    } catch (error) {
      console.warn('RESPONSE_EXCEPTION', error);
    }
  }