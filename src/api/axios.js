// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { cookie2 } from '../cookieStore';
// Set up default config for http requests here

console.log(`${cookie2.get('ast') ? JSON.parse(cookie2.get('ast')) : ''}`);
const callLocal = axios.create({
  baseURL: 'https://server-project-heroku.herokuapp.com/api/',
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${
      cookie2.get('ast') ? JSON.parse(cookie2.get('ast')) : ''
    }`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
callLocal.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
callLocal.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default callLocal;
