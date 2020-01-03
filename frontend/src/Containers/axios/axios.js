import axios from 'axios';

const baseUrl = "http://localhost:5000";
const CORSheader = { "Origin": "http://localhost:3000" }

export const axiosGET = (url, header, config) => new Promise((resolve, reject) => {

    let getUrl = baseUrl + url;
    let configObejct = {
        headers: {...header, ...CORSheader },
        ...config
    }
    axios.get(getUrl, configObejct)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        });
});

export const axiosPOST = (url, data, header, config) => new Promise((resolve, reject) => {

    let postUrl = baseUrl + url;
    let configObejct = {
        headers: {...header, ...CORSheader },
        ...config
    }
    axios.post(postUrl, data, configObejct)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        });
});

export const axiosPUT = (url, data, header, config) => new Promise((resolve, reject) => {

    let putUrl = baseUrl + url;
    let configObejct = {
        headers: {...header, ...CORSheader },
        ...config
    }
    axios.put(putUrl, data, configObejct)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        });
});

export const axiosDELETE = (url, header, config) => new Promise((resolve, reject) => {

    let deleteUrl = baseUrl + url;
    let configObejct = {
        headers: {...header, ...CORSheader },
        ...config
    }
    axios.delete(deleteUrl, configObejct)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        });
});