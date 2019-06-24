import axios from "axios";

import { getAccessToken, redirectToSignIn } from "./oauth-helper";

const baseUrl = __DEV__
  ? "http://192.168.0.117:8080/"
  : "http://api.cookbook.com/";
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const post = async (endpoint, body) => {
  try {
    await addHeaders();
    return axios.post(`${baseUrl}${endpoint}`, body, config);
  } catch (error) {
    return handleError(error);
  }
};

export const get = async endpoint => {
  try {
    await addHeaders();
    return axios.get(`${baseUrl}${endpoint}`, config);
  } catch (error) {
    return handleError(error);
  }
};

export const patch = async (endpoint, body) => {
  try {
    await addHeaders();
    return axios.patch(`${baseUrl}${endpoint}`, body, config);
  } catch (error) {
    return handleError(error);
  }
};

export const put = async (endpoint, body) => {
  try {
    await addHeaders();
    return axios.put(`${baseUrl}${endpoint}`, body, config);
  } catch (error) {
    return handleError(error);
  }
};

export const parseResponse = response => response.data;

const addHeaders = async () => {
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
};

const handleError = error => {
  if (error.response.status === 401) {
    redirectToSignIn();
  }
  return { error: error.response.data };
};
